"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { httpGet } from "src/apis/apiCaller";
import { apiGetEntities } from "src/apis/apiEndpoint";

const { Option } = Select;

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
	const [form] = Form.useForm();
	const [searchOptions, setSearchOptions] = useState();

	const onSubmit = () => {
		console.log(form.getFieldsValue());
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
			<div className="bg-primary p-2">
				<SearchOutlined className="text-2xl" style={{ color: "#fff" }} />
				<span
					className={classNames([
						"text-white ml-2 uppercase text-2xl",
						classTitle,
					])}
				>
					Tìm kiếm nâng cao
				</span>
			</div>
			<div className="p-4 bg-white">
				<Form form={form} onFinish={onSubmit}>
					<Form.Item name="Career">
						<Select size="large" placeholder="Ngành nghề">
							{searchOptions?.Career?.map((item, i) => (
								<Option value={item?.id} key={i}>
									{item?.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name="WorkLocation">
						<Select size="large" placeholder="Địa điểm">
							{searchOptions?.WorkLocation?.map((item, i) => (
								<Option value={item?.id} key={i}>
									{item?.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name="Level">
						<Select size="large" placeholder="Cấp bậc">
							{searchOptions?.Level?.map((item, i) => (
								<Option value={item?.id} key={i}>
									{item?.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name="Experience">
						<Select size="large" placeholder="Năm kinh nghiệm">
							{searchOptions?.Experience?.map((item, i) => (
								<Option value={item?.id} key={i}>
									{item?.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name="Salary">
						<Select size="large" placeholder="Mức lương">
							{searchOptions?.Salary?.map((item, i) => (
								<Option value={item?.id} key={i}>
									{item?.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name="TypeOfWork">
						<Select size="large" placeholder="Loại hình công việc">
							{searchOptions?.TypeOfWork?.map((item, i) => (
								<Option value={item?.id} key={i}>
									{item?.name}
								</Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name="Gender">
						<Select size="large" placeholder="Giới tính">
							{searchOptions?.Gender?.map((item, i) => (
								<Option value={item?.id} key={i}>
									{item?.name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</Form>
				<Button
					type="primary"
					className="w-full bg-primary"
					size="large"
					icon={<SearchOutlined />}
					onClick={onSubmit}
				>
					Tìm kiếm
				</Button>
			</div>
		</div>
	);
};

export default EnhanceSearch;
