import { Modal } from "antd";
import React from "react";

const ModalLayout = ({ modalType, setModalType, children }) => {
	const onClose = () => {
		setModalType(null);
	};

	return (
		<Modal open={modalType} styles={{ header: { border: "1px solid" } }}>
			{children}
		</Modal>
	);
};

export default ModalLayout;
