import { EditOutlined } from "@ant-design/icons";
import React from "react";

const CvItemLayout = ({ itemType, setModalType, children }) => {
	const onEdit = () => {
		setModalType(itemType);
	};

	return (
		<div className="relative group">
			<EditOutlined
				className="absolute top-1 right-1 hidden group-hover:block"
				onClick={onEdit}
			/>
			{children}
		</div>
	);
};

export default CvItemLayout;
