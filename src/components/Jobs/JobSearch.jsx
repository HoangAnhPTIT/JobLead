"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Flex, Form, Input, Row, Select } from "antd";
import classNames from "classnames";
import styles from "./styles.module.scss";

const { Option } = Select;

const JobSearch = () => {
	const [form] = Form.useForm();

	const onSubmit = () => {
		console.log("search job values", form.getFieldsValue());
	};

	return (
		<div>
			<Form form={form} onFinish={onSubmit}>
				<Row gutter={16} className="w-content !mx-auto pt-7">
					<Col flex={1}>
						<Form.Item name="q">
							<Input size="large" placeholder="Tiêu đề công việc..." />
						</Form.Item>
					</Col>
					<Col span={5}>
						<Form.Item name="major">
							<Select size="large" placeholder="Ngành nghề">
								<Option value="IT">IT</Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={5}>
						<Form.Item name="location" placeholder="Địa điểm">
							<Select size="large">
								<Select.Option value="hanoi">Hà Nội</Select.Option>
							</Select>
						</Form.Item>
					</Col>
					<Col>
						<Button
							size="large"
							type="primary"
							htmlType="submit"
							onClick={onSubmit}
							className="w-36 bg-primary"
							icon={<SearchOutlined />}
						>
							Tìm kiếm
						</Button>
					</Col>
				</Row>
				<Collapse
					className={classNames(["w-content !mx-auto", styles.enhanceSearch])}
					defaultActiveKey={["1"]}
					ghost
					items={[
						{
							key: "1",
							label: "Tìm kiếm nâng cao",
							children: (
								<Flex gap={16}>
									<Form.Item name="rank" className="w-1/5">
										<Select size="large" placeholder="Cấp bậc">
											<Option value="1">123</Option>
										</Select>
									</Form.Item>
									<Form.Item name="experience" className="w-1/5">
										<Select size="large" placeholder="Năm kinh nghiệm">
											<Option value="1">123</Option>
										</Select>
									</Form.Item>
									<Form.Item name="salary" className="w-1/5">
										<Select size="large" placeholder="Mức lương">
											<Option value="1">123</Option>
										</Select>
									</Form.Item>
									<Form.Item name="jobType" className="w-1/5">
										<Select size="large" placeholder="Loại hình công việc">
											<Option value="1">123</Option>
										</Select>
									</Form.Item>
									<Form.Item name="sex" className="w-1/5">
										<Select size="large" placeholder="Giới tính">
											<Option value="1">123</Option>
										</Select>
									</Form.Item>
								</Flex>
							),
						},
					]}
				/>
			</Form>
		</div>
	);
};

export default JobSearch;
