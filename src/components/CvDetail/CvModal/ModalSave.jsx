import { TextField } from "@mui/material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { httpAuthGet, httpAuthPost, httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateCv, apiCv } from "src/apis/apiEndpoint";
import CvModalLayout from "./CvModalLayout";

const ModalSave = ({ open, handleClose }) => {
	const { register, handleSubmit, setValue } = useForm();
	const dispatch = useAppDispatch();
	const { template = null } = useParams();
	const [currentCv, setCurrentCv] = useState(null);

	const onSubmit = async (values) => {
		dispatch(updateLoading(true));
		try {
			currentCv
				? await httpAuthPut({
						endpoint: apiCv,
						data: { id: currentCv?.id, ...values, templateCode: template },
				  })
				: await httpAuthPost({
						endpoint: apiCv,
						data: { ...values, templateCode: template },
				  });
			handleClose();
		} catch (error) {
			toast.error(error.message || error);
			console.error(error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		const getCvList = async () => {
			const response = await httpAuthGet({ endpoint: apiCandidateCv });
			const currentCvInfo =
				response?.data?.find((item) => item?.templateCode === template) || {};
			setCurrentCv(currentCvInfo);
			setValue("name", currentCvInfo?.name ?? "");
			setValue("description", currentCvInfo?.description ?? "");
		};
		getCvList();
	}, []);

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
