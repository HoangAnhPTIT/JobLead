import { Form, Input, Modal } from "antd";

const ModalChangePassword = ({ open, onCancel }) => {
	const [form] = Form.useForm();
	return (
		<Modal title="Thay đổi mật khẩu" open={open} onCancel={onCancel}>
			<Form
				form={form}
				labelCol={{ span: 6 }}
				labelAlign="left"
				wrapperCol={{ span: 18 }}
				autoComplete="off"
			>
				<Form.Item
					name="oldPassword"
					label="Mật khẩu cũ"
					rules={[{ required: true }]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					name="newPassword"
					label="Mật khẩu mới"
					rules={[{ required: true }]}
				>
					<Input.Password />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ModalChangePassword;
