"use client";
import { Search, SearchOutlined } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import classNames from "classnames";
import { useAppSelector } from "lib/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import SelectFilter from "src/commons/FormInput/SelectFilter";
import routeMap from "src/constants/routeMap";

const EnhanceSearch = ({ classTitle = "" }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const { register, handleSubmit, control } = useForm();
	const { entities } = useAppSelector((state) => state.entity);

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

	return (
		<div>
			<div
				className="bg-primary p-2 h-12 flex items-center"
				style={{ lineHeight: "40px" }}
			>
				<SearchOutlined fontSize="medium" style={{ color: "#fff" }} />
				<span
					className={classNames([
						"text-white ml-2 uppercase text-xl",
						classTitle,
					])}
				>
					Tìm kiếm nâng cao
				</span>
			</div>
			<div className="p-4 bg-white">
				<form className="mb-5">
					<Stack spacing={2}>
						<SelectFilter
							control={control}
							name="career"
							placeholder="Ngành nghề"
							list={entities?.Career}
							valueKey="slug"
						/>
						<SelectFilter
							control={control}
							name="workLocation"
							placeholder="Địa điểm"
							list={entities?.WorkLocation}
							valueKey="slug"
						/>
						<SelectFilter
							control={control}
							name="levelId"
							placeholder="Cấp bậc"
							list={entities?.Level}
						/>
						<SelectFilter
							control={control}
							name="experienceId"
							placeholder="Năm kinh nghiệm"
							list={entities?.Experience}
						/>
						<SelectFilter
							control={control}
							name="salaryId"
							placeholder="Mức lương"
							list={entities?.Salary}
						/>
						<SelectFilter
							control={control}
							name="typeOfWorkId"
							placeholder="Loại hình công việc"
							list={entities?.TypeOfWork}
						/>
						<SelectFilter
							control={control}
							name="genderId"
							placeholder="Giới tính"
							list={entities?.Gender}
						/>
					</Stack>
				</form>
				<Button
					fullWidth
					variant="contained"
					className="h-10"
					startIcon={<Search />}
					onClick={handleSubmit((data) => onSubmit(data))}
				>
					<div className="h-5">Tìm kiếm</div>
				</Button>
			</div>
		</div>
	);
};

export default EnhanceSearch;
