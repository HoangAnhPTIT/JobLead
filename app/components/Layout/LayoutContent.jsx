"use client";
import {
	Col,
	ConfigProvider,
	Layout,
	Menu,
	Row,
	theme as themeAntd,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import theme from "@/theme/themeConfig";
import FooterLayout from "./Footer";

const { Header, Content } = Layout;

const LayoutContent = ({ children }) => {
	const {
		token: { colorBgContainer },
	} = themeAntd.useToken();

	const router = useRouter();

	return (
		<ConfigProvider theme={theme}>
			<Layout className="layout">
				<Header>
					<Row justify="space-between" align="middle">
						<Col>
							<Row align="middle" gutter={16}>
								<Col
									className="cursor-pointer"
									onClick={() => router.push("/")}
								>
									<Image src="/logo.png" alt="logo" width={112} height={41} />
								</Col>
								<Col>
									<Menu
										theme="dark"
										mode="horizontal"
										defaultSelectedKeys={["2"]}
										items={new Array(5).fill(null).map((_, index) => {
											const key = index + 1;
											return {
												key,
												label: `nav ${key}`,
											};
										})}
									/>
								</Col>
							</Row>
						</Col>
						<Col span={4}>
							<Row
								className="text-white font-bold text-center"
								align="middle"
								justify="center"
							>
								<Col
									span={12}
									className="text-sm cursor-pointer hover:bg-primary"
									onClick={() => router.push("/signin")}
								>
									Đăng ký
								</Col>
								<Col
									span={12}
									className="text-sm cursor-pointer hover:bg-primary"
									onClick={() => router.push("/login")}
								>
									Đăng nhập
								</Col>
							</Row>
						</Col>
					</Row>
				</Header>
				<Content>
					<div
						className="site-layout-content"
						style={{
							background: colorBgContainer,
						}}
					>
						{children}
					</div>
				</Content>
				<FooterLayout />
			</Layout>
		</ConfigProvider>
	);
};
export default LayoutContent;
