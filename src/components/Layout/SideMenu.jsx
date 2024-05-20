import { AreaChartOutlined, TeamOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import routeMap from "src/constants/routeMap";

const items = [
	{
		key: routeMap.list,
		icon: <TeamOutlined />,
		label: "Danh sách khách hàng",
	},
	{
		key: routeMap.dashboard,
		icon: <AreaChartOutlined />,
		label: "Dashboard",
	},
];

const SideMenu = () => {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<Menu
			theme="dark"
			mode="inline"
			defaultSelectedKeys={[pathname]}
			items={items}
			onClick={(e) => router.push(e?.key)}
		/>
	);
};

export default SideMenu;
