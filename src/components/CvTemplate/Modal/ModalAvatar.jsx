import { UploadOutlined } from "@mui/icons-material";
import { Image, Modal, Upload } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { httpAuthPost } from "src/apis/apiAuthCaller";
import { apiCandidateUploadAvatar } from "src/apis/apiEndpoint";
import { CV_MODAL_TYPES } from "src/constants/cv";

const ModalAvatar = ({ modalType, handleClose }) => {
	const dispatch = useAppDispatch();
	const [file, setFile] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const { isLoading } = useAppSelector((state) => state.loading);
	const isThisModal = modalType === CV_MODAL_TYPES.avatar;

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
		<Modal
			open={isThisModal}
			onCancel={() => closeModal(false)}
			title="Ảnh đại diện"
			width={750}
			onOk={onSubmit}
			okText="Lưu thông tin"
			confirmLoading={isLoading}
		>
			<div className="flex justify-center items-center min-h-[200px]">
				<Upload {...props}>
					<button style={{ border: 0, background: "none" }} type="button">
						{imageUrl ? (
							<Image src={imageUrl} alt="" preview={false} />
						) : (
							<div className="p-10 border border-dashed border-33 rounded">
								<UploadOutlined fontSize="large" />
								<p className="text-lg">Tải lên ảnh</p>
							</div>
						)}
					</button>
				</Upload>
			</div>
		</Modal>
	);
};

export default ModalAvatar;
