"use client";
import { SearchOutlined } from "@mui/icons-material";
import { Button, Col, Form, Input, Row, Select, TreeSelect } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCategory, apiProvince } from "src/apis/apiEndpoint";
import { genUrlParams } from "src/helper/format";

const filterOption = (input, option) =>
	(option?.children ?? "").toLowerCase().includes(input.toLowerCase());

const SearchBox = () => {
	const [categories, setCategories] = useState();
	const [provinces, setProvinces] = useState();
	const [form] = Form.useForm();
	const pathname = usePathname();
	const router = useRouter();

	const categoriesFiltered = useMemo(
		() => categories?.filter((item) => !item?.parentId),
		[categories]
	);

	const onSearch = () => {
		const values = form.getFieldsValue();
		const url = genUrlParams(pathname, values);
		router.push(url);
	};

	useEffect(() => {
		const getData = async () => {
			const categoryResponse = await httpAuthGet({ endpoint: apiCategory });
			const provinceResponse = await httpAuthGet({ endpoint: apiProvince });

			setCategories(categoryResponse?.data);
			setProvinces(provinceResponse?.data);
		};
		getData();
	}, []);

	return (
		<div>
			<Form form={form}>
				<div className="flex gap-5">
					<div className="grid grid-cols-2 flex-1 gap-5">
						<div>
							<Form.Item name="categoryId">
								<TreeSelect
									showSearch
									placeholder="Phân loại"
									allowClear
									treeNodeFilterProp="name"
									dropdownStyle={{
										maxHeight: 400,
										overflow: "auto",
									}}
									treeData={categoriesFiltered}
									fieldNames={{
										label: "name",
										value: "id",
									}}
									size="large"
								/>
							</Form.Item>
						</div>
						<div>
							<Form.Item name="provinceId">
								<Select
									size="large"
									placeholder="Địa điểm"
									showSearch
									allowClear
									optionFilterProp="name"
									filterOption={filterOption}
								>
									{provinces?.map((item, i) => (
										<Select.Option key={i} value={item?.id}>
											{item?.name}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</div>
					</div>
					<div className="w-[150px]">
						<Button
							type="primary"
							icon={<SearchOutlined />}
							htmlType="submit"
							size="large"
							className="w-full"
							onClick={onSearch}
						>
							Tìm kiếm
						</Button>
					</div>
				</div>
			</Form>
		</div>
	);
};

export default SearchBox;
