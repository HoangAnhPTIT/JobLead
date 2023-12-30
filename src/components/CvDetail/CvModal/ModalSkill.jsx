"use client";
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	TextField,
} from "@mui/material";
import { useAppSelector } from "lib/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getArrayObjectValue } from "src/helper/format";
import CvModalLayout from "./CvModalLayout";

const ModalSkill = ({ data, open, handleClose }) => {
	const { entities } = useAppSelector((state) => state.entity);
	const { register, handleSubmit, reset } = useForm();

	const onSubmit = async (values) => {
		console.log("values", values);
	};

	useEffect(() => {
		const skillIds = getArrayObjectValue(data?.skills);
		reset({ skills: skillIds, description: data?.skillDescription });
	}, [data, reset]);

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
									<Grid item xs={6}>
										<FormControlLabel
											control={<Checkbox />}
											label="Kỹ năng tổ chức"
											{...register("skillIds")}
											value={1}
										/>
									</Grid>
									<Grid item xs={6}>
										<FormControlLabel
											control={<Checkbox />}
											label="Kỹ năng tổ ức"
											{...register("skillIds")}
											value={2}
										/>
									</Grid>
									<Grid item xs={6}>
										<FormControlLabel
											control={<Checkbox />}
											label="Kỹ năng tchức"
											{...register("skillIds")}
											value={3}
										/>
									</Grid>
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
