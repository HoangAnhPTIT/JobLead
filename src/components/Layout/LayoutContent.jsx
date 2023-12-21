"use client";
import { login, logout } from "@/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Grid, Menu, MenuItem } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import FooterLayout from "./Footer";

import Loading from "./Loading";
import styles from "./styles.module.scss";

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

	const hideFooter = PageHideFooter.includes(pathname);
	const [anchorEl, setAnchorEl] = useState(false);

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
		<div className="layout">
			<div
				className={classNames([
					"h-16 flex content-center px-10 bg-bgHeader",
					styles.header,
				])}
			>
				<Grid container justifyContent="space-between" alignContent="center">
					<Grid item>
						<Grid container alignItems="center" spacing={2} className="h-full">
							<Grid
								item
								className="cursor-pointer"
								onClick={() => router.push("/")}
							>
								<Image src="/logo.png" alt="logo" width={112} height={41} />
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
					{!isLogin ? (
						<Grid
							item
							className="text-white font-semibold text-center flex"
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
						</Grid>
					) : (
						<div>
							<div
								className="hover:bg-primary hover:text-white w-[80px] font-semibold text-primary cursor-pointer text-center uppercase"
								onClick={(e) => setAnchorEl(e.currentTarget)}
							>
								<span className="text-sm">{userInfo?.email}</span>
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
			<Suspense fallback={<Loading />}>
				<div>{children}</div>
			</Suspense>
			{!hideFooter && <FooterLayout />}
		</div>
	);
};
export default LayoutContent;
