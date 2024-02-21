import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import "app/globals.css";
import { Roboto } from "next/font/google";
import LayoutContent from "src/components/Layout/LayoutContent";
import { primaryColor } from "src/constants/common";
import StoreProvider from "./StoreProvider";

const roboto = Roboto({
	weight: ["100", "300", "400", "700", "900"],
	subsets: ["latin"],
});

export const metadata = {
	title: "Tìm việc làm",
	description: "Tìm việc làm",
};

const RootLayout = ({ children }) => {
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
										borderRadius: 4,
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
										},
										Table: {
											headerBg: primaryColor,
											headerColor: "#fff",
										},
									},
								}}
							>
								<LayoutContent>{children}</LayoutContent>
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
