"use client";
import { USER_ROLE } from "@/src/constants/common";
import { CheckOutlined } from "@mui/icons-material";
import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Stack,
	TextField,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputPassword from "src/commons/FormInput/InputPassword";

const employerIntro = [
	"+4,000,000 ứng viên tiếp cận thông tin tuyển dụng",
	"Hơn 20 hồ sơ ứng tuyển cho 1 việc làm đăng tuyển",
	"Tăng hiệu quả 4 - 5 lần so với các phương thức tuyển dụng khác",
	"+2,000 lượt xem trung bình cho 1 việc làm",
];

const Employer = ({ setLoginType }) => {
	const { register, handleSubmit } = useForm();

	const onSubmit = async (values) => {
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
								<div key={i} className="flex items-start">
									<CheckOutlined /> <span className="ml-2">{item}</span>
								</div>
							))}
						</div>
					</Grid>
					<Grid item xs={8} className="bg-white py-10">
						<form autoComplete="off" className="w-[360px] m-auto">
							<h1 className="text-center font-semibold text-3xl my-10">
								Đăng nhập ứng viên
							</h1>
							<Stack gap={3}>
								<TextField
									fullWidth
									size="small"
									variant="outlined"
									label="Email"
									{...register("email")}
								/>
								<InputPassword register={register} />

								<div className="-mt-2 mb-2">
									<FormControlLabel
										control={<Checkbox />}
										label="Nhớ mật khẩu"
										{...register("remember")}
									/>
								</div>
							</Stack>
							<Button
								variant="contained"
								size="medium"
								className="w-full uppercase bg-primary"
								onClick={handleSubmit((data) => onSubmit(data))}
							>
								Đăng nhập
							</Button>
							<div className="text-right underline text-sm mt-2">
								Quên mật khẩu?
							</div>
						</form>
					</Grid>
				</Grid>
			</div>
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
