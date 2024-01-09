import { InfoOutlined } from "@mui/icons-material";
import { Modal } from "antd";
import React from "react";

const ModalRoleView = ({ open, onOk, onCancel }) => {
	return (
		<Modal open={open} onOk={onOk} onCancel={onCancel} cancelText="Bỏ qua">
			<div className="text-center">
				<InfoOutlined
					fontSize="large"
					color="warning"
					style={{ fontSize: 80 }}
				/>
				<div className="text-xl">
					Bạn cần đăng nhập tài khoản Nhà tuyển dụng để xem hồ sơ này
				</div>
			</div>
		</Modal>
	);
};

export default ModalRoleView;
