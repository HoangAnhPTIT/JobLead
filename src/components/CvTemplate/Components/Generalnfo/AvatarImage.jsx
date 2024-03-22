"use client";
import { PhotoCamera } from "@mui/icons-material";
import { Image } from "antd";
import classNames from "classnames";
import { useParams } from "next/navigation";
import { CV_ACTIONS, CV_MODAL_TYPES } from "src/constants/cv";

const AvatarImage = ({
	setModalType,
	avatar,
	size = 150,
	css = "",
	defaultColor = "#111",
}) => {
	const { action } = useParams();
	const isEdit = action === CV_ACTIONS.edit;
	return (
		<div
			onClick={() => isEdit && setModalType(CV_MODAL_TYPES.avatar)}
			className={classNames(isEdit && "cursor-pointer")}
		>
			{avatar ? (
				<Image
					src={avatar}
					alt=""
					width={size}
					height={size}
					preview={false}
					className={css}
				/>
			) : (
				<PhotoCamera
					style={{ width: size, height: size, color: defaultColor }}
				/>
			)}
		</div>
	);
};

export default AvatarImage;
