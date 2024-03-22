import { PhotoCamera } from "@mui/icons-material";
import { Image } from "antd";

const AvatarImage = ({ avatar, size = 150, css = "" }) => {
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
		<PhotoCamera style={{ width: size, height: size }} />
	);
};

export default AvatarImage;
