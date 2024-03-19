import { Modal } from "antd";
import React from "react";

const ModalGeneralInfo = ({ modalType, setModalType }) => {
	const onClose = () => {
		setModalType(null);
	};
	return (
		<Modal
			open={modalType}
			onCancel={onClose}
			styles={{ header: { border: "1px solid" } }}
		></Modal>
	);
};

export default ModalGeneralInfo;
