import { Checkbox, Col, Form, Input, Modal, Row, Spin } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateCareerGoal } from "src/apis/apiEndpoint";
import { updateSuccessMessage } from "src/constants/common";
import { CV_MODAL_TYPES } from "src/constants/cv";

const ModalCareer = ({ data, modalType, closeModal }) => {
	const { isLoading } = useAppSelector((state) => state.loading);
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const { entities } = useAppSelector((state) => state.entity);

	const onSubmit = async () => {
		dispatch(updateLoading(true));
		try {
			const values = await form.validateFields();
			const response = await httpAuthPut({
				endpoint: apiCandidateCareerGoal,
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
		const formData = {
			description: data?.description,
			goalIds: data?.items?.map((item) => item?.id),
		};
		form.setFieldsValue(formData);
	}, [data, form]);

	return (
		<Modal
			open={modalType === CV_MODAL_TYPES.careerGoal}
			onCancel={() => closeModal(false)}
			title="Mục tiêu nghề nghiệp"
			className="p-0"
			width={750}
			onOk={onSubmit}
			okText="Lưu thông tin"
			confirmLoading={isLoading}
		>
			<Spin spinning={isLoading}>
				<Form form={form} layout="vertical" autoComplete="off">
					<Form.Item name="description">
						<Input.TextArea />
					</Form.Item>
					<Form.Item name="goalIds">
						<Checkbox.Group>
							<Row gutter={[16, 16]} className="mt-4">
								{entities?.CareerGoal?.map((item, i) => (
									<Col span={24} key={i}>
										<Checkbox value={item?.id}>{item?.name}</Checkbox>
									</Col>
								))}
							</Row>
						</Checkbox.Group>
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	);
};

export default ModalCareer;
