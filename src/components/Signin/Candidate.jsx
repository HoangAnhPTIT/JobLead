"use client";
import { USER_ROLE } from "@/src/constants/common";
import { CheckOutlined } from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputForm from "src/commons/FormInput/InputForm";
import InputPassword from "src/commons/FormInput/InputPassword";

const candidateIntro = [
	"Tiếp cận hàng triệu công việc hoàn toàn miễn phí",
	"Ứng tuyển nhanh chóng, dễ dàng",
	"Nhận bản tin công việc phù hợp định kỳ",
	"Nâng cao cơ hội tìm việc với chương trình ứng viên năng động",
];

const Candidate = ({ setSigninType }) => {
	const { register, handleSubmit } = useForm();

	const onSubmit = (values) => {
		console.log("values", values);
	};

	return (
		<div className="bg-bgBody py-16">
			<div className="w-userForm m-auto">
				<Grid container>
					<Grid item xs={4} className="bg-primary text-white py-7 px-5">
						<div>
							<Image
								src="/bg-dangki-uv-in.png"
								alt="Ung vien"
								width={162}
								height={145}
								className="mx-auto"
							/>
						</div>
						<div className="pt-5 pb-6">
							{candidateIntro?.map((item, i) => (
								<div key={i}>
									<CheckOutlined /> <span className="ml-2">{item}</span>
								</div>
							))}
						</div>
					</Grid>
					<Grid item xs={8} className="bg-white py-7 px-10">
						<h1 className="font-semibold text-2xl">Đăng ký ứng viên</h1>
						<form className="my-5">
							<Stack gap={3}>
								<InputForm
									name="fullname"
									label="Họ và tên"
									required
									register={register}
								/>
								<InputForm
									name="phone"
									label="Điện thoại"
									required
									register={register}
								/>
								<InputForm
									name="email"
									label="Email"
									required
									register={register}
								/>
								<InputPassword required register={register} />
							</Stack>

							<div className="text-center text-sm mt-5 mb-5">
								{`Bằng việc bấm vào nút "ĐĂNG KÝ" bạn đã đồng ý với điều
								khoản sử dụng và chính sách bảo mật của Tìm Việc`}
							</div>

							<div className="w-full text-center">
								<Button
									variant="contained"
									size="medium"
									className="uppercase !px-10 bg-primary"
								>
									Đăng ký
								</Button>
							</div>
						</form>
					</Grid>
				</Grid>
			</div>
			<div className="text-sm w-userForm px-20 mx-auto text-right mt-5">
				Bạn đã có tài khoản ? <Link href="/dang-nhap">Đăng nhập</Link> |
				<Link
					href={"/dang-ky/nha-tuyen-dung"}
					className="ml-1 hover:text-primary cursor-pointer"
				>
					Đăng ký nhà tuyển dụng
				</Link>
			</div>
		</div>
	);
};

export default Candidate;
