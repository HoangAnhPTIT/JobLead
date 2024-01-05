"use client";
import {
	KeyboardArrowDownOutlined,
	KeyboardArrowUpOutlined,
	Search,
} from "@mui/icons-material";
import { Button, Collapse, Grid } from "@mui/material";
import { useAppSelector } from "lib/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputWithoutLabel from "src/commons/FormInput/InputWithoutLabel";
import SelectWithoutLabel from "src/commons/FormInput/SelectWithoutLabel";

const CandidateSearch = () => {
	const { register, handleSubmit } = useForm();
	const { entities } = useAppSelector((state) => state.entity);
	const [showEnhanceSearch, setShowEnhanceSearch] = useState(true);

	const onSubmit = (values) => {
		console.log("search job values", values);
	};

	return (
		<div>
			<form>
				<div className="!w-lgContent !mx-auto pt-7">
					<Grid container spacing={2}>
						<Grid item flex={1}>
							<InputWithoutLabel
								name="q"
								placeholder="Tiêu đề công việc..."
								register={register}
							/>
						</Grid>
						<Grid item xs={3}>
							<SelectWithoutLabel
								name="careerId"
								placeholder="Ngành nghề"
								list={entities?.Career}
								register={register}
							/>
						</Grid>
						<Grid item xs={3}>
							<SelectWithoutLabel
								name="workLocationId"
								placeholder="Địa điểm"
								list={entities?.WorkLocation}
								register={register}
							/>
						</Grid>
						<Grid item>
							<Button
								fullWidth
								variant="contained"
								onClick={handleSubmit((data) => onSubmit(data))}
								className="w-36 bg-primary"
							>
								<Search fontSize="small" /> Tìm kiếm
							</Button>
						</Grid>
					</Grid>
				</div>
				<div className="w-lgContent mx-auto mt-1 mb-5">
					<div
						className="cursor-pointer my-3 text-right flex justify-end"
						onClick={() => setShowEnhanceSearch(!showEnhanceSearch)}
					>
						{showEnhanceSearch ? (
							<KeyboardArrowDownOutlined />
						) : (
							<KeyboardArrowUpOutlined />
						)}
						Tìm kiếm nâng cao
					</div>
					<div>
						<Collapse in={showEnhanceSearch}>
							<Grid container spacing={2}>
								<Grid item xs={4}>
									<SelectWithoutLabel
										name="degreeId"
										placeholder="Học vấn"
										register={register}
										list={entities?.Degree}
									/>
								</Grid>
								<Grid item xs={4}>
									<SelectWithoutLabel
										name="levelId"
										placeholder="Vị trí"
										register={register}
										list={entities?.Level}
									/>
								</Grid>
								<Grid item xs={4}>
									<SelectWithoutLabel
										name="experienceId"
										placeholder="Kinh nghiệm"
										register={register}
										list={entities?.Experience}
									/>
								</Grid>
								<Grid item xs={4}>
									<SelectWithoutLabel
										name="languageId"
										placeholder="Ngoại ngữ"
										register={register}
										list={entities?.Language}
									/>
								</Grid>
								<Grid item xs={4}>
									<SelectWithoutLabel
										name="genderId"
										placeholder="Giới tính"
										register={register}
										list={entities?.Gender}
									/>
								</Grid>
								<Grid item xs={4}>
									<SelectWithoutLabel
										name="salaryId"
										placeholder="Mức lương"
										register={register}
										list={entities?.Salary}
									/>
								</Grid>
							</Grid>
						</Collapse>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CandidateSearch;
