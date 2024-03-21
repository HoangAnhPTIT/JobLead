"client";
import { Form, Input, Modal, Spin } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { httpAuthPost, httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateActivity } from "src/apis/apiEndpoint";
import { updateSuccessMessage } from "src/constants/common";
import { CV_MODAL_TYPES } from "src/constants/cv";

const ModalActivity = ({ data, modalType, closeModal }) => {
	const { isLoading } = useAppSelector((state) => state.loading);
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const isThisModal = modalType === CV_MODAL_TYPES.activity;

	const onSubmit = async () => {
		dispatch(updateLoading(true));
		try {
			const values = await form.validateFields();
			const response = data
				? await httpAuthPut({
						endpoint: apiCandidateActivity,
						data: { id: data?.id, ...values },
				  })
				: await httpAuthPost({
						endpoint: apiCandidateActivity,
						data: values,
				  });
			if (response.status === 200) {
				toast.success(updateSuccessMessage);
				closeModal(false);
			} else {
				toast.error(response.message);
			}
		} catch (error) {
			toast.error(error?.message);
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
			title="Lưu CV"
			className="p-0"
			width={750}
			onOk={onSubmit}
			okText="Lưu thông tin"
			confirmLoading={isLoading}
		>
			<Spin spinning={isLoading}>
				<Form form={form} layout="vertical" autoComplete="off">
					<Form.Item name="title" label="Tên CV" rules={[{ required: true }]}>
						<Input placeholder="Nhập tên CV" />
					</Form.Item>
					<Form.Item name="description" label="Mô tả CV">
						<Input.TextArea placeholder="Nhập mô tả CV" />
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	);
};

export default ModalActivity;
