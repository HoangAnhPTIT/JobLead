import {
	FileUploadOutlined,
	SearchOutlined,
	SettingsOutlined,
	WorkOutline,
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
		link: routeMap.searchCandidate,
		name: "Tìm ứng viên",
		icon: <SearchOutlined />,
	},
	{
		link: routeMap.createJob,
		name: "Đăng tin tuyển dụng",
		icon: <FileUploadOutlined />,
	},
	{
		link: routeMap.companyInfo,
		name: "Thông tin công ty",
		icon: <WorkOutline />,
	},
];

const EmployerMenu = () => {
	const router = useRouter();
	const pathname = usePathname();

	const handleClick = (link) => {
		router.push(`${routeMap.employer}${link}`);
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

export default EmployerMenu;
