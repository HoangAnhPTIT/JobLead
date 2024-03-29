import { Popconfirm } from "antd";

const PopconfirmDelete = ({
	onDelete,
	title = "Xóa bản ghi",
	description = "Bạn muốn xóa bản ghi này?",
	children,
}) => {
	return (
		<Popconfirm
			title={title}
			description={description}
			onConfirm={onDelete}
			okText="Xóa"
			cancelText="Không"
			okType="danger"
		>
			{children}
		</Popconfirm>
	);
};

export default PopconfirmDelete;
