"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input } from "antd";

const CompanySearch = () => {
	return (
		<Flex gap={16} className="w-content mx-auto py-5 bg-white">
			<Input size="large" placeholder="Nhập tên công ty muốn tìm kiếm" />
			<Button size="large" icon={<SearchOutlined />} type="primary bg-primary">
				Tìm kiếm
			</Button>
		</Flex>
	);
};

export default CompanySearch;
