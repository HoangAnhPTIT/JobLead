"use client";
import { SearchOutlined } from "@mui/icons-material";
import { Button, Col, Form, Input, Row, Select } from "antd";

const SearchBox = () => {
	const [form] = Form.useForm();

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
						<Form.Item name="category">
							<Select size="large"></Select>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item name="subCategory">
							<Select size="large"></Select>
						</Form.Item>
					</Col>
					<Col span={3}>
						<Button
							type="primary"
							icon={<SearchOutlined />}
							htmlType="submit"
							size="large"
							className="w-full"
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
