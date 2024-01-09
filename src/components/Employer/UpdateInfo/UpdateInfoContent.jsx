"use client";
import { KeyOutlined } from "@mui/icons-material";
import { Button, Col, Form, Image, Input, Row } from "antd";
import { useAppSelector } from "lib/hooks";
import React from "react";
import SelectAntd from "src/commons/AntdForm/SelectAntd";
import { imageError } from "src/constants/common";

const UpdateInfoContent = () => {
	const [form] = Form.useForm();
	const { entities } = useAppSelector((state) => state.entity);

	const onSubmit = async () => {
		console.log(form.getFieldsValue());
	};

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
							<p>Địa chỉ email:</p>
							<Input size="large" disabled />
							<p>
								<KeyOutlined fontSize="small" />
								Đổi mật khẩu
							</p>
						</div>
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
								name="amount"
								rules={[{ required: true }]}
							>
								<Input size="large" />
							</Form.Item>
							<Form.Item
								label="Mô tả sơ lược"
								name="brief"
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
									name="nameContact"
									label="Người liên hệ"
									rules={[{ required: true }]}
								>
									<Input size="large" />
								</Form.Item>
								<Form.Item
									name="phoneContact"
									label="SĐT liên hệ"
									rules={[{ required: true }]}
								>
									<Input size="large" />
								</Form.Item>
								<Form.Item name="positionContact" label="Chức vụ người liên hệ">
									<Input size="large" />
								</Form.Item>
								<Form.Item
									name="emailContact"
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
