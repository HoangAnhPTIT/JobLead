"use client";
import { CheckOutlined } from "@ant-design/icons";
import {
	Button,
	Checkbox,
	Col,
	Flex,
	Form,
	Image,
	Input,
	Row,
	Select,
} from "antd";
import Link from "next/link";
import React from "react";
import { USER_ROLE } from "src/constants/common";

const employerIntro = [
	"+4,000,000 ứng viên tiếp cận thông tin tuyển dụng",
	"Hơn 20 hồ sơ ứng tuyển cho 1 việc làm đăng tuyển",
	"Tăng hiệu quả 4 - 5 lần so với các phương thức tuyển dụng khác",
	"+2,000 lượt xem trung bình cho 1 việc làm",
];

const Employer = ({ setSigninType }) => {
	const [form] = Form.useForm();

	const onSubmit = () => {
		console.log("values", form.getFieldsValue());
	};

	return (
		<div className="bg-bgBody py-16">
			<Row className="w-userForm m-auto">
				<Col span={8} className="bg-primary text-white py-7 px-5">
					<div className="text-center">
						<Image src="/bg-dangki-uv-in.png" alt="Ung vien" />
					</div>
					<div className="pt-5 pb-6">
						{employerIntro?.map((item, i) => (
							<div key={i}>
								<CheckOutlined /> <span className="ml-2">{item}</span>
							</div>
						))}
					</div>
				</Col>
				<Col span={16} className="bg-white py-7 px-10">
					<h1 className="font-semibold text-2xl">Đăng ký nhà tuyển dụng</h1>
					<Form
						labelCol={{ flex: "150px" }}
						labelAlign="left"
						labelWrap
						wrapperCol={{ flex: 1 }}
						colon={false}
						form={form}
						onFinish={onSubmit}
						className="py-10"
					>
						<Form.Item name="email" label="Email" rules={[{ required: true }]}>
							<Input size="large" />
						</Form.Item>
						<Form.Item
							name="password"
							label="Mật khẩu"
							rules={[{ required: true }]}
						>
							<Input.Password size="large" />
						</Form.Item>
						<Form.Item
							name="confirm"
							label="Xác nhận mật khẩu"
							dependencies={["password"]}
							hasFeedback
							rules={[
								{
									required: true,
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(new Error("Mật khẩu không khớp!"));
									},
								}),
							]}
						>
							<Input.Password size="large" />
						</Form.Item>
						<Form.Item
							name="fullname"
							label="Họ và tên"
							rules={[{ required: true }]}
						>
							<Input size="large" />
						</Form.Item>
						<Form.Item
							name="phone"
							label="Điện thoại"
							rules={[{ required: true }]}
						>
							<Input size="large" />
						</Form.Item>
						<Form.Item
							name="companyName"
							label="Tên công ty"
							rules={[{ required: true }]}
						>
							<Input size="large" />
						</Form.Item>
						<Form.Item
							name="companyAddress"
							label="Địa chỉ công ty"
							rules={[{ required: true }]}
						>
							<Input size="large" />
						</Form.Item>
						<Form.Item
							name="city"
							label="Tỉnh/Thành phố"
							rules={[{ required: true }]}
						>
							<Select size="large">
								<Select.Option value="HN">Hà nội</Select.Option>
							</Select>
						</Form.Item>

						<div className="text-center text-sm mt-5 mb-5">
							{`Bằng việc bấm vào nút "ĐĂNG KÝ" bạn đã đồng ý với điều
							khoản sử dụng và chính sách bảo mật của Tìm Việc`}
						</div>

						<div className="w-full text-center">
							<Button
								type="primary"
								size="large"
								htmlType="submit"
								className="uppercase !px-10"
							>
								Đăng ký
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
			<div className="text-sm w-userForm px-20 mx-auto text-right mt-5">
				Bạn đã có tài khoản ? <Link href="/login">Đăng nhập</Link> |
				<span
					onClick={() => setSigninType(USER_ROLE.candidate)}
					className="ml-1 hover:text-primary cursor-pointer"
				>
					Đăng ký ứng viên
				</span>
			</div>
		</div>
	);
};

export default Employer;
