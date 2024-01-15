import {
	CheckOutlined,
	DnsOutlined,
	FileUploadOutlined,
	HomeRepairServiceOutlined,
	MiscellaneousServicesOutlined,
	NoteAddOutlined,
	SearchOutlined,
	SettingsOutlined,
	StarOutline,
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
		link: routeMap.postList,
		name: "Quản lý tin tuyển dụng",
		icon: <DnsOutlined />,
	},
	{
		link: routeMap.savedUser,
		name: "Hồ sơ đã lưu",
		icon: <StarOutline />,
	},
	{
		link: routeMap.appliedUser,
		name: "Hồ sơ đã ứng tuyển",
		icon: <NoteAddOutlined />,
	},
	{
		link: routeMap.viewedUser,
		name: "Hồ sơ đã xem",
		icon: <CheckOutlined />,
	},
	{
		link: routeMap.packageManage,
		name: "Quản lý dịch vụ",
		icon: <MiscellaneousServicesOutlined />,
	},
	{
		link: routeMap.companyInfo,
		name: "Thông tin công ty",
		icon: <HomeRepairServiceOutlined />,
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
