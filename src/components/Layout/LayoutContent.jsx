"use client";
import { login, logout } from "@/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import theme from "theme/themeConfig";
import { Col, ConfigProvider, Dropdown, Flex, Layout, Row } from "antd";
import locale from "antd/es/locale/vi_VN";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import FooterLayout from "./Footer";
import Loading from "./Loading";

const { Header, Content } = Layout;

const PageHideFooter = ["/employer/create-job"];

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
	const router = useRouter();
	const pathname = usePathname();
	const { userInfo, isLogin } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const items = [
		{
			key: "1",
			label: <div onClick={() => dispatch(logout())}>Đăng xuất</div>,
		},
	];

	const hideFooter = PageHideFooter.includes(pathname);

	useEffect(() => {
		const isLogin = getCookie("isLogin")
			? JSON?.parse(getCookie("isLogin"))
			: false;
		const userInfo = getCookie("userInfo")
			? JSON?.parse(getCookie("userInfo"))
			: null;
		dispatch(login({ isLogin, userInfo }));
	}, []);

	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
	}, []);

	return (
		<ConfigProvider locale={locale}>
			<Layout className="layout">
				<Header>
					<Flex justify="space-between" align="middle">
						<Row align="middle" justify="start" gutter={16} className="w-full">
							<Col className="cursor-pointer" onClick={() => router.push("/")}>
								<Image src="/logo.png" alt="logo" width={112} height={41} />
							</Col>
							<Col>
								<Flex>
									{menuItems?.map((item, i) => (
										<Link href={item?.link} key={i}>
											<div
												key={i}
												className={classNames([
													"hover:bg-primary hover:text-white px-4 uppercase font-semibold text-primary cursor-pointer",
													item?.link === pathname && "bg-primary text-white",
												])}
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
				<Suspense fallback={<Loading />}>
					<Content>
						{!loading ? (
							<Loading />
						) : (
							<div className="site-layout-content">{children}</div>
						)}
					</Content>
				</Suspense>
				{!hideFooter && <FooterLayout />}
			</Layout>
		</ConfigProvider>
	);
};
export default LayoutContent;
