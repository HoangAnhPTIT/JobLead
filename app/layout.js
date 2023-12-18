import { Roboto } from "next/font/google";

import StyledComponentsRegistry from "../lib/AntdRegistry";

import "app/globals.css";

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

const RootLayout = ({ children }) => (
	<html>
		<body className={roboto.className}>
			<StoreProvider>
				<StyledComponentsRegistry>
					<LayoutContent>{children}</LayoutContent>
				</StyledComponentsRegistry>
			</StoreProvider>
		</body>
	</html>
);

export const dynamic = "force-dynamic";

export default RootLayout;
