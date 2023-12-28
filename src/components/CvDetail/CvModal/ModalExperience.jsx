"use client";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "src/commons/FormInput/DatePickerForm";
import CvModalLayout from "./CvModalLayout";
import { useState } from "react";

const ModalExperience = ({ open, handleClose }) => {
	const { register, handleSubmit, setValue, control } = useForm();
	const [isCurrentJob, setIsCurrentJob] = useState(false);

	const handleChangeIsCurrentJob = (value) => {
		setIsCurrentJob(value.target.checked);
		setValue("finishDate", null);
	};

	const onSubmit = (data) => {
		console.log("data", data);
	};

	return (
		<CvModalLayout
			title={"Kinh nghiệm làm việc"}
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
							label="Chức danh, vị trí"
							required
							{...register("title", { required: true })}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							size="small"
							label="Công ty"
							{...register("company")}
						/>
					</Grid>
					<Grid item xs={6}>
						<DatePickerForm
							label="Thời gian bắt đầu"
							name="startDate"
							control={control}
							format="MM/YYYY"
							views={["month", "year"]}
						/>
					</Grid>
					<Grid item xs={6}>
						<DatePickerForm
							label="Thời gian kết thúc"
							name="finishDate"
							control={control}
							format="MM/YYYY"
							views={["month", "year"]}
							disabled={isCurrentJob}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							control={<Checkbox />}
							label="Công việc hiện tại"
							{...register("isCurrentWork")}
							onChange={handleChangeIsCurrentJob}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							size="small"
							multiline
							minRows={2}
							label="Mô tả công việc"
							{...register("description")}
						/>
					</Grid>
				</Grid>
			</form>
		</CvModalLayout>
	);
};

export default ModalExperience;
