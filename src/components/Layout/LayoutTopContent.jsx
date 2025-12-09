"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { viVN } from "@mui/material/locale";
import { Layout, Spin } from "antd";
import { setEntities } from "lib/features/entitySlice";
import { isEmpty } from "lodash";
import { ToastContainer } from "react-toastify";
import routeMap from "src/constants/routeMap";
import styles from "./styles.module.scss";
import Header from "./Header";

const { Sider, Content } = Layout;

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

const PageOutSide = [
	routeMap.login,
	"/dang-nhap/ung-vien",
	"/dang-nhap/nha-tuyen-dung",
	routeMap.register,
	"/dang-ky/ung-vien",
	"/dang-ky/nha-tuyen-dung",
];

const LayoutTopContent = ({ children }) => {
	const pathname = usePathname();
	const { isLogin, userInfo } = useAppSelector((state) => state.user);
	const { isLoading } = useAppSelector((state) => state.loading);
	const dispatch = useAppDispatch();

	useEffect(() => {
		isLogin && PageOutSide.includes(pathname);
	}, [pathname, isLogin]);

	return (
		<ThemeProvider theme={theme}>
			<div className="layout">
				<Spin
					spinning={isLoading}
					indicator={<LoadingOutlined />}
					size="large"
					className="z-20"
				>
					<ToastContainer
						position="top-right"
						autoClose={3000}
						theme="light"
						className={styles.toastCustom}
						style={{ zIndex: 999999999 }}
					/>
					<Header />
					<Layout className={classNames("mt-16", styles.layout)}>
						<Content className="h-[calc(100vh-64px)] overflow-y-auto p-5 bg-bgContainer">
							{children}
						</Content>
					</Layout>
				</Spin>
			</div>
		</ThemeProvider>
	);
};
export default LayoutTopContent;
