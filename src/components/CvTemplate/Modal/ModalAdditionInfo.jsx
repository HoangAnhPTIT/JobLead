import { Col, Form, Modal, Row, Spin } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { httpAuthPost, httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateExpectation } from "src/apis/apiEndpoint";
import SelectAntd from "src/commons/AntdForm/SelectAntd";
import { updateSuccessMessage } from "src/constants/common";
import { CV_MODAL_TYPES } from "src/constants/cv";

const ModalAdditionInfo = ({ data, modalType, closeModal }) => {
	const { isLoading } = useAppSelector((state) => state.loading);
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const { entities } = useAppSelector((state) => state.entity);
	const isThisModal = modalType === CV_MODAL_TYPES.expectation;

	const onSubmit = async () => {
		dispatch(updateLoading(true));
		try {
			const values = await form.validateFields();
			const response = data?.id
				? await httpAuthPut({
						endpoint: apiCandidateExpectation,
						data: { ...data, ...values },
				  })
				: await httpAuthPost({
						endpoint: apiCandidateExpectation,
						data: { ...data, ...values },
				  });
			if (response.status === 200) {
				toast.success(updateSuccessMessage);
				closeModal(false);
			} else {
				toast.error(response.message);
			}
		} catch (error) {
			toast.error(error?.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		form.setFieldsValue(data);
	}, [data, form]);

	return (
		<Modal
			open={isThisModal}
			onCancel={() => closeModal(false)}
			title="Thông tin bổ sung"
			className="p-0"
			width={750}
			onOk={onSubmit}
			okText="Lưu thông tin"
			confirmLoading={isLoading}
		>
			<Spin spinning={isLoading}>
				<p className="text-red2">
					<strong>*Lưu ý:</strong> Dưới đây là những thông tin bắt buộc phải
					nhập trước khi lưu hồ sơ, các thông tin này không nằm trong CV của bạn
				</p>
				<Form form={form} layout="vertical" autoComplete="off">
					<Row gutter={16}>
						<Col span={12}>
							<SelectAntd
								form={Form}
								name="experienceId"
								label="Kinh nghiệm"
								rules={[{ required: true }]}
								list={entities?.Experience}
								placeholder="Chọn kinh nghiệm"
							/>
						</Col>
						<Col span={12}>
							<SelectAntd
								form={Form}
								name="degreeId"
								label="Trình độ học vấn"
								rules={[{ required: true }]}
								list={entities?.Degree}
								placeholder="Chọn trình đọ học vấn"
							/>
						</Col>
						<Col span={12}>
							<SelectAntd
								form={Form}
								name="locationIds"
								label="Nơi làm việc"
								mode="multiple"
								rules={[{ required: true }]}
								list={entities?.City}
								placeholder="Chọn nơi làm việc"
							/>
						</Col>
						<Col span={12}>
							<SelectAntd
								form={Form}
								name="careerIds"
								label="Ngành nghề"
								mode="multiple"
								rules={[{ required: true }]}
								list={entities?.Career}
								placeholder="Chọn ngành nghề"
							/>
						</Col>
						<Col span={24}>
							<SelectAntd
								form={Form}
								name="typeOfWorkIds"
								label="Loại hình công việc"
								mode="multiple"
								rules={[{ required: true }]}
								list={entities?.TypeOfWork}
								placeholder="Chọn loại hình công việc"
							/>
						</Col>
						<Col span={12}>
							<SelectAntd
								form={Form}
								name="levelId"
								label="Cấp bậc"
								rules={[{ required: true }]}
								list={entities?.Level}
								placeholder="Chọn cấp bậc"
							/>
						</Col>
						<Col span={12}>
							<SelectAntd
								form={Form}
								name="salaryId"
								label="Mức lương"
								rules={[{ required: true }]}
								list={entities?.Salary}
								placeholder="Chọn mức lương mong muốn"
							/>
						</Col>
					</Row>
				</Form>
			</Spin>
		</Modal>
	);
};

export default ModalAdditionInfo;
