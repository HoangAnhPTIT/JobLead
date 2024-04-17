"use client";
import { SearchOutlined } from "@mui/icons-material";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { httpAuthGet, httpAuthPost } from "src/apis/apiAuthCaller";
import { apiCategory, apiProvince } from "src/apis/apiEndpoint";
import { genUrlParams } from "src/helper/format";

const SearchBox = () => {
	const [categories, setCategories] = useState();
	const [provinces, setProvinces] = useState();
	const [form] = Form.useForm();
	const pathname = usePathname();
	const router = useRouter();

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
				<Row gutter={16}>
					<Col span={9}>
						<Form.Item name="q">
							<Input placeholder="Tìm kiếm..." size="large" />
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item name="categoryId">
							<Select size="large" placeholder="Phân loại" allowClear>
								{categories?.map((item, i) => (
									<Select.Option key={i} value={item?.id}>
										{item?.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>

					<Col span={6}>
						<Form.Item name="provinceId">
							<Select size="large" placeholder="Địa điểm">
								{provinces?.map((item, i) => (
									<Select.Option key={i} value={item?.id}>
										{item?.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={3}>
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
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default SearchBox;
