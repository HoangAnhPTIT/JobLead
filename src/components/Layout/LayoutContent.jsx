"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Grid, Menu, MenuItem } from "@mui/material";
import classNames from "classnames";
import { logout, setIsLogin, setUserInfo } from "lib/features/userSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import FooterLayout from "./Footer";

import { setEntities } from "lib/features/entitySlice";
import { isEmpty } from "lodash";
import { ToastContainer } from "react-toastify";
import routeMap from "src/constants/routeMap";
import useEntities from "src/hooks/useEntities";
import Loading from "./Loading";
import SuspenseLoading from "./SuspenseLoading";
import styles from "./styles.module.scss";

const PageHideFooter = ["/nha-tuyen-dung/create-job"];
const PageOutSide = [
	routeMap.login,
	"/dang-nhap/ung-vien",
	"/dang-nhap/nha-tuyen-dung",
	routeMap.signin,
	"/dang-ky/ung-vien",
	"/dang-ky/nha-tuyen-dung",
];

const menuItems = [
	{ label: "Việc làm", link: `${routeMap.job}/viec-lam-hot` },
	{ label: "Công ty", link: routeMap.company },
	{ label: "Ứng viên", link: routeMap.candidate },
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
	const { isLogin } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const entities = useEntities();

	const hideFooter = PageHideFooter.includes(pathname);
	const [anchorEl, setAnchorEl] = useState(false);

	useEffect(() => {
		const isLogin = getCookie("isLogin")
			? JSON?.parse(getCookie("isLogin"))
			: false;
		dispatch(setIsLogin(isLogin));
	}, []);

	useEffect(() => {
		isLogin && PageOutSide.includes(pathname) && router.push("/");
	}, [pathname, isLogin]);

	useEffect(() => {
		!isEmpty(entities) && dispatch(setEntities(entities));
	}, [entities]);

	return (
		<div className="layout">
			<Loading />
			<div
				className={classNames([
					"h-16 flex content-center px-10 bg-bgHeader",
					styles.header,
				])}
			>
				<ToastContainer position="top-center" autoClose={3000} />
				<Grid container justifyContent="space-between" alignContent="center">
					<Grid item>
						<Grid container alignItems="center" spacing={2} className="h-full">
							<Grid
								item
								className="cursor-pointer"
								onClick={() => router.push("/")}
							>
								<Image
									src="https://placehold.co/112x41.png"
									alt="logo"
									width={112}
									height={41}
								/>
							</Grid>
							<Grid item>
								<Grid container>
									{menuItems?.map((item, i) => (
										<Link href={item?.link} key={i}>
											<Grid
												item
												key={i}
												className={classNames([
													"hover:bg-primary hover:text-white px-4 uppercase font-semibold text-primary cursor-pointer",
													item?.link === pathname && "bg-primary text-white",
												])}
											>
												{item?.label}
											</Grid>
										</Link>
									))}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					{isLogin === false && (
						<Grid
							item
							className="text-white font-semibold text-center flex"
							align="middle"
							justify="center"
						>
							<Link href={routeMap.signin}>
								<div className="hover:bg-primary hover:text-white w-[80px] font-semibold text-primary cursor-pointer">
									<span className="text-sm">Đăng ký</span>
								</div>
							</Link>
							<Link href={routeMap.login}>
								<div className="hover:bg-primary hover:text-white w-[80px] font-semibold text-primary cursor-pointer">
									<span className="text-sm">Đăng nhập</span>
								</div>
							</Link>
						</Grid>
					)}
					{isLogin && (
						<div>
							<div
								className="hover:bg-primary hover:text-white w-[80px] font-semibold text-primary cursor-pointer text-center uppercase"
								onClick={(e) => setAnchorEl(e.currentTarget)}
							>
								<span className="text-sm">Tài khoản</span>
							</div>
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								MenuListProps={{
									"aria-labelledby": "basic-button",
								}}
							>
								<MenuItem
									onClick={() => {
										dispatch(logout());
										router.push("/");
										setAnchorEl(null);
									}}
								>
									Đăng xuất
								</MenuItem>
							</Menu>
						</div>
					)}
				</Grid>
			</div>
			<Suspense fallback={<SuspenseLoading />}>
				<div>{children}</div>
			</Suspense>
			{!hideFooter && <FooterLayout />}
		</div>
	);
};
export default LayoutContent;
