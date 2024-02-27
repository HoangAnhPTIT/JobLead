"use client";
import {
	KeyboardArrowDownOutlined,
	KeyboardArrowUpOutlined,
	SearchOutlined,
} from "@mui/icons-material";
import { Collapse, Grid } from "@mui/material";
import { AutoComplete, Button, Form } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { httpGet } from "src/apis/apiCaller";
import { apiJob } from "src/apis/apiEndpoint";
import routeMap from "src/constants/routeMap";
import {
	convertSearchParamsToObject,
	genUrlParams,
	paramValue,
} from "src/helper/format";
import SelectAntd from "../AntdForm/SelectAntd";

const JobSearch = () => {
	const router = useRouter();
	const { career, location } = useParams();
	const searchParams = useSearchParams();
	const [form] = Form.useForm();

	const { entities } = useAppSelector((state) => state.entity);
	const [showEnhanceSearch, setShowEnhanceSearch] = useState(true);
	const dispatch = useAppDispatch();

	const onSubmit = async () => {
		dispatch(updateLoading(true));
		const values = form.getFieldsValue();
		const location = values.workLocation;
		const career = values.career;

		const valuesCloned = { ...values };
		delete valuesCloned.workLocation;
		delete valuesCloned.career;

		await router.push(
			genUrlParams(
				`${routeMap.searchJob}/${career || 0}/${location || 0}`,
				valuesCloned
			)
		);
		dispatch(updateLoading(false));
	};

	const [suggestList, setSuggestList] = useState([]);

	useEffect(() => {
		const getSuggest = async () => {
			const response = await httpGet(`${apiJob}/suggestion`, { q: "" });
			setSuggestList(response?.data);
		};
		getSuggest();
	}, []);

	useEffect(() => {
		const initValue = () => {
			const searchParamsObject =
				searchParams.toString() && convertSearchParamsToObject(searchParams);
			form.setFieldsValue({
				...searchParamsObject,
				career: paramValue(career),
				workLocation: paramValue(location),
			});
		};
		initValue();
	}, []);

	return (
		<div>
			<Form form={form}>
				<div className="w-full sm:w-smContent md:w-mdContent lg:w-lgContent xl:w-xlContent mx-auto pt-7">
					<Grid container spacing={2}>
						<Grid item flex={1}>
							<Form.Item name="q">
								<AutoComplete
									allowClear
									size="large"
									options={suggestList}
									placeholder="Tiêu đề công việc..."
									fieldNames={{ label: "name", value: "name" }}
									filterOption={(inputValue, option) =>
										option.name
											.toUpperCase()
											.indexOf(inputValue.toUpperCase()) !== -1
									}
								/>
							</Form.Item>
						</Grid>
						<Grid item xs={12} md={3}>
							<SelectAntd
								form={Form}
								name="career"
								allowClear
								placeholder="Ngành nghề"
								valueKey="slug"
								list={entities?.Career}
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<SelectAntd
								form={Form}
								name="workLocation"
								allowClear
								placeholder="Địa điểm"
								list={entities?.WorkLocation}
								valueKey="slug"
							/>
						</Grid>
						<Grid item>
							<Button
								type="primary"
								htmlType="submit"
								size="large"
								onClick={onSubmit}
								className="w-36 "
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
									<SelectAntd
										form={Form}
										name="levelId"
										allowClear
										placeholder="Vị trí"
										list={entities?.Level}
									/>
								</div>
								<div>
									<SelectAntd
										form={Form}
										name="experienceId"
										allowClear
										placeholder="Kinh nghiệm"
										list={entities?.Experience}
									/>
								</div>
								<div>
									<SelectAntd
										form={Form}
										name="salaryId"
										allowClear
										placeholder="Mức lương"
										list={entities?.Salary}
									/>
								</div>
								<div>
									<SelectAntd
										form={Form}
										name="typeOfWorkId"
										allowClear
										placeholder="Loại hình công việc"
										list={entities?.TypeOfWork}
									/>
								</div>
								<div>
									<SelectAntd
										form={Form}
										name="genderId"
										allowClear
										placeholder="Giới tính"
										list={entities?.Gender}
									/>
								</div>
							</div>
						</Collapse>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default JobSearch;
