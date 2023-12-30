"use client";
import { Checkbox, FormControlLabel, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import DatePickerForm from "src/commons/FormInput/DatePickerForm";
import CvModalLayout from "./CvModalLayout";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { updateLoading } from "lib/features/loadingSlice";
import { httpAuthPost, httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateInfo } from "src/apis/apiEndpoint";
import { toast } from "react-toastify";
import SelectForm from "src/commons/FormInput/SelectForm";

const ModalGeneralinfo = ({ data, open, handleClose }) => {
	const { register, handleSubmit, control, reset } = useForm();
	const dispatch = useAppDispatch();
	const { entities } = useAppSelector((state) => state.entity);

	const onSubmit = async (values) => {
		dispatch(updateLoading(true));
		try {
			await httpAuthPut({
				endpoint: apiCandidateInfo,
				data: {
					...values,
					workTitle: data?.workTitle,
					fullName: data?.fullName,
				},
			});
			handleClose();
		} catch (error) {
			toast.error(error?.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		reset &&
			!isEmpty(data) &&
			reset({
				phone: data?.phone,
				email: data?.email,
				genderId: data?.genderId,
				location: data?.location,
			});
	}, [data, reset]);

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
						<SelectForm
							fullWidth
							size="small"
							label="Giới tính"
							placeholder={"Giới tính"}
							name={"genderId"}
							control={control}
							list={entities?.Gender}
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
