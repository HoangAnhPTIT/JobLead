"use client";
import { Search, SearchOutlined } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import classNames from "classnames";
import { useAppSelector } from "lib/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import SelectForm from "src/commons/FormInput/SelectForm";
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
						<SelectForm
							control={control}
							Controller={Controller}
							name="career"
							placeholder="Ngành nghề"
							register={register}
							list={entities?.Career}
							valueKey="slug"
						/>
						<SelectForm
							control={control}
							Controller={Controller}
							name="workLocation"
							register={register}
							placeholder="Địa điểm"
							list={entities?.WorkLocation}
							valueKey="slug"
						/>
						<SelectForm
							control={control}
							Controller={Controller}
							name="levelId"
							placeholder="Cấp bậc"
							register={register}
							list={entities?.Level}
						/>
						<SelectForm
							control={control}
							Controller={Controller}
							name="experienceId"
							placeholder="Năm kinh nghiệm"
							register={register}
							list={entities?.Experience}
						/>
						<SelectForm
							control={control}
							Controller={Controller}
							name="salaryId"
							placeholder="Mức lương"
							register={register}
							list={entities?.Salary}
						/>
						<SelectForm
							control={control}
							Controller={Controller}
							name="typeOfWorkId"
							placeholder="Loại hình công việc"
							register={register}
							list={entities?.TypeOfWork}
						/>
						<SelectForm
							control={control}
							Controller={Controller}
							name="genderId"
							placeholder="Giới tính"
							register={register}
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
