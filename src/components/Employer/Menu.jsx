import { SettingOutlined, UploadOutlined } from "@ant-design/icons";
import { FileUploadOutlined, Upload } from "@mui/icons-material";
import {
	Box,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const items = [
	{
		link: "/general",
		name: "Quản lý chung",
		icon: <SettingOutlined />,
	},
	{
		link: "/create-job",
		name: "Đăng tin tuyển dụng",
		icon: <FileUploadOutlined />,
	},
];

const EmployerMenu = () => {
	const router = useRouter();
	const pathname = usePathname();

	const handleClick = (link) => {
		router.push(`/employer${link}`);
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
							<ListItemIcon className="w-6 !min-w-0 justify-center">
								{item?.icon}
							</ListItemIcon>
							<ListItemText primary={item?.name} />
						</ListItemButton>
					))}
				</List>
			</Box>
		</div>
	);
};

export default EmployerMenu;
