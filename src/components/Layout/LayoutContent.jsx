"use client";
import theme from "@/theme/themeConfig";
import {
	Col,
	ConfigProvider,
	Flex,
	Layout,
	Row,
	theme as themeAntd,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FooterLayout from "./Footer";
import Link from "next/link";

const { Header, Content } = Layout;

const menuItems = [
	{ label: "Việc làm", link: "/viec-lam" },
	{ label: "Công ty", link: "/cong-ty" },
	{ label: "Ứng viên", link: "/ung-vien" },
];

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
						<Col span={12}>
							<Row
								align="middle"
								justify="start"
								gutter={16}
								className="w-full"
							>
								<Col
									className="cursor-pointer"
									onClick={() => router.push("/")}
								>
									<Image src="/logo.png" alt="logo" width={112} height={41} />
								</Col>
								<Col>
									<Flex gap={10}>
										{menuItems?.map((item, i) => (
											<Link href={item?.link} key={i}>
												<div
													key={i}
													className="hover:bg-primary hover:text-white px-2 uppercase font-semibold text-primary cursor-pointer"
												>
													{item?.label}
												</div>
											</Link>
										))}
									</Flex>
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
