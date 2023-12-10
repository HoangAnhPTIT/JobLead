"use client";
import { Col, Layout, Menu, Row, theme } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FooterLayout from "./Footer";
const { Header, Content, Footer } = Layout;

const LayoutContent = ({ children }) => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const router = useRouter();

	return (
		<Layout className="layout">
			<Header
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<div className="cursor-pointer" onClick={() => router.push("/")}>
						<Image src="/logo.png" alt="logo" width={112} height={41} />
					</div>
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
				</div>
				<div>
					<Row className="text-white font-bold text-center">
						<Col
							span={12}
							className="w-20 cursor-pointer hover:bg-primary"
							onClick={() => router.push("/signin")}
						>
							Đăng ký
						</Col>
						<Col
							span={12}
							className="w-20 cursor-pointer hover:bg-primary"
							onClick={() => router.push("/login")}
						>
							Đăng nhập
						</Col>
					</Row>
				</div>
			</Header>
			<Content
				style={{
					padding: "0 50px",
				}}
			>
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
	);
};
export default LayoutContent;
