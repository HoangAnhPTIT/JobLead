"use client";
import { CaretDownOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Select } from "antd";
import classNames from "classnames";
import React from "react";

const { Option } = Select;

const EnhanceSearch = ({ classTitle = "" }) => {
	const [form] = Form.useForm();

	const onSubmit = () => {
		console.log(form.getFieldsValue());
	};

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
					<Form.Item name="major">
						<Select
							suffixIcon={<CaretDownOutlined />}
							size="large"
							placeholder="Ngành nghề"
						>
							<Option value="1">123</Option>
						</Select>
					</Form.Item>
					<Form.Item name="location">
						<Select
							suffixIcon={<CaretDownOutlined />}
							size="large"
							placeholder="Địa điểm"
						>
							<Option value="1">123</Option>
						</Select>
					</Form.Item>
					<Form.Item name="rank">
						<Select
							suffixIcon={<CaretDownOutlined />}
							size="large"
							placeholder="Cấp bậc"
						>
							<Option value="1">123</Option>
						</Select>
					</Form.Item>
					<Form.Item name="experience">
						<Select
							suffixIcon={<CaretDownOutlined />}
							size="large"
							placeholder="Năm kinh nghiệm"
						>
							<Option value="1">123</Option>
						</Select>
					</Form.Item>
					<Form.Item name="salary">
						<Select
							suffixIcon={<CaretDownOutlined />}
							size="large"
							placeholder="Mức lương"
						>
							<Option value="1">123</Option>
						</Select>
					</Form.Item>
					<Form.Item name="jobType">
						<Select
							suffixIcon={<CaretDownOutlined />}
							size="large"
							placeholder="Loại hình công việc"
						>
							<Option value="1">123</Option>
						</Select>
					</Form.Item>
					<Form.Item name="sex">
						<Select
							suffixIcon={<CaretDownOutlined />}
							size="large"
							placeholder="Giới tính"
						>
							<Option value="1">123</Option>
						</Select>
					</Form.Item>
				</Form>
				<Button
					type="primary"
					className="w-full"
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
