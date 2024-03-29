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
import { Box } from "@mui/material";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import routeMap from "src/constants/routeMap";

const items = [
	{
		key: routeMap.dashboard,
		label: "Tổng quan",
		icon: <SettingsOutlined style={{ fontSize: "18px" }} />,
	},
	{
		key: routeMap.searchCandidate,
		label: "Tìm ứng viên",
		icon: <SearchOutlined style={{ fontSize: "18px" }} />,
	},
	{
		key: routeMap.createJob,
		label: "Đăng tin tuyển dụng",
		icon: <FileUploadOutlined style={{ fontSize: "18px" }} />,
	},
	{
		key: routeMap.postList,
		label: "Quản lý tin tuyển dụng",
		icon: <DnsOutlined style={{ fontSize: "18px" }} />,
	},
	{
		key: routeMap.savedUser,
		label: "Hồ sơ đã lưu",
		icon: <StarOutline style={{ fontSize: "18px" }} />,
	},
	{
		key: routeMap.appliedUser,
		label: "Hồ sơ đã ứng tuyển",
		icon: <NoteAddOutlined style={{ fontSize: "18px" }} />,
	},
	{
		key: routeMap.viewedUser,
		label: "Hồ sơ đã xem",
		icon: <CheckOutlined style={{ fontSize: "18px" }} />,
	},
	{
		key: routeMap.packageManage,
		label: "Quản lý dịch vụ",
		icon: <MiscellaneousServicesOutlined style={{ fontSize: "18px" }} />,
	},
	{
		key: routeMap.companyInfo,
		label: "Thông tin công ty",
		icon: <HomeRepairServiceOutlined style={{ fontSize: "18px" }} />,
		selected: true,
	},
];

const EmployerMenu = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [selectedKeys, setSelectedKeys] = useState([]);

	const handleClick = (link) => {
		router.push(`${routeMap.employer}${link}`);
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

export default EmployerMenu;
