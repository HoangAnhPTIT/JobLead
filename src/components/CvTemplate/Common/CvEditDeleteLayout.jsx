"use client";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import { CV_ACTIONS } from "src/constants/cv";

const CvEditDeleteLayout = ({ onEdit, onDelete, children }) => {
	const { action } = useParams();
	const isEdit = action === CV_ACTIONS.edit;

	return (
		<div className="relative group/child h-fit">
			{isEdit && (
				<div className="absolute top-1 right-1 hidden text-lg text-green-500 group-hover/child:block z-10">
					<EditOutlined onClick={onEdit} className="cursor-pointer" />
					<DeleteOutlined
						onClick={onDelete}
						className="!text-secondary ml-1 cursor-pointer"
					/>
				</div>
			)}
			{children}
		</div>
	);
};

export default CvEditDeleteLayout;
