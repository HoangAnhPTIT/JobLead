import {
	DescriptionOutlined,
	HowToRegOutlined,
	SettingsOutlined,
	SettingsSuggestOutlined,
	SnippetFolderOutlined,
	TaskOutlined,
} from "@mui/icons-material";
import {
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import routeMap from "src/constants/routeMap";

const items = [
	{
		link: routeMap.dashboard,
		name: "Tổng quan",
		icon: <SettingsOutlined />,
	},
	{
		link: routeMap.cv,
		name: "CV",
		icon: <DescriptionOutlined />,
	},
	{
		link: routeMap.appliedJob,
		name: "Việc làm đã ứng tuyển",
		icon: <TaskOutlined />,
	},
	{
		link: routeMap.savedJob,
		name: "Việc làm đã lưu",
		icon: <SnippetFolderOutlined />,
	},
	{
		link: routeMap.viewedByEmployer,
		name: "NTD đã xem hồ sơ",
		icon: <HowToRegOutlined />,
	},
	{
		link: routeMap.setupJobSuggestions,
		name: "Cài đặt gợi ý việc làm",
		icon: <SettingsSuggestOutlined />,
	},
];

const FileMenu = () => {
	const router = useRouter();
	const pathname = usePathname();

	const handleClick = (link) => {
		router.push(`${routeMap.file}${link}`);
	};

	return (
		<div>
			<Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
				<List component="nav" aria-label="main mailbox folders">
					{items?.map((item, i) => (
						<ListItemButton
							selected={pathname.includes(item?.link)}
							onClick={() => handleClick(item?.link || "/")}
							key={i}
							className="h-10 gap-3"
						>
							<ListItemIcon className="w-6 !min-w-0">{item?.icon}</ListItemIcon>
							<ListItemText primary={item?.name} />
						</ListItemButton>
					))}
				</List>
			</Box>
		</div>
	);
};

export default FileMenu;
