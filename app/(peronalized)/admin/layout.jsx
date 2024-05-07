"use client";
import { SupervisorAccount } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Menu } from "antd";
import { useAppSelector } from "lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { USER_ROLE } from "src/constants/common";
import routeMap from "src/constants/routeMap";

const items = [
	{
		key: routeMap.customer,
		label: "Khách hàng",
		icon: <SupervisorAccount style={{ fontSize: "18px" }} />,
	},
];

const AdminLayout = ({ children }) => {
	const router = useRouter();
	const pathname = usePathname();
	const [selectedKeys, setSelectedKeys] = useState([]);
	const { userInfo } = useAppSelector((state) => state.user);

	const handleClick = (link) => {
		router.push(`${routeMap.admin}${link}`);
	};

	useEffect(() => {
		if (userInfo?.role !== USER_ROLE.admin) {
			router.push("/");
		}
	}, [router, userInfo?.role]);

	useEffect(() => {
		const countCharOfCut = routeMap.admin.length;
		const endpath = pathname.slice(countCharOfCut);
		setSelectedKeys([endpath]);
	}, [pathname]);

	return (
		<div className="py-5 bg-bgEmployer min-h-[calc(100vh-64px)]">
			<div className="w-xlContent !mx-auto">
				<div className="grid gap-5" style={{ gridTemplateColumns: "20% 80%" }}>
					<Box
						sx={{
							width: "100%",
							maxWidth: 360,
							bgcolor: "background.paper",
							height: "min-content",
						}}
					>
						<Menu
							items={items}
							style={{ fontSize: "15px" }}
							selectedKeys={selectedKeys}
							onClick={(e) => handleClick(e.key)}
						/>
					</Box>
					{children}
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
