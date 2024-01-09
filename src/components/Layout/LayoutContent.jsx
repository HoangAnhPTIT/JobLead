"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Grid, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import classNames from "classnames";
import { logout, setIsLogin, setUserInfo } from "lib/features/userSlice";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import FooterLayout from "./Footer";

import {
	BorderColor,
	KeyboardArrowDown,
	Logout,
	MenuOutlined,
	TextSnippet,
} from "@mui/icons-material";
import { viVN } from "@mui/material/locale";
import { jwtDecode } from "jwt-decode";
import { setEntities } from "lib/features/entitySlice";
import { isEmpty } from "lodash";
import { ToastContainer } from "react-toastify";
import { USER_ROLE, imageError, token } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { deleteAllCookies, getCookie } from "src/helper/common";
import useEntities from "src/hooks/useEntities";
import Loading from "./Loading";
import SuspenseLoading from "./SuspenseLoading";
import styles from "./styles.module.scss";

const theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
		},
	},
	viVN,
});

const PageHideFooter = [
	`${routeMap.employer}${routeMap.createJob}`,
	`${routeMap.candidate}${routeMap.detail}`,
];
const PageOutSide = [
	routeMap.login,
	"/dang-nhap/ung-vien",
	"/dang-nhap/nha-tuyen-dung",
	routeMap.register,
	"/dang-ky/ung-vien",
	"/dang-ky/nha-tuyen-dung",
];

// const PageByRole = {
// 	Candidate: [routeMap.file, ],
// 	Employer: [routeMap.employer],
// };

const menuItems = [
	{ label: "Việc làm", link: `${routeMap.job}/viec-lam-hot` },
	{ label: "Công ty", link: routeMap.company },
	{ label: "Ứng viên", link: routeMap.candidate },
];

const userMenu = {
	[USER_ROLE.candidate]: [
		{
			icon: <TextSnippet />,
			label: "Quản lý hồ sơ",
			link: `${routeMap.file}${routeMap.cv}`,
		},
	],
	[USER_ROLE.employer]: [
		{
			icon: <BorderColor />,
			label: "Đăng tin tuyển dụng",
			link: `${routeMap.employer}${routeMap.createJob}`,
		},
	],
};

const LayoutContent = ({ children }) => {
	const router = useRouter();
	const pathname = usePathname();
	const { isLogin, userInfo } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const entities = useEntities();
	const params = useParams();

	const shortPath = isEmpty(params)
		? pathname
		: pathname.replace(`/${params.id}`, "");

	console.log("shortPath", shortPath);

	const [showMenu, setShowMenu] = useState(false);

	const hideFooter = PageHideFooter.includes(shortPath);

	const handleLogout = () => {
		deleteAllCookies();
		dispatch(logout());
		window.location.href = "/";
	};

	useEffect(() => {
		const isLogin = getCookie("isLogin")
			? JSON?.parse(getCookie("isLogin"))
			: false;
		dispatch(setIsLogin(isLogin));
		if (isLogin) {
			const tokenCookie = getCookie(token);
			const decodeToken = jwtDecode(tokenCookie);
			const userInfo = {
				userId: decodeToken.userId,
				email:
					decodeToken[
						"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
					],
				role: decodeToken[
					"http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
				],
			};
			dispatch(setUserInfo(userInfo));
		} else {
			deleteAllCookies();
		}
	}, []);

	useEffect(() => {
		isLogin && PageOutSide.includes(pathname) && router.push("/");
	}, [pathname, isLogin]);

	useEffect(() => {
		!isEmpty(entities) && dispatch(setEntities(entities));
	}, [entities]);

	useEffect(() => {
		setShowMenu(false);
	}, [pathname]);

	return (
		<ThemeProvider theme={theme}>
			<div className="layout">
				<Loading />
				<ToastContainer
					position="top-right"
					autoClose={3000}
					theme="light"
					className={styles.toastCustom}
				/>
				<div
					className={classNames([
						"h-16 fixed top-0 left-0 z-10 flex content-center lg:px-10 bg-bgHeader w-full",
						styles.header,
					])}
				>
					<div className="relative w-full">
						<Grid
							container
							alignItems="center"
							alignContent="center"
							spacing={{ xs: 0, lg: 1 }}
							className="text-33"
						>
							<Grid item xs={12} lg="auto">
								<div
									className="cursor-pointer p-3 lg:p-0 w-fit"
									onClick={() => router.push("/")}
								>
									<Image
										src={"https://placehold.co/112x41.png" || imageError}
										alt="logo"
										width={112}
										height={41}
									/>
								</div>
							</Grid>
							<Grid
								item
								xs={12}
								lg="auto"
								className={classNames(
									"!flex-1 w-full left-0 lg:left-auto absolute top-16 lg:relative lg:top-0 bg-white lg:!visible",
									showMenu ? "visible" : "invisible"
								)}
							>
								<Grid
									container
									justifyContent="space-between"
									alignItems="center"
									spacing={{ xs: 0, lg: 2 }}
									className="w-full"
								>
									<Grid item xs={12} lg="auto">
										<Grid container>
											{menuItems?.map((item, i) => (
												<Grid item xs={12} lg="auto" key={i}>
													<Link href={item?.link}>
														<div
															className={classNames([
																"hover:bg-secondary hover:text-white px-4 uppercase font-semibold cursor-pointer text-xs h-16 flex items-center",
																item?.link === pathname &&
																	"bg-secondary text-white",
															])}
														>
															{item?.label}
														</div>
													</Link>
												</Grid>
											))}
										</Grid>
									</Grid>
									{isLogin === false && (
										<Grid
											item
											xs={12}
											lg="auto"
											className="text-white font-semibold"
											justify="center"
										>
											<Grid container>
												<Grid item xs={12} lg="auto">
													<Link href={routeMap.login}>
														<div className="hover:bg-secondary hover:text-white px-4 lg:px-2 font-semibold text-33 cursor-pointer">
															<span className="text-sm">Đăng nhập</span>
														</div>
													</Link>
												</Grid>
												<Grid item xs={12} lg="auto">
													<Link href={routeMap.register}>
														<div className="hover:bg-secondary hover:text-white px-4 lg:px-2 font-semibold text-33 cursor-pointer">
															<span className="text-sm te">Đăng ký</span>
														</div>
													</Link>
												</Grid>
											</Grid>
										</Grid>
									)}
									{isLogin && (
										<Grid item xs={12} lg="auto">
											<div
												className={classNames(
													"hover:bg-secondary hover:text-white text-33 cursor-pointer relative px-4 lg:px-2",
													styles.acc
												)}
											>
												<div
													className={classNames(
														"text-sm font-semibold uppercase",
														styles.item
													)}
												>
													Tài khoản <KeyboardArrowDown />
												</div>
												<div
													className={classNames(
														"hidden absolute bg-white text-33 top-[64px] right-0 w-[200px] border",
														styles.accMenu
													)}
												>
													<Stack>
														{userMenu?.[userInfo?.role]?.map((item, i) => (
															<div
																onClick={() => {
																	router.push(item?.link);
																}}
																className="text-sm hover:text-primary p-2 border-b hover:bg-ee"
																key={i}
															>
																{item.icon}
																<span className="ml-2">{item.label}</span>
															</div>
														))}
														<div
															onClick={handleLogout}
															className="text-sm hover:text-primary p-2 hover:bg-ee"
														>
															<Logout /> <span className="ml-2">Đăng xuất</span>
														</div>
													</Stack>
												</div>
											</div>
										</Grid>
									)}
								</Grid>
							</Grid>
						</Grid>
						<MenuOutlined
							fontSize="large"
							className="absolute top-4 right-3 cursor-pointer lg:!hidden"
							onClick={() => setShowMenu(!showMenu)}
						/>
					</div>
				</div>
				<Suspense fallback={<SuspenseLoading />}>
					<div className="mt-[64px]">{children}</div>
				</Suspense>
				{!hideFooter && <FooterLayout />}
			</div>
		</ThemeProvider>
	);
};
export default LayoutContent;
