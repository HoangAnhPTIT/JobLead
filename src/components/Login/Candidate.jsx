"use client";
import { useAppDispatch } from "@/lib/hooks";
import { CheckOutlined } from "@mui/icons-material";
import { Grid, Stack, TextField } from "@mui/material";
import { Button } from "antd";
import Cookies from "js-cookie";
import { updateLoading } from "lib/features/loadingSlice";
import { setIsLogin } from "lib/features/userSlice";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { httpPost } from "src/apis/apiCaller";
import { apiLoginCandidate } from "src/apis/apiEndpoint";
import InputPassword from "src/commons/FormInput/InputPassword";
import {
	errorMessage,
	expiresTime,
	imageError,
	loggedIn,
} from "src/constants/common";
import routeMap from "src/constants/routeMap";

const candidateIntro = [
	"Tiếp cận hàng triệu công việc hoàn toàn miễn phí",
	"Ứng tuyển nhanh chóng, dễ dàng",
	"Nhận bản tin công việc phù hợp định kỳ",
	"Nâng cao cơ hội tìm việc với chương trình ứng viên năng động",
];

const domain = process.env.DOMAIN_URL;

const Candidate = () => {
	const { register, handleSubmit } = useForm();
	const dispatch = useAppDispatch();

	const onSubmit = async (values) => {
		dispatch(updateLoading(true));
		try {
			const response = await httpPost(apiLoginCandidate, values);
			if (response?.status === 200) {
				Cookies.set("token", response?.tokenLogin?.token, {
					expires: expiresTime,
					domain,
					path: "/",
					secure: true,
					sameSite: "None",
				});
				Cookies.set("refreshToken", response?.tokenLogin?.refreshToken, {
					expires: expiresTime,
					domain,
					path: "/",
					secure: true,
					sameSite: "None",
				});
				Cookies.set(loggedIn, true, {
					expires: expiresTime,
					domain,
					path: "/",
					secure: true,
					sameSite: "None",
				});
				dispatch(setIsLogin(true));
				window.location.href = "/";
			} else {
				toast.error(response?.messages[0] || errorMessage);
			}
		} catch (error) {
			console.error("errorLogin", error);
			toast.error(errorMessage);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	return (
		<div className="bg-bgBody py-16">
			<div className="w-userForm m-auto">
				<Grid container>
					<Grid item xs={4} className="bg-primary text-white py-7 px-5">
						<div>
							<Image
								src={"/bg-dangki-uv-in.png" || imageError}
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
								{/* <div className="-mt-2">
									<FormControlLabel
										control={<Checkbox />}
										label="Nhớ mật khẩu"
										{...register("remember")}
									/>
								</div> */}
							</Stack>
							<Button
								type="primary"
								size="large"
								className="w-full uppercase !mt-5 "
								onClick={handleSubmit((data) => onSubmit(data))}
								htmlType="submit"
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
				Bạn chưa có tài khoản ? <Link href={routeMap.register}>Đăng ký</Link> |
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
