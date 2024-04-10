import { CheckOutlined } from "@mui/icons-material";

const InfoText = ({ text }) => {
	return (
		<div className="flex text-[15px]">
			<CheckOutlined className="text-yellow3 mr-2" />
			<div>{text}</div>
		</div>
	);
};

export default InfoText;
