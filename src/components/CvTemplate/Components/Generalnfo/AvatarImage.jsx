import { PhotoCamera } from "@mui/icons-material";
import { Image } from "antd";

const AvatarImage = ({
	avatar,
	size = 150,
	css = "",
	defaultColor = "#111",
}) => {
	return avatar ? (
		<Image
			src={avatar}
			alt=""
			width={size}
			height={size}
			preview={false}
			className={css}
		/>
	) : (
		<PhotoCamera style={{ width: size, height: size, color: defaultColor }} />
	);
};

export default AvatarImage;
