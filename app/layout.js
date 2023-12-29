import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "app/globals.css";
import { Roboto } from "next/font/google";
import LayoutContent from "src/components/Layout/LayoutContent";
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
			<head>
				<script src="/static/monitor.js" async />
			</head>
			<body className={roboto.className}>
				<StoreProvider>
					<AppRouterCacheProvider>
						<LayoutContent>{children}</LayoutContent>
					</AppRouterCacheProvider>
				</StoreProvider>
			</body>
		</html>
	);
};

export const dynamic = "force-dynamic";

export default RootLayout;
