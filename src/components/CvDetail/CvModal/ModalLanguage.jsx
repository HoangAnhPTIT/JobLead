"use client";
import { Button, Grid, TextField } from "@mui/material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateLanguageSkill } from "src/apis/apiEndpoint";
import SelectForm from "src/commons/FormInput/SelectForm";
import { LANGUAGES } from "src/constants/cv";
import CvModalLayout from "./CvModalLayout";
import { concat, isEmpty } from "lodash";
import { DriveFileRenameOutlineOutlined } from "@mui/icons-material";

const ModalLanguage = ({ data, open, handleClose }) => {
	const { entities } = useAppSelector((state) => state.entity);
	const dispatch = useAppDispatch();
	const { handleSubmit, reset, control } = useForm();
	const [languageList, setLanguageList] = useState(LANGUAGES);
	const [isAdding, setIsAdding] = useState(false);
	const [newSkill, setNewSkill] = useState("");

	const onAddNewLanguage = () => {
		if (!isEmpty(newSkill)) {
			setLanguageList((prev) => concat(prev, newSkill));
			setIsAdding(false);
		}
	};
	const onSubmit = async (values) => {
		dispatch(updateLoading(true));
		try {
			const payload = Object.entries(values)?.map((item) => ({
				name: item[0],
				star: item[1],
			}));
			const payloadValidated = payload.filter((item) => Boolean(item.star));
			await httpAuthPut({
				endpoint: apiCandidateLanguageSkill,
				data: payloadValidated,
			});
			handleClose();
		} catch (error) {
			toast.error(error?.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		const defaultData = data?.languageSkills?.reduce(
			(initForm, item) => ({
				...initForm,
				[item?.name]: item?.star,
			}),
			{}
		);
		reset({ ...defaultData });

		const skillOutside = data?.languageSkills
			?.filter((item) => !languageList.includes(item?.name))
			?.map((item) => item?.name);
		!isEmpty(skillOutside) &&
			setLanguageList((prev) => concat(prev, skillOutside));
	}, [data, reset]);

	return (
		<CvModalLayout
			title={"Ngoại ngữ"}
			open={open}
			handleClose={handleClose}
			handleSubmit={handleSubmit((data) => onSubmit(data))}
		>
			<form>
				{languageList.map((item, i) => (
					<Grid
						container
						spacing={2}
						alignItems="center"
						className="my-2"
						key={i}
					>
						<Grid item xs={6}>
							{item}
						</Grid>
						<Grid item xs={6}>
							<SelectForm
								name={item}
								placeholder={"Chọn level"}
								list={entities?.LanguageLevel}
								allowClear
								valueKey="order"
								control={control}
							/>
						</Grid>
					</Grid>
				))}
				{isAdding && (
					<Grid container alignItems="center" spacing={2}>
						<Grid item xs={6}>
							<TextField
								size="small"
								placeholder="Tên kỹ năng"
								onChange={(e) => setNewSkill(e.target.value)}
							/>
						</Grid>
						<Grid item xs={6} className="flex justify-between">
							<Button variant="contained" onClick={onAddNewLanguage}>
								Thêm ngoại ngữ
							</Button>
							<Button
								variant="outlined"
								color="warning"
								onClick={() => setIsAdding(false)}
							>
								Hủy
							</Button>
						</Grid>
					</Grid>
				)}
				{!isAdding && (
					<div
						className="mt-5 text-sm text-primary cursor-pointer"
						onClick={() => setIsAdding(true)}
					>
						<DriveFileRenameOutlineOutlined fontSize="small" /> Thêm kĩ năng
					</div>
				)}
			</form>
		</CvModalLayout>
	);
};

export default ModalLanguage;
