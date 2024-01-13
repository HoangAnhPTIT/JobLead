"use client";
import { Button, Col, DatePicker, Form, Input, Row, Table } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCompanyViewByCandidate } from "src/apis/apiEndpoint";
import EmployerBanner from "src/components/Employer/EmployerBanner";
import EmployerLayout from "src/components/Employer/EmployerLayout";
import { errorMessage } from "src/constants/common";
import { getDate } from "src/helper/format";

const columns = [
	{
		title: "Họ tên",
		dataIndex: "candidateInfo",
		key: "name",
		render: (value) => value?.name,
	},
	{
		title: "Thông tin liên hệ",
		dataIndex: "candidateInfo",
		key: "info",
		render: (value) => (
			<div>
				<p>{value?.email}</p>
				<p>{value?.phone}</p>
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
		dataIndex: "viewedDate",
		key: "viewedDate",
		render: (value) => getDate(value),
	},
];

const ViewedCandidatePage = () => {
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const [data, setData] = useState();
	const [filter, setFilter] = useState({});

	const onSubmit = () => {
		const values = form.getFieldsValue();
		setFilter(values);
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

	useEffect(() => {
		const getData = async () => {
			dispatch(updateLoading(true));
			const res = await httpAuthGet({
				endpoint: apiCompanyViewByCandidate,
				params: filter,
			});
			if (res?.status === 200) {
				setData(res.data);
			} else {
				toast.error(errorMessage);
			}
			dispatch(updateLoading(false));
		};
		getData();
	}, [dispatch, filter]);

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
								<Input placeholder="Tên ứng viên" size="large" allowClear />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item name="startAt">
								<DatePicker
									size="large"
									placeholder="Từ ngày"
									className="w-full"
									allowClear
								/>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item name="endAt">
								<DatePicker
									size="large"
									placeholder="Đến ngày"
									className="w-full"
									allowClear
								/>
							</Form.Item>
						</Col>
						<Col span={4}>
							<Button
								size="large"
								type="primary"
								htmlType="submit"
								onClick={onSubmit}
								className="w-full"
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
					dataSource={data}
				/>
			</div>
		</EmployerLayout>
	);
};

export default ViewedCandidatePage;
