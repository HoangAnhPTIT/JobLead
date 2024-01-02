import { TextField } from "@mui/material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { httpAuthPost } from "src/apis/apiAuthCaller";
import { apiCv } from "src/apis/apiEndpoint";
import CvModalLayout from "./CvModalLayout";

const ModalSave = ({ open, handleClose }) => {
	const { register, handleSubmit } = useForm();
	const dispatch = useAppDispatch();

	const onSubmit = async (values) => {
		dispatch(updateLoading(true));
		try {
			await httpAuthPost({ endpoint: apiCv, data: values });
			handleClose();
		} catch (error) {
			toast.error(error.message || error);
			console.error(error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	return (
		<CvModalLayout
			title={"Lưu CV"}
			open={open}
			handleClose={handleClose}
			handleSubmit={handleSubmit((data) => onSubmit(data))}
		>
			<form>
				<TextField
					fullWidth
					size="small"
					label="Tên CV"
					required
					{...register("name", { required: true })}
					className="!mb-5"
				/>
				<TextField
					fullWidth
					size="small"
					multiline
					minRows={2}
					label="Mô tả"
					{...register("description")}
				/>
			</form>
		</CvModalLayout>
	);
};

export default ModalSave;
