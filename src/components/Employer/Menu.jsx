import { SettingOutlined, UploadOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";

const items = [
	{
		key: 1,
		label: "Quản lý chung",
		icon: <SettingOutlined />,
	},
	{
		key: 2,
		label: "Đăng tin tuyển dụng",
		icon: <UploadOutlined />,
	},
];

const EmployerMenu = () => {
	return (
		<div>
			<Menu items={items} />
		</div>
	);
};

export default EmployerMenu;
