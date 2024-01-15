"use client";
import { Grid, TextField } from "@mui/material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { isEmpty } from "lodash";
import moment from "moment";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateInfo } from "src/apis/apiEndpoint";
import DatePickerForm from "src/commons/FormInput/DatePickerForm";
import SelectForm from "src/commons/FormInput/SelectForm";
import CvModalLayout from "./CvModalLayout";

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
				dob: moment(data?.dob),
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
