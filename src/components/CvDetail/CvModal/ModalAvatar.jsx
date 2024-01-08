import { UploadOutlined } from "@mui/icons-material";
import { Form, Upload } from "antd";
import { apiCandidateUploadAvatar } from "src/apis/apiEndpoint";
import CvModalLayout from "./CvModalLayout";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAppDispatch } from "lib/hooks";
import { updateLoading } from "lib/features/loadingSlice";
import { httpPost } from "src/apis/apiCaller";

const ModalAvatar = ({ data, open, handleClose }) => {
	const dispatch = useAppDispatch();
	const [file, setFile] = useState(null);

	const onSubmit = async () => {
		dispatch(updateLoading(true));
		try {
			await httpPost({ endpoint: apiCandidateUploadAvatar, data: file });
		} catch (error) {
			toast(error.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	const props = {
		beforeUpload: () => {
			return false;
		},
		onChange: (info) => {
			// console.log(info.fileList[0]);
			setFile(URL.createObjectURL(info.fileList[0]));
		},
	};

	function handleChange(e) {
		console.log(e.target.files);
		setFile(URL.createObjectURL(e.target.files[0]));
	}

	return (
		<CvModalLayout
			open={open}
			handleClose={handleClose}
			handleSubmit={onSubmit}
		>
			<Upload accept="image/png, image/jpeg" maxCount={1} {...props}>
				<button style={{ border: 0, background: "none" }} type="button">
					<UploadOutlined fontSize="large" />
				</button>
			</Upload>
			<input type="file" onChange={handleChange} />
		</CvModalLayout>
	);
};

export default ModalAvatar;
