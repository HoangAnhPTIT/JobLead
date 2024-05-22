import { HomeOutlined, TeamOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import routeMap from "src/constants/routeMap";

const items = [
	{
		key: routeMap.dashboard,
		icon: <HomeOutlined className="!text-base" />,
		label: "Dashboard",
	},
	{
		key: routeMap.list,
		icon: <TeamOutlined className="!text-base" />,
		label: "Lead Generation",
	},
];

const SideMenu = () => {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<Menu
			mode="inline"
			defaultSelectedKeys={[pathname]}
			items={items}
			onClick={(e) => router.push(e?.key)}
			className="!text-menuColor !text-base"
		/>
	);
};

export default SideMenu;
