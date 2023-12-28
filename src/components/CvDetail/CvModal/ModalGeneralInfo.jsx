"use client";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "src/commons/FormInput/DatePickerForm";
import CvModalLayout from "./CvModalLayout";
import { useState } from "react";

const ModalGeneralinfo = ({ open, handleClose }) => {
	const { register, handleSubmit, control } = useForm();

	const onSubmit = (data) => {
		console.log("data", data);
	};

	return (
		<CvModalLayout
			title={"Thông tin cá nhân"}
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
							label="Số điện thoại"
							{...register("phone")}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							size="small"
							label="Email"
							{...register("email")}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							size="small"
							label="Giới tính"
							{...register("genderId")}
						/>
					</Grid>
					<Grid item xs={6}>
						<DatePickerForm label="Ngày sinh" name="dob" control={control} />
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							size="small"
							label="Địa chỉ"
							{...register("location")}
						/>
					</Grid>
				</Grid>
			</form>
		</CvModalLayout>
	);
};

export default ModalGeneralinfo;
