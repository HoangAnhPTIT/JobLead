"use client";
import { DeleteOutline } from "@mui/icons-material";
import { Button, Col, DatePicker, Form, Input, Row, Table } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthDelete, httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCandidateSaveJobs } from "src/apis/apiEndpoint";
import PopconfirmDelete from "src/commons/PopconfirmDelete";
import FileLayout from "src/components/Files/FileLayout";
import { errorMessage } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { getDate } from "src/helper/format";

const SavedJobPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const [data, setData] = useState();
	const [filter, setFilter] = useState({});

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

	const onSubmit = () => {
		const values = form.getFieldsValue();
		setFilter(values);
	};

	const onUnsave = useCallback(
		async (id) => {
			dispatch(updateLoading(true));
			try {
				const res = await httpAuthDelete({
					endpoint: `${apiCandidateSaveJobs}/${id}`,
				});
				if (res?.status === 200) {
					toast.success("Bỏ lưu việc làm thành công");
					getData();
				} else {
					toast.error(errorMessage);
				}
			} catch {
				/* empty */
			} finally {
				dispatch(updateLoading(false));
			}
		},
		[dispatch]
	);

	const columns = useMemo(
		() => [
			{
				title: "Vị trí / Công ty",
				dataIndex: "",
				key: "name",
				render: (value) => (
					<div>
						<span
							className="link"
							onClick={() =>
								window.open(
									`${routeMap.job}${routeMap.detail}/${value?.jobInfo?.slug}`
								)
							}
						>
							{value?.jobInfo?.jobName}
						</span>
						<span className="mx-1">/</span>
						<span
							className="link"
							onClick={() =>
								window.open(`${routeMap.company}/${value?.companyInfo?.id}`)
							}
						>
							{value?.companyInfo?.name}
						</span>
					</div>
				),
			},
			{
				title: "Địa điểm",
				dataIndex: "jobInfo",
				key: "location",
				render: (value) => value?.location,
			},
			{
				title: "Mức lương",
				dataIndex: "jobInfo",
				key: "salary",
				render: (value) => value?.salary,
			},
			{
				title: "Ngày lưu",
				dataIndex: "createdDate",
				key: "createdDate",
				render: (value) => getDate(value),
			},
			{
				title: "Hành động",
				dataIndex: "jobInfo",
				key: "action",
				width: 100,
				render: (record) => (
					<div className="text-center">
						<PopconfirmDelete onDelete={() => onUnsave(record?.jobId)}>
							<DeleteOutline
								fontSize="small"
								className="text-red-600 cursor-pointer"
							/>
						</PopconfirmDelete>
					</div>
				),
			},
		],
		[onUnsave]
	);

	useEffect(() => {
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
					dataSource={data?.savedJob || []}
				/>
			</div>
		</FileLayout>
	);
};

export default SavedJobPage;
