"use client";
import { Button, Col, DatePicker, Form, Input, Row, Table } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useState } from "react";
import EmployerBanner from "src/components/Employer/EmployerBanner";
import EmployerLayout from "src/components/Employer/EmployerLayout";

const columns = [
	{
		title: "Họ tên",
		dataIndex: "name",
		key: "name",
		render: (text) => <a>{text}</a>,
	},
	{
		title: "Thông tin liên hệ",
		dataIndex: "info",
		key: "info",
		render: (value) => (
			<div>
				<p>{value.email}</p>
				<p>{value.phone}</p>
			</div>
		),
	},
	{
		title: "Điểm",
		dataIndex: "point",
		key: "point",
	},
	{
		title: "Ngày xem",
		dataIndex: "viewedAt",
		key: "viewedAt",
	},
	{
		title: "Hành động",
		dataIndex: "x",
		key: "x",
	},
];

const fakeData = [
	{
		key: 1,
		name: "hic asjdflsl",
		info: {
			email: "abc@xyc.ood",
			phone: "0978",
		},
		point: "20",
		viewedAt: "19/12/2023",
	},
];

const ViewedCandidatePage = () => {
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const [data, setData] = useState();

	const onSubmit = () => {
		dispatch(updateLoading(true));
		const values = form.getFieldsValue();
		console.log(values);
		dispatch(updateLoading(false));
	};

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(
				`selectedRowKeys: ${selectedRowKeys}`,
				"selectedRows: ",
				selectedRows
			);
		},
		getCheckboxProps: (record) => ({
			disabled: record.name === "Disabled User",
			// Column configuration not to be checked
			name: record.name,
		}),
	};

	return (
		<EmployerLayout>
			<div>
				<EmployerBanner />
			</div>
			<div>
				<Form form={form}>
					<Row gutter={16}>
						<Col span={8}>
							<Form.Item name="q">
								<Input placeholder="Tên ứng viên" size="large" />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item name="startAt">
								<DatePicker
									size="large"
									placeholder="Từ ngày"
									className="w-full"
								/>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item name="endAt">
								<DatePicker
									size="large"
									placeholder="Đến ngày"
									className="w-full"
								/>
							</Form.Item>
						</Col>
						<Col span={4}>
							<Button
								size="large"
								type="primary"
								htmlType="submit"
								onClick={onSubmit}
							>
								Tìm kiếm
							</Button>
						</Col>
					</Row>
				</Form>
				<p className="text-lg my-5">Danh sách hồ sơ đã xem thông tin</p>
				<Table
					bordered
					rowSelection={{
						type: "checkbox",
						...rowSelection,
					}}
					columns={columns}
					dataSource={fakeData}
				/>
			</div>
		</EmployerLayout>
	);
};

export default ViewedCandidatePage;
