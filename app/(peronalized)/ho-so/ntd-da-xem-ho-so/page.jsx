"use client";
import { Button, Col, DatePicker, Form, Input, Row, Table } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCandidateCompanyViewProfile } from "src/apis/apiEndpoint";
import FileLayout from "src/components/Files/FileLayout";
import { errorMessage } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { getDate } from "src/helper/format";

const columns = [
	{
		title: "Công ty",
		dataIndex: "company",
		key: "name",
		render: (value) => (
			<Link href={`${routeMap.company}/${value?.id}`}>{value?.name}</Link>
		),
	},
	{
		title: "Địa chỉ",
		dataIndex: "company",
		key: "location",
		render: (value) => value?.address,
	},
	{
		title: "Ngày xem",
		dataIndex: "viewDate",
		key: "viewDate",
		render: (value) => getDate(value),
	},
];

const ViewedByEmployerPage = () => {
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
				endpoint: apiCandidateCompanyViewProfile,
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
		<FileLayout>
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
				<p className="text-lg mt-2 mb-4">
					Danh sách nhà tuyển dụng đã xem hồ sơ
				</p>
				<Table size="small" bordered columns={columns} dataSource={data} />
			</div>
		</FileLayout>
	);
};

export default ViewedByEmployerPage;
