"use client";
import { CheckOutlined } from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { httpPost } from "src/apis/apiCaller";
import { apiRegister } from "src/apis/apiEndpoint";
import InputForm from "src/commons/FormInput/InputForm";
import InputPassword from "src/commons/FormInput/InputPassword";
import { toastError, toastSuccess } from "src/commons/Toast";
import { imageError } from "src/constants/common";
import routeMap from "src/constants/routeMap";

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
		dispatch(updateLoading(true));
		try {
			const response = await httpPost(apiRegister, values);
			if (response?.status === 200) {
				toastSuccess("Đăng kí tài khoản thành công");
				router.push(routeMap.login);
			} else {
				toastError(response?.message);
			}
		} catch (error) {
			toastError("Có lỗi xảy ra vui lòng thử lại");
			console.error("register error", error);
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
								<div key={i}>
									<CheckOutlined /> <span className="ml-2">{item}</span>
								</div>
							))}
						</div>
					</Grid>
					<Grid item xs={8} className="bg-white py-7 px-10">
						<h1 className="font-semibold text-2xl">Đăng ký ứng viên</h1>
						<form className="my-5" autoComplete="off">
							<Stack gap={3}>
								<InputForm
									name="fullName"
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
				Bạn đã có tài khoản ? <Link href={routeMap.login}>Đăng nhập</Link> |
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
