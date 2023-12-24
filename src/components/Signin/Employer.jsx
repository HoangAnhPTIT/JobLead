"use client";
import { USER_ROLE } from "@/src/constants/common";
import { CheckOutlined } from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputForm from "src/commons/FormInput/InputForm";
import InputPassword from "src/commons/FormInput/InputPassword";

const employerIntro = [
	"+4,000,000 ứng viên tiếp cận thông tin tuyển dụng",
	"Hơn 20 hồ sơ ứng tuyển cho 1 việc làm đăng tuyển",
	"Tăng hiệu quả 4 - 5 lần so với các phương thức tuyển dụng khác",
	"+2,000 lượt xem trung bình cho 1 việc làm",
];

const Employer = () => {
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
							{employerIntro?.map((item, i) => (
								<div key={i}>
									<CheckOutlined fontSize="small" />{" "}
									<span className="ml-2">{item}</span>
								</div>
							))}
						</div>
					</Grid>
					<Grid item xs={8} className="bg-white py-7 px-10">
						<h1 className="font-semibold text-2xl">Đăng ký nhà tuyển dụng</h1>
						<form className="my-10">
							<Stack gap={3}>
								<InputForm
									name="email"
									label="Email"
									required
									register={register}
								/>
								<InputPassword required register={register} />
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
									name="companyName"
									label="Tên công ty"
									required
									register={register}
								/>
								<InputForm
									name="companyAddress"
									label="Địa chỉ công ty"
									required
									register={register}
								/>
								<InputForm
									name="city"
									label="Tỉnh/Thành phố"
									required
									register={register}
								/>
								<InputForm
									name="companyName"
									label="Tên công ty"
									required
									register={register}
								/>
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
									onClick={handleSubmit((data) => onSubmit(data))}
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
					href="/dang-ky/ung-vien"
					className="ml-1 hover:text-primary cursor-pointer"
				>
					Đăng ký ứng viên
				</Link>
			</div>
		</div>
	);
};

export default Employer;
