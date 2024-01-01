"use client";
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	TextField,
} from "@mui/material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { concat } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateSkill } from "src/apis/apiEndpoint";
import { getArrayObjectValue, removeArrayValue } from "src/helper/format";
import CvModalLayout from "./CvModalLayout";

const ModalSkill = ({ data, open, handleClose }) => {
	const { entities } = useAppSelector((state) => state.entity);
	const dispatch = useAppDispatch();
	const { register, handleSubmit, setValue } = useForm();

	const [skillsSelected, setSkillsSelected] = useState([]);

	const onChangeCheckbox = (id, value) => {
		if (value) {
			const newSkills = concat(skillsSelected, id);
			setSkillsSelected(newSkills);
		} else {
			const newSkills = removeArrayValue(skillsSelected, id);
			setSkillsSelected(newSkills);
		}
	};

	const onSubmit = async (values) => {
		dispatch(updateLoading(true));
		try {
			await httpAuthPut({
				endpoint: apiCandidateSkill,
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
		const defatultSkillsSelected = getArrayObjectValue(data?.skills, "skillId");
		setSkillsSelected(defatultSkillsSelected);
	}, [data?.skills]);

	useEffect(() => {
		setValue("description", data?.skillDescription);
	}, [data?.skillDescription, setValue]);

	useEffect(() => {
		setValue("skillIds", skillsSelected);
	}, [setValue, skillsSelected]);

	return (
		<CvModalLayout
			title={"Kỹ năng"}
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
									{entities?.SkillSet?.map((item, i) => (
										<Grid item xs={6} key={i}>
											<FormControlLabel
												control={<Checkbox />}
												label={item?.name}
												{...register("skillIds")}
												value={item?.id}
												checked={skillsSelected?.includes(item?.id)}
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

export default ModalSkill;
