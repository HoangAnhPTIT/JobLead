"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Search } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import SelectWithoutLabel from "src/commons/FormInput/SelectWithoutLabel";
import useEntities from "src/hooks/useEntities";

const EnhanceSearch = ({ classTitle = "" }) => {
	const { register, handleSubmit } = useForm();
	const entities = useEntities();

	const onSubmit = (values) => {
		console.log("values", values);
	};

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
				<form className="mb-5">
					<Stack spacing={2}>
						<SelectWithoutLabel
							name="careerId"
							placeholder="Ngành nghề"
							register={register}
							list={entities?.Career}
						/>
						<SelectWithoutLabel
							name="workLocationId"
							register={register}
							placeholder="Địa điểm"
							list={entities?.WorkLocation}
						/>
						<SelectWithoutLabel
							name="levelId"
							placeholder="Cấp bậc"
							register={register}
							list={entities?.Level}
						/>
						<SelectWithoutLabel
							name="experienceId"
							placeholder="Năm kinh nghiệm"
							register={register}
							list={entities?.Experience}
						/>
						<SelectWithoutLabel
							name="salaryId"
							placeholder="Mức lương"
							register={register}
							list={entities?.Salary}
						/>
						<SelectWithoutLabel
							name="typeOfWorkId"
							placeholder="Loại hình công việc"
							register={register}
							list={entities?.TypeOfWork}
						/>
						<SelectWithoutLabel
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
