import {
	DescriptionOutlined,
	HowToRegOutlined,
	SettingsOutlined,
	SettingsSuggestOutlined,
	SnippetFolderOutlined,
	TaskOutlined,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import routeMap from "src/constants/routeMap";

const items = [
	{
		key: routeMap.dashboard,
		name: "Tổng quan",
		icon: <SettingsOutlined style={{ fontSize: "18px" }} />,
	},
	{
		key: routeMap.cv,
		name: "CV",
		icon: <DescriptionOutlined style={{ fontSize: "18px" }} />,
	},
	{
		key: routeMap.appliedJob,
		name: "Việc làm đã ứng tuyển",
		icon: <TaskOutlined style={{ fontSize: "18px" }} />,
	},
	{
		key: routeMap.savedJob,
		name: "Việc làm đã lưu",
		icon: <SnippetFolderOutlined style={{ fontSize: "18px" }} />,
	},
	{
		key: routeMap.viewedByEmployer,
		name: "NTD đã xem hồ sơ",
		icon: <HowToRegOutlined style={{ fontSize: "18px" }} />,
	},
	{
		key: routeMap.setupJobSuggestions,
		name: "Cài đặt gợi ý việc làm",
		icon: <SettingsSuggestOutlined style={{ fontSize: "18px" }} />,
	},
];

const FileMenu = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [selectedKeys, setSelectedKeys] = useState([]);

	const handleClick = (link) => {
		router.push(`${routeMap.file}${link}`);
	};

	useEffect(() => {
		const countCharOfCut = routeMap.employer.length;
		const endpath = pathname.slice(countCharOfCut);
		setSelectedKeys([endpath]);
	}, [pathname]);

	return (
		<div>
			<Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
				<Menu
					items={items}
					style={{ fontSize: "15px" }}
					selectedKeys={selectedKeys}
					onClick={(e) => handleClick(e.key)}
				/>
			</Box>
		</div>
	);
};

export default FileMenu;
