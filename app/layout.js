'use client';

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import "app/globals.css";
import { Roboto } from "next/font/google";
import LayoutContent from "src/components/Layout/LayoutContent";
import { primaryColor } from "src/constants/common";
import StoreProvider from "./StoreProvider";
import { usePathname } from "next/navigation";
import LayoutTopContent from "src/components/Layout/LayoutTopContent";

const roboto = Roboto({
	weight: ["100", "300", "400", "700", "900"],
	subsets: ["latin"],
});

// export const metadata = {
// 	title: "Khách hàng tiềm năng",
// 	description: "Khách hàng tiềm năng",
// };

const RootLayout = ({ children }) => {
	const pathname = usePathname();

	// Choose layout based on route
	const getLayout = () => {
		if (pathname === "/dang-nhap" || pathname === "/dang-ky") {
			return <LayoutTopContent>{children}</LayoutTopContent>;
		}
		return <LayoutContent>{children}</LayoutContent>;
	};

	return (
		<html>
			<head></head>
			<body className={roboto.className}>
				<StoreProvider>
					<AppRouterCacheProvider>
						<AntdRegistry>
							<ConfigProvider
								locale={viVN}
								theme={{
									token: {
										colorPrimary: primaryColor,
										borderRadius: 8,
										fontSizeIcon: 14,
									},
									components: {
										Form: {
											itemMarginBottom: 10,
											colorTextPlaceholder: "#c6c6c6",
										},
										Select: {
											colorTextPlaceholder: "#c6c6c6",
										},
										Input: {
											colorTextPlaceholder: "#c6c6c6",
											borderRadius: 3,
										},
										Table: {
											headerBg: "#fff",
											headerColor: "#333336",
											headerSplitColor: "#fff",
											headerBorderRadius: 0,
										},
										Checkbox: {
											borderRadius: 2,
										},
										Modal: {
											wireframe: true,
										},
									},
								}}
							>
								{getLayout()}
							</ConfigProvider>
						</AntdRegistry>
					</AppRouterCacheProvider>
				</StoreProvider>
			</body>
		</html>
	);
};

export const dynamic = "force-dynamic";

export default RootLayout;
