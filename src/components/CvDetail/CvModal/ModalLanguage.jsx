"use client";
import { Grid } from "@mui/material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateLanguageSkill } from "src/apis/apiEndpoint";
import SelectForm from "src/commons/FormInput/SelectForm";
import { LANGUAGES } from "src/constants/cv";
import CvModalLayout from "./CvModalLayout";

const ModalLanguage = ({ data, open, handleClose }) => {
	const { entities } = useAppSelector((state) => state.entity);
	const dispatch = useAppDispatch();
	const { handleSubmit, reset, control } = useForm();

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
	}, [data, reset]);

	return (
		<CvModalLayout
			title={"Ngoại ngữ"}
			open={open}
			handleClose={handleClose}
			handleSubmit={handleSubmit((data) => onSubmit(data))}
		>
			<form>
				{LANGUAGES.map((item, i) => (
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
			</form>
		</CvModalLayout>
	);
};

export default ModalLanguage;
