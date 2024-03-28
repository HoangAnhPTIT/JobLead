import { Checkbox, Col, DatePicker, Form, Input, Modal, Row, Spin } from "antd";
import dayjs from "dayjs";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthPost, httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateExperience } from "src/apis/apiEndpoint";
import { updateSuccessMessage } from "src/constants/common";
import { CV_MODAL_TYPES } from "src/constants/cv";

const ModalExperience = ({ data, modalType, closeModal }) => {
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector((state) => state.loading);
	const [form] = Form.useForm();

	const isThisModal = modalType === CV_MODAL_TYPES.experience;

	const [currentWork, setCurrentWork] = useState(false);

	const onChangeCheckbox = (e) => {
		const isChecked = e.target.checked;
		setCurrentWork(isChecked);
		isChecked && form.setFieldValue("finishDate", undefined);
	};

	const onSubmit = async () => {
		dispatch(updateLoading(true));
		try {
			const values = await form.validateFields();

			const response = data
				? await httpAuthPut({
						endpoint: apiCandidateExperience,
						data: { id: data?.id, ...values },
				  })
				: await httpAuthPost({
						endpoint: apiCandidateExperience,
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
		if (data && isThisModal) {
			const formData = {
				...data,
				learningClassificationId: data?.degreeId,
				startDate: data?.startDate ? dayjs(data?.startDate) : null,
				finishDate: data?.finishDate ? dayjs(data?.finishDate) : null,
			};
			form.setFieldsValue(formData);
			setCurrentWork(data?.isCurrentWork);
		} else {
			form.resetFields();
		}
	}, [data, form, isThisModal]);

	return (
		<Modal
			open={isThisModal}
			onCancel={() => closeModal(false)}
			title="Kinh nghiệm làm việc"
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
								name="title"
								label="Chức danh / vị trí"
								rules={[{ required: true }]}
							>
								<Input placeholder="Nhập chức danh / vị trí" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="company"
								label="Công ty"
								rules={[{ required: true }]}
							>
								<Input placeholder="Nhập tên công ty" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="startDate" label="Thời gian bắt đầu">
								<DatePicker
									picker="month"
									placeholder="Chọn thời gian bắt đầu"
									format="MM/YYYY"
									className="w-full"
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="finishDate" label="Thời gian kết thúc">
								<DatePicker
									picker="month"
									placeholder="Chọn thời gian kết thúc"
									format="	MM/YYYY"
									className="w-full"
									disabled={currentWork}
								/>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name="isCurrentWork" valuePropName="checked">
								<Checkbox onChange={onChangeCheckbox}>
									Công việc hiện tại
								</Checkbox>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name="description" label="Mô tả công việc">
								<Input.TextArea
									rows={4}
									placeholder="Mô tả về các nhiệm vụ, trách nhiệm trong quá trình làm việc tại công ty. Các kỹ năng bạn học hỏi được hoặc các thành tựu đã đạt được (Ví dụ: Nhân viên xuất sắc tháng/năm...)"
								/>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Spin>
		</Modal>
	);
};

export default ModalExperience;
