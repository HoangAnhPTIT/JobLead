import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const CvEditDeleteLayout = ({ onEdit, onDelete, children }) => {
	return (
		<div className="relative group/child h-fit">
			<div className="absolute top-1 right-1 hidden text-lg text-green-500 group-hover/child:block z-10">
				<EditOutlined onClick={onEdit} className="cursor-pointer" />
				<DeleteOutlined
					onClick={onDelete}
					className="!text-secondary ml-1 cursor-pointer"
				/>
			</div>
			{children}
		</div>
	);
};

export default CvEditDeleteLayout;
