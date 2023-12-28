"use client";
import { Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CvModalLayout from "./CvModalLayout";

const ModalReference = ({ open, handleClose }) => {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log("data", data);
	};

	return (
		<CvModalLayout
			title={"Người tham chiếu"}
			open={open}
			handleClose={handleClose}
			handleSubmit={handleSubmit((data) => onSubmit(data))}
		>
			<form>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							size="small"
							multiline
							minRows={4}
							label="Người tham chiếu"
							placeholder={`Tên người tham chiếu: Nguyễn Thuỳ Giang
Chức vụ: Giám Đốc 
Email: nguyenthuygiang@eyeplusonline.com
Số điện thoại: 0956 786 999`}
							{...register("description")}
						/>
					</Grid>
				</Grid>
			</form>
		</CvModalLayout>
	);
};

export default ModalReference;
