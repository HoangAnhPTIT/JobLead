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

const ModalCareerGoal = ({ open, handleClose }) => {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log("data", data);
	};

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
									<Grid item xs={12}>
										<FormControlLabel
											control={<Checkbox />}
											label="Kỹ năng tổ chức"
											{...register("goalIds")}
											value={1}
										/>
									</Grid>
									<Grid item xs={12}>
										<FormControlLabel
											control={<Checkbox />}
											label="Kỹ năng tổ ức"
											{...register("goalIds")}
											value={2}
										/>
									</Grid>
									<Grid item xs={12}>
										<FormControlLabel
											control={<Checkbox />}
											label="Kỹ năng tchức"
											{...register("goalIds")}
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

export default ModalCareerGoal;
