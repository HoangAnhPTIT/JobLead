import { Col, DatePicker, Form, Input, Modal, Row, Spin } from "antd";
import dayjs from "dayjs";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { httpAuthPost, httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateEducation } from "src/apis/apiEndpoint";
import SelectAntd from "src/commons/AntdForm/SelectAntd";
import { updateSuccessMessage } from "src/constants/common";
import { CV_MODAL_TYPES } from "src/constants/cv";

const ModalEducation = ({ data, modalType, closeModal }) => {
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector((state) => state.loading);
	const [form] = Form.useForm();
	const { entities } = useAppSelector((state) => state.entity);

	const isThisModal = modalType === CV_MODAL_TYPES.education;

	const onSubmit = async () => {
		dispatch(updateLoading(true));
		try {
			const values = await form.validateFields();

			const response = data
				? await httpAuthPut({
						endpoint: apiCandidateEducation,
						data: { id: data?.id, ...values },
				  })
				: await httpAuthPost({
						endpoint: apiCandidateEducation,
						data: values,
				  });

			if (response.success) {
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
		if (data && isThisModal) {
			const formData = {
				...data,
				learningClassificationId: data?.degreeId,
				startDate: data?.startDate ? dayjs(data?.startDate) : null,
				finishDate: data?.finishDate ? dayjs(data?.finishDate) : null,
			};
			form.setFieldsValue(formData);
		} else {
			form.resetFields();
		}
	}, [data, form, isThisModal]);

	return (
		<Modal
			open={isThisModal}
			onCancel={() => closeModal(false)}
			title="Học vấn và bằng cấp"
			className="p-0"
			width={750}
			onOk={onSubmit}
			okText="Lưu thông tin"
			confirmLoading={isLoading}
		>
			<Spin spinning={isLoading}>
				<Form form={form} layout="vertical" autoComplete="off">
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="school"
								label="Trường, cơ sở, trung tâm đào tạo"
								rules={[{ required: true }]}
							>
								<Input placeholder="Nhập tên" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="class" label="Khoa đào tạo">
								<Input placeholder="Nhập tên khoa" />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name="certification"
								label="Tên bằng cấp, chứng chỉ"
								rules={[{ required: true }]}
							>
								<Input placeholder="VD: Cử nhân luật, Kỹ sư CNTT, Chứng chỉ nghề điện dân dụng..." />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="major" label="Chuyên ngành đào tạo">
								<Input placeholder="VD: CNTT, Kế toán..." />
							</Form.Item>
						</Col>
						<Col span={12}>
							<SelectAntd
								form={Form}
								name="learningClassificationId"
								label="Xếp loại"
								rules={[{ required: true }]}
								list={entities?.LearningClassification}
								placeholder="Chọn xếp loại"
							/>
						</Col>
						<Col span={12}>
							<Form.Item
								name="startDate"
								label="Thời gian bắt đầu"
								rules={[{ required: true }]}
							>
								<DatePicker
									picker="month"
									placeholder="Chọn thời gian bắt đầu"
									format="MM/YYYY"
									className="w-full"
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="finishDate"
								label="Thời gian kết thúc"
								rules={[{ required: true }]}
							>
								<DatePicker
									picker="month"
									placeholder="Chọn thời gian kết thúc"
									format="	MM/YYYY"
									className="w-full"
								/>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name="description" label="Mô tả thêm">
								<Input.TextArea />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Spin>
		</Modal>
	);
};

export default ModalEducation;
