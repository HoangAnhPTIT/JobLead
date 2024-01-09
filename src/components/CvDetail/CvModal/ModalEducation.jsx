"use client";
import { Grid, TextField } from "@mui/material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { httpAuthPost, httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateEducation } from "src/apis/apiEndpoint";
import DatePickerForm from "src/commons/FormInput/DatePickerForm";
import SelectForm from "src/commons/FormInput/SelectForm";
import CvModalLayout from "./CvModalLayout";

const ModalEducation = ({ index, data, open, handleClose }) => {
	const { register, handleSubmit, reset, control } = useForm();
	const { entities } = useAppSelector((state) => state.entity);
	const dispatch = useAppDispatch();
	const dataInfo = index !== null ? data?.[index] : null;

	const onSubmit = async (values) => {
		dispatch(updateLoading(true));
		try {
			if (index !== null) {
				const payload = { id: dataInfo.id, ...values };
				await httpAuthPut({
					endpoint: apiCandidateEducation,
					data: payload,
				});
			} else {
				await httpAuthPost({
					endpoint: apiCandidateEducation,
					data: values,
				});
			}
			handleClose();
		} catch (error) {
			toast.error(error?.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		if (dataInfo === null) {
			reset({});
		} else {
			reset({
				...dataInfo,
				startDate: dayjs(dataInfo?.startDate),
				finishDate: dataInfo?.finishDate ? dayjs(dataInfo.finishDate) : null,
			});
		}
	}, [open, dataInfo, reset]);

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
							label="Khoa đào tạo"
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
					<Grid item xs={6}>
						<SelectForm
							label={"Xếp loại"}
							name="learningClassificationId"
							required
							control={control}
							placeholder={"Xếp loại"}
							list={entities?.LearningClassification}
						/>
					</Grid>
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
