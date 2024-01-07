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
import InputSearch from "src/commons/FormInput/InputSearch";
import SelectFilter from "src/commons/FormInput/SelectFilter";
import routeMap from "src/constants/routeMap";
import { paramValue } from "src/helper/format";

const JobSearch = () => {
	const router = useRouter();
	const { career, location } = useParams();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);

	const { handleSubmit, setValue, control } = useForm();
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
			setValue("career", paramValue(career));
			setValue("workLocation", paramValue(location));
			for (const [key, value] of searchParams.entries()) {
				setValue(key, value);
			}
		};
		initValue();
	}, [searchParams, career, location]);

	return (
		<div>
			<form>
				<div className="w-full sm:w-smContent md:w-mdContent lg:w-lgContent xl:w-xlContent mx-auto pt-7">
					<Grid container spacing={2}>
						<Grid item flex={1}>
							<InputSearch
								name="q"
								placeholder="Tiêu đề công việc..."
								setValue={setValue}
								control={control}
								Controller={Controller}
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<SelectFilter
								name="career"
								placeholder="Ngành nghề"
								list={entities?.Career}
								valueKey="slug"
								control={control}
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<SelectFilter
								name="workLocation"
								placeholder="Địa điểm"
								list={entities?.WorkLocation}
								valueKey="slug"
								control={control}
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
				<div className="w-full sm:w-smContent md:w-mdContent lg:w-lgContent xl:w-xlContent mx-auto mt-1 mb-5">
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
							<div className="grid grid-cols-2 md:grid-cols-5 gap-3">
								<div>
									<SelectFilter
										name="levelId"
										placeholder="Vị trí"
										control={control}
										list={entities?.Level}
									/>
								</div>
								<div>
									<SelectFilter
										name="experienceId"
										placeholder="Kinh nghiệm"
										control={control}
										list={entities?.Experience}
									/>
								</div>
								<div>
									<SelectFilter
										name="salaryId"
										placeholder="Mức lương"
										control={control}
										list={entities?.Salary}
									/>
								</div>
								<div>
									<SelectFilter
										name="typeOfWorkId"
										placeholder="Loại hình công việc"
										list={entities?.TypeOfWork}
										control={control}
									/>
								</div>
								<div>
									<SelectFilter
										name="genderId"
										placeholder="Giới tính"
										control={control}
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
