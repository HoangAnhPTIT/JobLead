"use client";
import { SearchOutlined } from "@ant-design/icons";
import {
	KeyboardArrowDownOutlined,
	KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import { Button, Collapse, Grid } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputWithoutLabel from "src/commons/FormInput/InputWithoutLabel";
import SelectWithoutLabel from "src/commons/FormInput/SelectWithoutLabel";
import useEntities from "src/hooks/useEntities";

const JobSearch = () => {
	const { register, handleSubmit } = useForm();
	const entities = useEntities();
	const [showEnhanceSearch, setShowEnhanceSearch] = useState(true);

	const onSubmit = (values) => {
		console.log("search job values", values);
	};

	return (
		<div>
			<form>
				<div className="!w-content !mx-auto pt-7">
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
								icon={<SearchOutlined />}
							>
								Tìm kiếm
							</Button>
						</Grid>
					</Grid>
				</div>
				<div className="w-content mx-auto mt-1 mb-5">
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
							<div className="flex gap-3">
								<div className="w-1/5">
									<SelectWithoutLabel
										name="levelId"
										placeholder="Vị trí"
										register={register}
										list={entities?.Level}
									/>
								</div>
								<div className="w-1/5">
									<SelectWithoutLabel
										name="experienceId"
										placeholder="Kinh nghiệm"
										register={register}
										list={entities?.Experience}
									/>
								</div>
								<div className="w-1/5">
									<SelectWithoutLabel
										name="salaryId"
										placeholder="Mức lương"
										register={register}
										list={entities?.Salary}
									/>
								</div>
								<div className="w-1/5">
									<SelectWithoutLabel
										name="typeOfWorkId"
										placeholder="Loại hình công việc"
										list={entities?.TypeOfWork}
										register={register}
									/>
								</div>
								<div className="w-1/5">
									<SelectWithoutLabel
										name="genderId"
										placeholder="Giới tính"
										register={register}
										list={entities?.Gender}
									/>
								</div>
							</div>
						</Collapse>
					</div>
				</div>
			</form>
		</div>
	);
};

export default JobSearch;
