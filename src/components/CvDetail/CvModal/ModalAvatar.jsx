import { UploadOutlined } from "@mui/icons-material";
import { Image, Upload } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { httpAuthPost } from "src/apis/apiAuthCaller";
import { apiCandidateUploadAvatar } from "src/apis/apiEndpoint";
import CvModalLayout from "./CvModalLayout";

const ModalAvatar = ({ open, handleClose }) => {
	const dispatch = useAppDispatch();
	const [file, setFile] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);

	const onSubmit = async () => {
		dispatch(updateLoading(true));
		try {
			const res = await httpAuthPost({
				contentType: "multipart/form-data",
				endpoint: apiCandidateUploadAvatar,
				data: { file },
			});
			if (res.status === 200) {
				toast.success("Tải ảnh thành công");
				closeModal();
			} else {
				toast(res.message);
			}
		} catch (error) {
			toast(error.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	const closeModal = () => {
		setFile(null);
		setImageUrl(null);
		handleClose();
	};

	const props = {
		maxCount: 1,
		accept: "image/png, image/jpeg",
		onRemove: () => {
			setFile(null);
			setImageUrl(null);
		},
		beforeUpload: (file) => {
			setImageUrl(URL.createObjectURL(file));
			setFile(file);
			return false;
		},
	};

	return (
		<CvModalLayout
			title="Cập nhật avatar"
			open={open}
			handleClose={closeModal}
			handleSubmit={onSubmit}
		>
			<div className="flex justify-center items-center min-h-[200px]">
				<Upload {...props}>
					<button style={{ border: 0, background: "none" }} type="button">
						{imageUrl ? (
							<Image src={imageUrl} alt="" preview={false} />
						) : (
							<UploadOutlined fontSize="large" />
						)}
					</button>
				</Upload>
			</div>
		</CvModalLayout>
	);
};

export default ModalAvatar;
