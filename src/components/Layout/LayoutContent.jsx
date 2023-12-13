"use client";
import theme from "theme/themeConfig";
import {
	Col,
	ConfigProvider,
	Flex,
	Layout,
	Row,
	theme as themeAntd,
} from "antd";
import locale from "antd/es/locale/vi_VN";
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
		<ConfigProvider theme={theme} locale={locale}>
			<Layout className="layout">
				<Header>
					<Flex justify="space-between" align="middle">
						<Row align="middle" justify="start" gutter={16} className="w-full">
							<Col className="cursor-pointer" onClick={() => router.push("/")}>
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
						<Flex
							className="text-white font-semibold text-center"
							align="middle"
							justify="center"
						>
							<Link href="/signin">
								<div className="hover:bg-primary hover:text-white w-[80px] font-semibold text-primary cursor-pointer">
									<span className="text-sm">Đăng ký</span>
								</div>
							</Link>
							<Link href="/login">
								<div className="hover:bg-primary hover:text-white w-[80px] font-semibold text-primary cursor-pointer">
									<span className="text-sm">Đăng nhập</span>
								</div>
							</Link>
						</Flex>
					</Flex>
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
