"use client";
import { DriveFileRenameOutlineOutlined } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { concat, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateItSkill } from "src/apis/apiEndpoint";
import SelectForm from "src/commons/FormInput/SelectForm";
import { IT_SKILLS } from "src/constants/cv";
import CvModalLayout from "./CvModalLayout";

const ModalItSkill = ({ data, open, handleClose }) => {
	const { entities } = useAppSelector((state) => state.entity);
	const dispatch = useAppDispatch();
	const { handleSubmit, reset, control } = useForm();
	const [skillList, setSkillList] = useState(IT_SKILLS);
	const [isAdding, setIsAdding] = useState(false);
	const [newSkill, setNewSkill] = useState("");

	const onAddNewSkill = () => {
		if (!isEmpty(newSkill)) {
			setSkillList((prev) => concat(prev, newSkill));
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
				endpoint: apiCandidateItSkill,
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
		const defaultData = data?.itSkills?.reduce(
			(initForm, item) => ({
				...initForm,
				[item?.name]: item?.star,
			}),
			{}
		);
		reset({ ...defaultData });

		const skillOutside = data?.itSkills
			?.filter((item) => !skillList.includes(item?.name))
			?.map((item) => item?.name);
		!isEmpty(skillOutside) &&
			setSkillList((prev) => concat(prev, skillOutside));
	}, [data, reset]);

	return (
		<CvModalLayout
			title={"Kỹ năng"}
			open={open}
			handleClose={handleClose}
			handleSubmit={handleSubmit((data) => onSubmit(data))}
		>
			<form>
				{skillList?.map((item, i) => (
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
								list={entities?.SkillLevel}
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
							<Button variant="contained" onClick={onAddNewSkill}>
								Thêm kỹ năng
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

export default ModalItSkill;
