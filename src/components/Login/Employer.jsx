"use client";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Image, Input, Row } from "antd";
import Link from "next/link";
import { USER_ROLE } from "@/src/constants/common";

const employerIntro = [
	"+4,000,000 ứng viên tiếp cận thông tin tuyển dụng",
	"Hơn 20 hồ sơ ứng tuyển cho 1 việc làm đăng tuyển",
	"Tăng hiệu quả 4 - 5 lần so với các phương thức tuyển dụng khác",
	"+2,000 lượt xem trung bình cho 1 việc làm",
];

const Employer = ({ setLoginType }) => {
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
				<Col span={16} className="bg-white py-10">
					<Form form={form} onFinish={onSubmit} className="w-[360px] m-auto">
						<h1 className="text-center font-semibold text-3xl my-10">
							Đăng nhập ứng viên
						</h1>
						<Form.Item name="email">
							<Input size="large" placeholder="Email" />
						</Form.Item>
						<Form.Item name="password">
							<Input type="password" size="large" placeholder="Mật khẩu" />
						</Form.Item>
						<Form.Item name="remember" valuePropName="checked">
							<Checkbox>Nhớ đăng nhập</Checkbox>
						</Form.Item>
						<Button
							type="primary"
							size="large"
							htmlType="submit"
							className="w-full uppercase bg-primary"
						>
							Đăng nhập
						</Button>
						<div className="text-right underline text-sm mt-2">
							Quên mật khẩu?
						</div>
					</Form>
				</Col>
			</Row>
			<div className="text-sm w-userForm px-20 mx-auto text-right mt-5">
				Bạn chưa có tài khoản ? <Link href="/signin">Đăng ký</Link> |
				<span
					onClick={() => setLoginType(USER_ROLE.candidate)}
					className="ml-1 hover:text-primary cursor-pointer"
				>
					Đăng nhập ứng viên
				</span>
			</div>
		</div>
	);
};

export default Employer;
