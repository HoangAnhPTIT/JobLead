"use client";
import { Button, Col, Form, Input, Row } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { toast } from "react-toastify";
import { httpAuthPost } from "src/apis/apiAuthCaller";
import { apiUserChangePassword } from "src/apis/apiEndpoint";
import { errorMessage } from "src/constants/common";

const ChangePassword = () => {
	const { userInfo } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();

	const onChangePassword = async () => {
		dispatch(updateLoading(true));
		try {
			const values = await form.validateFields();
			const response = await httpAuthPost({
				endpoint: apiUserChangePassword,
				data: {
					userId: userInfo?.userId,
					oldPassword: values?.oldPassword,
					newPassword: values?.newPassword,
				},
			});
			if (response?.status === 200) {
				toast.success("Đổi mật khẩu thành công");
				form.resetFields();
			} else {
				toast.error(response?.message);
			}
		} catch {
			toast.error(errorMessage);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	return (
		<Form
			form={form}
			labelCol={{ span: 6 }}
			labelAlign="left"
			wrapperCol={{ span: 10 }}
			autoComplete="off"
		>
			<Form.Item
				name="oldPassword"
				label="Mật khẩu cũ"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input.Password placeholder="Nhập mật khẩu cũ" />
			</Form.Item>
			<Form.Item
				name="newPassword"
				label="Mật khẩu mới"
				rules={[
					{
						required: true,
					},
				]}
				hasFeedback
			>
				<Input.Password placeholder="Nhập mật khẩu mới" />
			</Form.Item>
			<Form.Item
				name="confirm"
				label="Xác nhận mật khẩu mới"
				dependencies={["newPassword"]}
				hasFeedback
				rules={[
					{
						required: true,
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("newPassword") === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("Mật khẩu mới không khớp!"));
						},
					}),
				]}
			>
				<Input.Password placeholder="Xác nhận mật khẩu mới" />
			</Form.Item>
			<Row className="mt-5">
				<Col span={16}>
					<Button
						type="primary"
						className="float-right"
						onClick={onChangePassword}
					>
						Đổi mật khẩu
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default ChangePassword;
