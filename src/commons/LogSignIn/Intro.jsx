"use client";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Flex, Image } from "antd";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { USER_ROLE } from "src/constants/common";

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

const InfoWithImage = ({ info, type, setType }) => {
	const path = usePathname();

	return (
		<div
			className={classNames([
				"w-[370px] p-5 shadow-custom1 rounded-md relative",
				type === USER_ROLE.candidate ? "bg-white" : "bg-primary",
			])}
		>
			<div className="absolute -top-[70px] left-1/2 -translate-x-1/2">
				<Image
					src={info.avatar}
					width={166}
					height={166}
					alt={info.type}
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
						<CheckOutlined /> <span className="ml-2">{item}</span>
					</div>
				))}
			</div>
			<Button
				size="large"
				type={type === USER_ROLE.candidate ? "primary" : "default"}
				className={classNames([
					"w-full uppercase",
					type !== USER_ROLE.candidate ? "bg-primary" : "bg-whi",
				])}
				onClick={() => setType(type)}
			>
				<span
					className={classNames([
						"font-semibold",
						type === USER_ROLE.candidate ? "text-white" : "text-primary",
					])}
				>
					{path === "/login" && "Đăng nhập"}
					{path === "/signin" && "Đăng ký"} {info.label}
				</span>
			</Button>
		</div>
	);
};

const Intro = ({ setType }) => {
	return (
		<Flex justify="center" gap={40} className="bg-bgBody pb-10 pt-24">
			<InfoWithImage
				info={candidateIntro}
				type={USER_ROLE.candidate}
				setType={setType}
			/>
			<InfoWithImage
				info={employerIntro}
				type={USER_ROLE.employer}
				setType={setType}
			/>
		</Flex>
	);
};

export default Intro;
