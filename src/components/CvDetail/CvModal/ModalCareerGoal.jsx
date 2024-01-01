"use client";
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import CvModalLayout from "./CvModalLayout";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect, useState } from "react";
import { concat } from "lodash";
import { getArrayObjectValue, removeArrayValue } from "src/helper/format";
import { updateLoading } from "lib/features/loadingSlice";
import { httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateCareerGoal } from "src/apis/apiEndpoint";
import { toast } from "react-toastify";

const ModalCareerGoal = ({ data, open, handleClose }) => {
	const { entities } = useAppSelector((state) => state.entity);
	const dispatch = useAppDispatch();
	const { register, handleSubmit, setValue } = useForm();

	const [goalsSelected, setGoalsSelected] = useState([]);

	const onChangeCheckbox = (id, value) => {
		if (value) {
			const newSkills = concat(goalsSelected, id);
			setGoalsSelected(newSkills);
		} else {
			const newSkills = removeArrayValue(goalsSelected, id);
			setGoalsSelected(newSkills);
		}
	};

	const onSubmit = async (values) => {
		dispatch(updateLoading(true));
		try {
			await httpAuthPut({
				endpoint: apiCandidateCareerGoal,
				data: values,
			});
			handleClose();
		} catch (error) {
			toast.error(error?.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		const defatultSkillsSelected = getArrayObjectValue(
			data?.candidateCareerGoals,
			"careerGoalId"
		);
		setGoalsSelected(defatultSkillsSelected);
	}, [data?.candidateCareerGoals]);

	useEffect(() => {
		setValue("description", data?.careerGoalDescription);
	}, [data?.careerGoalDescription, setValue]);

	useEffect(() => {
		setValue("goalIds", goalsSelected);
	}, [setValue, goalsSelected]);

	return (
		<CvModalLayout
			title={"Mục tiêu nghề nghiệp"}
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
							minRows={3}
							required
							{...register("description")}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth component="fieldset" variant="standard">
							<FormGroup>
								<Grid container>
									{entities?.CareerGoal?.map((item, i) => (
										<Grid item xs={12} key={i}>
											<FormControlLabel
												control={<Checkbox />}
												label={item?.name}
												{...register("goalIds")}
												value={item?.id}
												checked={goalsSelected?.includes(item?.id)}
												onChange={(e) =>
													onChangeCheckbox(item?.id, e.target.checked)
												}
											/>
										</Grid>
									))}
								</Grid>
							</FormGroup>
						</FormControl>
					</Grid>
				</Grid>
			</form>
		</CvModalLayout>
	);
};

export default ModalCareerGoal;
