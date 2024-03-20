import { PlusOutlined } from "@ant-design/icons";

const CvAddLayout = ({ itemType, setModalType, children }) => {
	const onEdit = () => {
		setModalType(itemType);
	};

	return (
		<div className="relative group h-fit">
			<div className="absolute top-1 right-1 hidden text-lg text-green-500 group-hover:block">
				<PlusOutlined onClick={onEdit} />
			</div>
			{children}
		</div>
	);
};

export default CvAddLayout;
