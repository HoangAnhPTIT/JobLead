"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { httpGet } from "src/apis/apiCaller";
import { apiGetEntities } from "src/apis/apiEndpoint";
import SelectWithoutLabel from "src/commons/Input/SelectWithoutLabel";

const staticEntities = [
	"Career",
	"WorkLocation",
	"Level",
	"Experience",
	"Salary",
	"TypeOfWork",
	"Gender",
];

const EnhanceSearch = ({ classTitle = "" }) => {
	const { register, handleSubmit } = useForm();

	const [searchOptions, setSearchOptions] = useState();

	const onSubmit = (values) => {
		console.log("values", values);
	};

	useEffect(() => {
		const getOptionValues = async () => {
			try {
				Promise.all(
					staticEntities?.map(
						async (item) =>
							await httpGet(apiGetEntities, {
								entityType: item,
							})
					)
				).then((responses) => {
					responses?.forEach((element, i) => {
						element?.status === 200 &&
							setSearchOptions((prev) => ({
								...prev,
								[staticEntities[i]]: element?.data,
							}));
					});
				});
			} catch (error) {
				console.error("getEntityError", error);
			}
		};
		getOptionValues();
	}, []);

	return (
		<div>
			<div className="bg-primary p-2 h-12" style={{ lineHeight: "40px" }}>
				<SearchOutlined className="text-2xl" style={{ color: "#fff" }} />
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
				<form className="flex flex-col gap-4 mb-5">
					<SelectWithoutLabel
						name="careerId"
						placeholder="Ngành nghề"
						register={register}
						list={searchOptions?.Career}
					/>
					<SelectWithoutLabel
						name="workLocationId"
						register={register}
						placeholder="Địa điểm"
						list={searchOptions?.WorkLocation}
					/>
					<SelectWithoutLabel
						name="levelId"
						placeholder="Cấp bậc"
						register={register}
						list={searchOptions?.Level}
					/>
					<SelectWithoutLabel
						name="experienceId"
						placeholder="Năm kinh nghiệm"
						register={register}
						list={searchOptions?.Experience}
					/>
					<SelectWithoutLabel
						name="salaryId"
						placeholder="Mức lương"
						register={register}
						list={searchOptions?.Salary}
					/>
					<SelectWithoutLabel
						name="typeOfWorkId"
						placeholder="Loại hình công việc"
						register={register}
						list={searchOptions?.TypeOfWork}
					/>
					<SelectWithoutLabel
						name="genderId"
						placeholder="Giới tính"
						register={register}
						list={searchOptions?.Gender}
					/>
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
