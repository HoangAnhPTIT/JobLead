"use client";
import {
	KeyboardArrowDownOutlined,
	KeyboardArrowUpOutlined,
	Search,
} from "@mui/icons-material";
import { Button, Collapse, Grid } from "@mui/material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputWithoutLabel from "src/commons/FormInput/InputWithoutLabel";
import SelectFilter from "src/commons/FormInput/SelectFilter";
import { genUrlParams } from "src/helper/format";

const CandidateSearch = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { register, handleSubmit, setValue, control } = useForm();
	const { entities } = useAppSelector((state) => state.entity);
	const [showEnhanceSearch, setShowEnhanceSearch] = useState(true);
	const dispatch = useAppDispatch();

	const onSubmit = (values) => {
		dispatch(updateLoading(true));
		try {
			router.push(genUrlParams(pathname, values));
		} catch (error) {
			toast.error(error.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		const initValues = async () => {
			for (const [key, value] of searchParams.entries()) {
				setValue(key, value);
			}
		};
		initValues();
	}, [searchParams, setValue]);

	return (
		<div>
			<form>
				<div className="!w-lgContent xl:!w-xlContent !mx-auto pt-7">
					<Grid container spacing={2}>
						<Grid item flex={1}>
							<InputWithoutLabel
								name="q"
								placeholder="Tiêu đề công việc..."
								register={register}
							/>
						</Grid>
						<Grid item xs={3}>
							<SelectFilter
								control={control}
								name="careerId"
								placeholder="Ngành nghề"
								list={entities?.Career}
							/>
						</Grid>
						<Grid item xs={3}>
							<SelectFilter
								control={control}
								name="cityId"
								placeholder="Địa điểm"
								list={entities?.WorkLocation}
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
				<div className="w-lgContent xl:w-xlContent mx-auto mt-1 mb-5">
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
									<SelectFilter
										control={control}
										name="degreeId"
										placeholder="Học vấn"
										list={entities?.Degree}
									/>
								</Grid>
								<Grid item xs={4}>
									<SelectFilter
										control={control}
										name="levelId"
										placeholder="Vị trí"
										list={entities?.Level}
									/>
								</Grid>
								<Grid item xs={4}>
									<SelectFilter
										control={control}
										name="experienceId"
										placeholder="Kinh nghiệm"
										list={entities?.Experience}
									/>
								</Grid>
								<Grid item xs={4}>
									<SelectFilter
										control={control}
										name="languageId"
										placeholder="Ngoại ngữ"
										list={entities?.Language}
									/>
								</Grid>
								<Grid item xs={4}>
									<SelectFilter
										control={control}
										name="genderId"
										placeholder="Giới tính"
										list={entities?.Gender}
									/>
								</Grid>
								<Grid item xs={4}>
									<SelectFilter
										control={control}
										name="salaryId"
										placeholder="Mức lương"
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
