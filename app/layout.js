import { Roboto } from "next/font/google";

import StyledComponentsRegistry from "../lib/AntdRegistry";

import "@/globals.css";
import LayoutContent from "./components/layout/LayoutContent";

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
			<StyledComponentsRegistry>
				<LayoutContent>{children}</LayoutContent>
			</StyledComponentsRegistry>
		</body>
	</html>
);

export default RootLayout;
