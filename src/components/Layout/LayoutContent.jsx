"use client";
import {
	Col,
	ConfigProvider,
	Dropdown,
	Flex,
	Layout,
	Row,
	theme as themeAntd,
} from "antd";
import locale from "antd/es/locale/vi_VN";
import { login, logout } from "lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import theme from "theme/themeConfig";
import FooterLayout from "./Footer";

const { Header, Content } = Layout;

const menuItems = [
	{ label: "Việc làm", link: "/jobs" },
	{ label: "Công ty", link: "/companies" },
	{ label: "Ứng viên", link: "/candidates" },
];

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

const LayoutContent = ({ children }) => {
	const {
		token: { colorBgContainer },
	} = themeAntd.useToken();

	const router = useRouter();
	const { userInfo, isLogin } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	console.log("userInfo", userInfo);
	const items = [
		{
			key: "1",
			label: <div onClick={() => dispatch(logout())}>Đăng xuất</div>,
		},
	];

	useEffect(() => {
		const isLogin = getCookie("isLogin")
			? JSON?.parse(getCookie("isLogin"))
			: false;
		const userInfo = getCookie("userInfo")
			? JSON?.parse(getCookie("userInfo"))
			: null;
		dispatch(login({ isLogin, userInfo }));
	}, []);

	return (
		<ConfigProvider theme={theme} locale={locale}>
			<Layout className="layout">
				<Header>
					<Flex justify="space-between" align="middle">
						<Row align="middle" justify="start" gutter={16} className="w-full">
							<Col className="cursor-pointer" onClick={() => router.push("/")}>
								<Image src="/logo.png" alt="logo" width={112} height={41} />
							</Col>
							<Col>
								<Flex gap={10}>
									{menuItems?.map((item, i) => (
										<Link href={item?.link} key={i}>
											<div
												key={i}
												className="hover:bg-primary hover:text-white px-2 uppercase font-semibold text-primary cursor-pointer"
											>
												{item?.label}
											</div>
										</Link>
									))}
								</Flex>
							</Col>
						</Row>
						{!isLogin ? (
							<Flex
								className="text-white font-semibold text-center"
								align="middle"
								justify="center"
							>
								<Link href="/signin">
									<div className="hover:bg-primary hover:text-white w-[80px] font-semibold text-primary cursor-pointer">
										<span className="text-sm">Đăng ký</span>
									</div>
								</Link>
								<Link href="/login">
									<div className="hover:bg-primary hover:text-white w-[80px] font-semibold text-primary cursor-pointer">
										<span className="text-sm">Đăng nhập</span>
									</div>
								</Link>
							</Flex>
						) : (
							<Dropdown menu={{ items }} placement="bottom">
								<div className="hover:bg-primary hover:text-white w-[80px] font-semibold text-primary cursor-pointer text-center uppercase">
									<span className="text-sm">{userInfo?.email}</span>
								</div>
							</Dropdown>
						)}
					</Flex>
				</Header>
				<Content>
					<div
						className="site-layout-content"
						style={{
							background: colorBgContainer,
						}}
					>
						{children}
					</div>
				</Content>
				<FooterLayout />
			</Layout>
		</ConfigProvider>
	);
};
export default LayoutContent;
