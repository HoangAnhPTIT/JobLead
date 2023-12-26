"use client";
import { CheckOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { USER_ROLE, imageError } from "src/constants/common";
import routeMap from "src/constants/routeMap";

const candidateIntro = {
	label: "ứng viên",
	avatar: "/dangky-uv-ct.png",
	intro: [
		"Công việc được cập nhật thường xuyên",
		"Ứng tuyển công việc yêu thích HOÀN TOÀN MIỄN PHÍ",
		"Hiển thị thông tin hồ sơ với nhà tuyển dụng hàng đầu",
		"Nhận bản tin công việc phù hợp định kỳ",
	],
};
const employerIntro = {
	label: "nhà tuyển dụng",
	avatar: "/dangky-ntd-ct.png",
	intro: [
		"Ứng viên sẵn sàng tiếp cận thông tin tuyển dụng",
		"Không giới hạn tương tác với ứng viên qua hệ thống nhắn tin nội bộ MIỄN PHÍ",
		"Quảng cáo thông minh giúp tin tuyển dụng được phủ rộng trên toàn bộ hệ thống",
		"Quảng cáo công ty trên Fanpage số 1 về việc làm – tuyển dụng",
	],
};

const InfoWithImage = ({ info, type }) => {
	const path = usePathname();
	const router = useRouter();

	return (
		<div
			className={classNames([
				"w-[370px] p-5 shadow-custom1 rounded-md relative",
				type === USER_ROLE.candidate ? "bg-white" : "bg-primary",
			])}
		>
			<div className="absolute -top-[70px] left-1/2 -translate-x-1/2">
				<Image
					src={info.avatar || imageError}
					width={166}
					height={166}
					alt={info.type || ""}
					className="rounded-full"
				/>
			</div>
			<div
				className={classNames([
					"pt-24 pb-10",
					type === USER_ROLE.candidate ? "text-black" : "text-white",
				])}
			>
				{info?.intro?.map((item, i) => (
					<div key={i} className="my-1">
						<CheckOutlined fontSize="small" />{" "}
						<span className="ml-2">{item}</span>
					</div>
				))}
			</div>
			<Button
				fullWidth
				variant={type === USER_ROLE.candidate ? "contained" : "outlined"}
				className={classNames([
					"uppercase",
					type === USER_ROLE.candidate ? "bg-primary" : "!bg-white",
				])}
				onClick={() =>
					type === USER_ROLE.candidate
						? router.push(`${path}/ung-vien`)
						: router.push(`${path}/nha-tuyen-dung`)
				}
			>
				<span className={classNames(["font-semibold"])}>
					{path === routeMap.login && "Đăng nhập"}
					{path === routeMap.signin && "Đăng ký"} {info.label}
				</span>
			</Button>
		</div>
	);
};

const Intro = () => {
	return (
		<div gap={40} className="flex gap-10 justify-center bg-bgBody pb-10 pt-24">
			<InfoWithImage info={candidateIntro} type={USER_ROLE.candidate} />
			<InfoWithImage info={employerIntro} type={USER_ROLE.employer} />
		</div>
	);
};

export default Intro;
