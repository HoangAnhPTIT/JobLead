"use client";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import { CV_ACTIONS } from "src/constants/cv";

const CvAddLayout = ({ itemType, setModalType, children }) => {
	const { action } = useParams();
	const isEdit = action === CV_ACTIONS.edit;

	const onEdit = () => {
		setModalType(itemType);
	};

	return (
		<div className="relative group h-fit">
			{isEdit && (
				<div className="absolute top-1 right-1 hidden text-lg text-green-500 group-hover:block">
					<PlusOutlined onClick={onEdit} />
				</div>
			)}
			{children}
		</div>
	);
};

export default CvAddLayout;
