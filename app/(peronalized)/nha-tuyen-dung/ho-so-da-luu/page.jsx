"use client";
import { DeleteOutline } from "@mui/icons-material";
import { Button, Col, DatePicker, Form, Image, Input, Row, Table } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthDelete, httpAuthGet } from "src/apis/apiAuthCaller";
import {
	apiCompanyApplicantSave,
	apiCompanyApplicantSaved,
} from "src/apis/apiEndpoint";
import PopconfirmDelete from "src/commons/PopconfirmDelete";
import EmployerBanner from "src/components/Employer/EmployerBanner";
import EmployerLayout from "src/components/Employer/EmployerLayout";
import { errorMessage, imageDefault } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { getDate } from "src/helper/format";

const FileSavedPage = () => {
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const [data, setData] = useState();
	const [filter, setFilter] = useState({});

	const getData = async () => {
		dispatch(updateLoading(true));
		const res = await httpAuthGet({
			endpoint: apiCompanyApplicantSaved,
			params: filter,
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
					endpoint: `${apiCompanyApplicantSaved}/${id}`,
				});
				if (res?.status === 200) {
					toast.success("Bỏ lưu hồ sơ thành công");
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

	const columns = [
		{
			title: "Họ tên",
			key: "name",
			render: (record) => (
				<Link
					href={`${routeMap.candidate}${routeMap.detail}/${record?.candidateId}`}
				>
					<div className="flex gap-3">
						<Image
							preview={false}
							src={record?.avatar || imageDefault}
							width={40}
							height={40}
							alt={record?.fullName}
							className="object-contain rounded-full border"
						/>
						<div>
							<p className="text-primary text-base">{record.fullName}</p>
							<p className="text-33">{record.workTitle}</p>
						</div>
					</div>
				</Link>
			),
		},
		{
			title: "Ngày lưu",
			dataIndex: "savedDate",
			key: "savedDate",
			render: (value) => getDate(value),
		},
		{
			title: "Hành động",
			key: "action",
			width: 150,
			render: (value) => (
				<div className="text-center">
					<PopconfirmDelete onDelete={() => onUnsave(value?.id)}>
						<DeleteOutline
							fontSize="small"
							className="text-secondary cursor-pointer"
						/>
					</PopconfirmDelete>
				</div>
			),
		},
	];

	useEffect(() => {
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
								<Input
									placeholder="Tên ứng viên, tiêu đề hồ sơ"
									size="large"
									allowClear
								/>
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
				<p className="text-lg my-5">Danh sách hồ sơ đã xem thông tin</p>
				<Table bordered size="small" columns={columns} dataSource={data} />
			</div>
		</EmployerLayout>
	);
};

export default FileSavedPage;
