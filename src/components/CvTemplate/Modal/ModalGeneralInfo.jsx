import { Col, DatePicker, Form, Input, Modal, Row, Select, Spin } from "antd";
import dayjs from "dayjs";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateInfo } from "src/apis/apiEndpoint";
import { updateSuccessMessage } from "src/constants/common";
import { CV_MODAL_TYPES } from "src/constants/cv";

const ModalGeneralInfo = ({ data, modalType, closeModal }) => {
	const { isLoading } = useAppSelector((state) => state.loading);
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const { entities } = useAppSelector((state) => state.entity);

	const onSubmit = async () => {
		dispatch(updateLoading(true));
		try {
			const values = await form.validateFields();
			const response = await httpAuthPut({
				endpoint: apiCandidateInfo,
				data: values,
			});
			if (response.status === 200) {
				toast.success(updateSuccessMessage);
				closeModal();
			}
		} catch (error) {
			toast.error(error?.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		form.setFieldsValue({ ...data, dob: data?.dob ? dayjs(data?.dob) : null });
	}, [data, form]);

	return (
		<Modal
			open={modalType === CV_MODAL_TYPES.generalInfo}
			onCancel={() => closeModal(false)}
			title="Thông tin cá nhân"
			className="p-0"
			width={750}
			onOk={onSubmit}
			okText="Lưu thông tin"
			confirmLoading={isLoading}
		>
			<Spin spinning={isLoading}>
				<Form form={form} layout="vertical" autoComplete="off">
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								label="Họ và tên"
								name="fullName"
								// rules={[{ required: true }]}
							>
								<Input placeholder="Tên của bạn" />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								label="Vị trí công việc muốn ứng tuyển"
								name="workTitle"
							>
								<Input placeholder="Vị trí công việc" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Số điện thoại" name="phone">
								<Input placeholder="Số điện thoại liên hệ" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Email" name="email">
								<Input placeholder="Địa chỉ email" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Giới tính" name="genderId">
								<Select placeholder="Chọn giới tính">
									{entities?.Gender?.map((item, i) => (
										<Select.Option key={i} value={item?.id}>
											{item?.name}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Ngày sinh" name="dob">
								<DatePicker
									placeholder="Chọn ngày"
									className="w-full"
									format="DD/MM/YYYY"
								/>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item label="Địa chỉ" name="location">
								<Input placeholder="Địa chỉ" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Spin>
		</Modal>
	);
};

export default ModalGeneralInfo;
