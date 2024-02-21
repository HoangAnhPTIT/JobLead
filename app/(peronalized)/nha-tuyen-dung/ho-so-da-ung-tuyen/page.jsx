"use client";
import { Button, Col, DatePicker, Form, Input, Row, Table } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCompanyApplication } from "src/apis/apiEndpoint";
import EmployerBanner from "src/components/Employer/EmployerBanner";
import EmployerLayout from "src/components/Employer/EmployerLayout";
import { errorMessage } from "src/constants/common";
import { getDate } from "src/helper/format";

const columns = [
	{
		title: "Họ tên",
		key: "name",
		dataIndex: "candidate",
		render: (value) => value?.name,
	},
	{
		title: "Vị trí ứng tuyển",
		dataIndex: "job",
		render: (value) => value?.title,
	},
	{
		title: "Thông tin liên hệ",
		dataIndex: "candidate",
		key: "info",
		render: (value) => (
			<div>
				<p>{value?.email}</p>
				<p>{value?.phone}</p>
			</div>
		),
	},
	{
		title: "Ngày nộp",
		dataIndex: "applyDate",
		key: "applyDate",
		render: (value) => getDate(value),
	},
];

const AppliedCandidatePage = () => {
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
			name: record.name,
		}),
	};

	useEffect(() => {
		const getData = async () => {
			dispatch(updateLoading(true));
			const res = await httpAuthGet({
				endpoint: apiCompanyApplication,
				params: filter,
			});
			if (res?.status === 200) {
				setData(res?.data?.application);
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
								<Input placeholder="Vị trí ứng tuyển" size="large" allowClear />
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
								className="w-full"
							>
								Tìm kiếm
							</Button>
						</Col>
					</Row>
				</Form>
				<p className="text-lg my-5">Danh sách hồ sơ đã ứng tuyển</p>
				<Table
					bordered
					size="small"
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

export default AppliedCandidatePage;
