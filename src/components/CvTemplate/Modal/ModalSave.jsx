"client";
import { Form, Input, Modal, Spin } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { httpAuthPost, httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCv } from "src/apis/apiEndpoint";
import { updateSuccessMessage } from "src/constants/common";
import { CV_MODAL_TYPES } from "src/constants/cv";

const ModalSave = ({ data, modalType, closeModal }) => {
	const { templateId } = useParams();
	const { isLoading } = useAppSelector((state) => state.loading);
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const isThisModal = modalType === CV_MODAL_TYPES.save;

	const onSubmit = async () => {
		dispatch(updateLoading(true));
		try {
			const values = await form.validateFields();
			const response = data?.id
				? await httpAuthPut({
						endpoint: `${apiCv}/${templateId}`,
						data: values,
				  })
				: await httpAuthPost({
						endpoint: apiCv,
						data: { ...values, templateCode: templateId },
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
					<Form.Item name="name" label="Tên CV" rules={[{ required: true }]}>
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

export default ModalSave;
