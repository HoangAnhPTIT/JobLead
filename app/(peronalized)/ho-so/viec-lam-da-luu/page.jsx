"use client";
import { Button, Col, DatePicker, Form, Input, Row, Table } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCandidateSaveJobs } from "src/apis/apiEndpoint";
import FileLayout from "src/components/Files/FileLayout";
import { errorMessage } from "src/constants/common";
import { getDate } from "src/helper/format";

const columns = [
	{
		title: "Vị trí / Công ty",
		dataIndex: "",
		key: "name",
		render: (value) => (
			<span>
				{value?.jobName} / {value?.company?.name}
			</span>
		),
	},
	{
		title: "Địa điểm",
		dataIndex: "location",
		key: "location",
	},
	{
		title: "Mức lương",
		dataIndex: "salary",
		key: "salary",
	},
	{
		title: "Ngày lưu",
		dataIndex: "createdDate",
		key: "createdDate",
		render: (value) => getDate(value),
	},
];

const SavedJobPage = () => {
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const [data, setData] = useState();
	const [filter, setFilter] = useState({});

	const onSubmit = () => {
		const values = form.getFieldsValue();
		setFilter(values);
	};

	useEffect(() => {
		const getData = async () => {
			dispatch(updateLoading(true));
			const res = await httpAuthGet({
				endpoint: apiCandidateSaveJobs,
				params: { ...filter, page: 1, size: 1000 },
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
		<FileLayout>
			<div>
				<Form form={form}>
					<Row gutter={16}>
						<Col span={8}>
							<Form.Item name="q">
								<Input placeholder="Vị trí/Công ty" size="large" allowClear />
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
				<p className="text-lg mt-2 mb-4">Danh sách việc làm đã lưu</p>
				<Table
					size="small"
					bordered
					columns={columns}
					dataSource={data?.jobs || []}
				/>
			</div>
		</FileLayout>
	);
};

export default SavedJobPage;
