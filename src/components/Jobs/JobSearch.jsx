"use client";
import {
	KeyboardArrowDownOutlined,
	KeyboardArrowUpOutlined,
	SearchOutlined,
} from "@mui/icons-material";
import { Button, Collapse, Grid } from "@mui/material";
import { useAppSelector } from "lib/hooks";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputWithoutLabel from "src/commons/FormInput/InputWithoutLabel";
import SelectControllerWithoutLabel from "src/commons/FormInput/SelectControllerWithoutLabel";
import routeMap from "src/constants/routeMap";

const JobSearch = () => {
	const router = useRouter();
	const { career, location } = useParams();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);

	const { register, handleSubmit, setValue, control } = useForm();
	const { entities } = useAppSelector((state) => state.entity);
	const [showEnhanceSearch, setShowEnhanceSearch] = useState(true);

	const onSubmit = (values) => {
		const location = values.workLocation;
		const career = values.career;

		const valuesCloned = { ...values };
		delete valuesCloned.workLocation;
		delete valuesCloned.career;
		const getKeyAndValue = Object.entries(valuesCloned);

		getKeyAndValue.forEach((item) => {
			params.set(item[0], item[1]);
		});
		params.set("page", 1);

		router.push(
			`${routeMap.searchJob}/${career || 0}/${location || 0}?${params}`
		);
	};

	useEffect(() => {
		const initValue = async () => {
			setValue("career", career !== "0" ? career : "");
			setValue("workLocation", location !== "0" ? location : "");
			for (const [key, value] of searchParams.entries()) {
				setValue(key, value);
			}
		};
		initValue();
	}, [searchParams, career, location, setValue]);

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
							<SelectControllerWithoutLabel
								name="career"
								placeholder="Ngành nghề"
								list={entities?.Career}
								control={control}
								Controller={Controller}
							/>
						</Grid>
						<Grid item xs={3}>
							<SelectControllerWithoutLabel
								name="workLocation"
								placeholder="Địa điểm"
								list={entities?.WorkLocation}
								control={control}
								Controller={Controller}
							/>
						</Grid>
						<Grid item>
							<Button
								fullWidth
								variant="contained"
								onClick={handleSubmit((data) => onSubmit(data))}
								className="w-36 bg-primary"
							>
								<SearchOutlined /> Tìm kiếm
							</Button>
						</Grid>
					</Grid>
				</div>
				<div className="w-content mx-auto mt-1 mb-5">
					<div className="my-3 text-right flex justify-end">
						<span
							className="cursor-pointer"
							onClick={() => setShowEnhanceSearch(!showEnhanceSearch)}
						>
							{showEnhanceSearch ? (
								<KeyboardArrowDownOutlined />
							) : (
								<KeyboardArrowUpOutlined />
							)}
							Tìm kiếm nâng cao
						</span>
					</div>
					<div>
						<Collapse in={showEnhanceSearch}>
							<div className="flex gap-3">
								<div className="w-1/5">
									<SelectControllerWithoutLabel
										name="levelId"
										placeholder="Vị trí"
										control={control}
										Controller={Controller}
										list={entities?.Level}
									/>
								</div>
								<div className="w-1/5">
									<SelectControllerWithoutLabel
										name="experienceId"
										placeholder="Kinh nghiệm"
										control={control}
										Controller={Controller}
										list={entities?.Experience}
									/>
								</div>
								<div className="w-1/5">
									<SelectControllerWithoutLabel
										name="salaryId"
										placeholder="Mức lương"
										control={control}
										Controller={Controller}
										list={entities?.Salary}
									/>
								</div>
								<div className="w-1/5">
									<SelectControllerWithoutLabel
										name="typeOfWorkId"
										placeholder="Loại hình công việc"
										list={entities?.TypeOfWork}
										control={control}
										Controller={Controller}
									/>
								</div>
								<div className="w-1/5">
									<SelectControllerWithoutLabel
										name="genderId"
										placeholder="Giới tính"
										control={control}
										Controller={Controller}
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
