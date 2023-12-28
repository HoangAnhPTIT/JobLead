"use client";
import { Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "src/commons/FormInput/DatePickerForm";
import CvModalLayout from "./CvModalLayout";

const ModalEducation = ({ open, handleClose }) => {
	const { register, handleSubmit, control } = useForm();

	const onSubmit = (data) => {
		console.log("data", data);
	};

	return (
		<CvModalLayout
			title={"Học vấn và bằng cấp"}
			open={open}
			handleClose={handleClose}
			handleSubmit={handleSubmit((data) => onSubmit(data))}
		>
			<form>
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<TextField
							fullWidth
							size="small"
							label="Trường, cơ sở, trung tâm đào tạo"
							required
							{...register("school", { required: true })}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							size="small"
							label="Bằng cấp, chứng chỉ"
							{...register("class")}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							size="small"
							label="Bằng cấp, chứng chỉ"
							placeholder="VD: Cử nhân luật, Kỹ sư CNTT, Chứng chỉ nghề điện dân dụng..."
							{...register("certification", { required: true })}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							size="small"
							label="Chuyên ngành đào tạo"
							placeholder="VD: Công nghệ thông tin, Kế toán..."
							{...register("major")}
						/>
					</Grid>
					<Grid item xs={6}></Grid>
					<Grid item xs={6}>
						<DatePickerForm
							label="Thời gian bắt đầu"
							name="startDate"
							required
							control={control}
							format="MM/YYYY"
							views={["month", "year"]}
						/>
					</Grid>
					<Grid item xs={6}>
						<DatePickerForm
							label="Thời gian kết thúc"
							name="finishDate"
							required
							control={control}
							format="MM/YYYY"
							views={["month", "year"]}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							size="small"
							multiline
							minRows={2}
							label="Mô tả thêm"
							{...register("description")}
						/>
					</Grid>
				</Grid>
			</form>
		</CvModalLayout>
	);
};

export default ModalEducation;
