"use client";
import { login } from "@/lib/features/userSlice";
import { useAppDispatch } from "@/lib/hooks";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import InputPassword from "src/commons/FormInput/InputPassword";

const candidateIntro = [
	"Tiếp cận hàng triệu công việc hoàn toàn miễn phí",
	"Ứng tuyển nhanh chóng, dễ dàng",
	"Nhận bản tin công việc phù hợp định kỳ",
	"Nâng cao cơ hội tìm việc với chương trình ứng viên năng động",
];

const Candidate = () => {
	const { register, handleSubmit } = useForm();
	const dispatch = useAppDispatch();
	const router = useRouter();

	const onSubmit = async (values) => {
		try {
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
								<div key={i} className="flex items-start">
									<CheckOutlined /> <span className="ml-2">{item}</span>
								</div>
							))}
						</div>
					</Grid>
					<Grid item xs={8} className="bg-white py-10">
						<form className="w-[360px] m-auto">
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
				Bạn chưa có tài khoản ? <Link href="/dang-ky">Đăng ký</Link> |
				<Link
					href="/dang-nhap/nha-tuyen-dung"
					className="ml-1 hover:text-primary cursor-pointer"
				>
					Đăng nhập nhà tuyển dụng
				</Link>
			</div>
		</div>
	);
};

export default Candidate;
