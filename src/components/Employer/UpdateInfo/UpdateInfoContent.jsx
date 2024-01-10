"use client";
import { KeyOutlined } from "@mui/icons-material";
import { Button, Col, Form, Image, Input, Modal, Row } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet, httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCompany, apiCompanyInfo } from "src/apis/apiEndpoint";
import SelectAntd from "src/commons/AntdForm/SelectAntd";
import {
	errorMessage,
	imageError,
	updateSuccessMessage,
} from "src/constants/common";
import ModalChangePassword from "./ModalChangePassword";

const UpdateInfoContent = () => {
	const [form] = Form.useForm();
	const [formPw] = Form.useForm();
	const dispatch = useAppDispatch();
	const { entities } = useAppSelector((state) => state.entity);
	const [info, setInfo] = useState();
	const [showModal, setShowModal] = useState(false);

	const handleChangePassword = () => {};
	const onSubmit = async () => {
		dispatch(updateLoading(true));
		try {
			const values = await form.validateFields();
			const payload = { ...info, ...values };
			const res = await httpAuthPut({ endpoint: apiCompany, data: payload });
			if (res.status === 200) {
				toast.success(updateSuccessMessage);
			} else {
				toast.error(errorMessage);
			}
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		const getData = async () => {
			dispatch(updateLoading(true));
			try {
				const res = await httpAuthGet({ endpoint: apiCompanyInfo });
				if (res.status === 200) {
					setInfo(res.company);
					form.setFieldsValue(res.company);
				}
			} catch (error) {
				console.error(error);
			} finally {
				dispatch(updateLoading(false));
			}
		};
		getData();
	}, []);

	return (
		<div>
			<div className=" mb-5">
				<Image src="https:placehold.co/900x200.png" alt="" preview={false} />
			</div>
			<Row gutter={16}>
				<Col span={16}>
					<div className="p-5 bg-white mb-5">
						<div className="text-primary font-semibold uppercase">
							Thông tin tài khoản
						</div>
						<div>
							<p className="mb-2">Địa chỉ email:</p>
							<Input size="large" disabled value={info?.email} />
							<p
								className="mt-3 text-gray-400 hover:underline cursor-pointer flex items-center w-fit"
								onClick={() => setShowModal(true)}
							>
								<KeyOutlined fontSize="small" className="mr-2" />
								Đổi mật khẩu
							</p>
						</div>
						<ModalChangePassword
							open={showModal}
							onCancel={() => setShowModal(false)}
						/>
					</div>
					<Form form={form} layout="vertical" className="w-full">
						<div className="p-5 bg-white mb-5">
							<div className="text-primary font-semibold uppercase">
								Thông tin công ty
							</div>
							<Form.Item
								label="Tên công ty"
								name="name"
								rules={[{ required: true }]}
							>
								<Input size="large" />
							</Form.Item>
							<Form.Item
								label="Địa chỉ công ty"
								name="address"
								rules={[{ required: true }]}
							>
								<Input size="large" />
							</Form.Item>
							<SelectAntd
								form={Form}
								label="Tỉnh/Thành phố"
								name="cityId"
								rules={[{ required: true }]}
								list={entities?.City}
							/>
							<Form.Item
								label="Quy mô"
								name="sizeDescription"
								rules={[{ required: true }]}
							>
								<Input size="large" />
							</Form.Item>
							<Form.Item
								label="Mô tả sơ lược"
								name="introducation"
								rules={[{ required: true }]}
							>
								<Input.TextArea />
							</Form.Item>
							<div className="grid grid-cols-2 gap-5">
								<Form.Item name="website" label="Website">
									<Input size="large" />
								</Form.Item>
								<Form.Item name="phone" label="Số điện thoại">
									<Input size="large" />
								</Form.Item>
							</div>
						</div>
						<div className="p-5 bg-white mb-5">
							<div className="text-primary font-semibold uppercase">
								Thông tin người liên hệ
							</div>
							<div className="grid grid-cols-2 gap-x-5">
								<Form.Item
									name={["contact", "fullName"]}
									label="Người liên hệ"
									rules={[{ required: true }]}
								>
									<Input size="large" />
								</Form.Item>
								<Form.Item
									name={["contact", "phone"]}
									label="SĐT liên hệ"
									rules={[{ required: true }]}
								>
									<Input size="large" />
								</Form.Item>
								<Form.Item
									name={["contact", "level"]}
									label="Chức vụ người liên hệ"
								>
									<Input size="large" />
								</Form.Item>
								<Form.Item
									name={["contact", "email"]}
									label="Email người liên hệ"
									rules={[{ required: true }]}
								>
									<Input size="large" />
								</Form.Item>
							</div>
						</div>
						<div className="text-right ">
							<Button type="primary" onClick={onSubmit}>
								Lưu thông tin
							</Button>
						</div>
					</Form>
				</Col>
				<Col span={8}>
					<div className="bg-white mb-5 text-center py-5">
						<p className="font-semibold text-base">Cập nhật ảnh đại diện</p>
						<Image src={imageError} alt="" preview={false} />
					</div>
					<div className="bg-white mb-5 text-center py-5">
						<p className="font-semibold text-base">Cập nhật ảnh bìa</p>
						<Image src={imageError} alt="" preview={false} />
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default UpdateInfoContent;
