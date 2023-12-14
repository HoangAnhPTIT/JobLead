"use client";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Image, Input, Row } from "antd";
import { login } from "lib/features/userSlice";
import { useAppDispatch } from "lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { USER_ROLE } from "src/constants/common";

const candidateIntro = [
	"Tiếp cận hàng triệu công việc hoàn toàn miễn phí",
	"Ứng tuyển nhanh chóng, dễ dàng",
	"Nhận bản tin công việc phù hợp định kỳ",
	"Nâng cao cơ hội tìm việc với chương trình ứng viên năng động",
];

const Candidate = ({ setLoginType }) => {
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();
	const router = useRouter();

	const onSubmit = async () => {
		try {
			const values = await form.validateFields();
			const storeValues = { email: values.email, role: "candidate" };
			dispatch(login({ userInfo: storeValues, isLogin: true }));
			router.push("/");
			document.cookie = `userInfo=${JSON.stringify(storeValues)}`;
			document.cookie = `isLogin=true`;
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<div className="bg-bgBody py-16">
			<Row className="w-userForm m-auto">
				<Col span={8} className="bg-primary text-white py-7 px-5">
					<div className="text-center">
						<Image src="/bg-dangki-uv-in.png" alt="Ung vien" />
					</div>
					<div className="pt-5 pb-6">
						{candidateIntro?.map((item, i) => (
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
							className="w-full uppercase"
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
					onClick={() => setLoginType(USER_ROLE.employer)}
					className="ml-1 hover:text-primary cursor-pointer"
				>
					Đăng nhập nhà tuyển dụng
				</span>
			</div>
		</div>
	);
};

export default Candidate;
