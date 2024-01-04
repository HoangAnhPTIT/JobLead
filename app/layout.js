import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "app/globals.css";
import { Roboto } from "next/font/google";
import LayoutContent from "src/components/Layout/LayoutContent";
import StoreProvider from "./StoreProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import viVN from "antd/locale/vi_VN";
import { ConfigProvider } from "antd";
import { primaryColor } from "src/constants/common";

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
