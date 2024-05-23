"use client";
import {
	DownloadOutlined,
	EnvironmentOutlined,
	MailOutlined,
	PhoneOutlined,
} from "@ant-design/icons";
import { Pagination } from "@mui/material";
import { Button, Image, Table } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet, httpAuthPost } from "src/apis/apiAuthCaller";
import {
	apiCompanyExportCustomer,
	apiCompanyGetBoughtObject,
} from "src/apis/apiEndpoint";
import { avt } from "src/constants/avatar";
import { BUY_OBJECT_TYPE } from "src/constants/buyObjectType";
import { errorMessage } from "src/constants/common";
import { getDate } from "src/helper/format";

const pageSize = 10;

const columns = [
	{
		title: "Họ tên",
		dataIndex: "name",
		key: "name",
		width: 220,
		ellipsis: true,
		render: (value) => (
			<div className="flex gap-2 items-center">
				<Image
					preview={false}
					alt=""
					width={28}
					height={28}
					src={avt[Math.floor(Math.random() * avt.length)]}
					className="rounded-full"
				/>
				<div>{value}</div>
			</div>
		),
	},
	{
		title: "Tuổi",
		dataIndex: "age",
		key: "age",
		ellipsis: true,
		width: 80,
	},
	{
		title: "Giới tính",
		dataIndex: "gender",
		key: "gender",
		ellipsis: true,
		width: 100,
		render: (value) => value?.name,
	},
	{
		title: "Số điện thoại",
		dataIndex: "phone",
		key: "phone",
		ellipsis: true,
		render: (value) => (
			<div className="flex gap-2">
				<PhoneOutlined className="text-base" />
				<div>{value}</div>
			</div>
		),
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
		ellipsis: true,
		render: (value) => (
			<div className="flex gap-2">
				<MailOutlined className="text-base" />
				<div>{value}</div>
			</div>
		),
	},
	{
		title: "Tỉnh/TP",
		dataIndex: "province",
		key: "province",
		ellipsis: true,
		render: (value) => value?.name,
	},
	{
		title: "Quận/Huyện",
		dataIndex: "district",
		key: "district",
		ellipsis: true,
		render: (value) => value?.name,
	},
	{
		title: "Xã/Phường",
		dataIndex: "ward",
		key: "ward",
		ellipsis: true,
		render: (value) => value?.name,
	},
	{
		title: "Đường/Số nhà",
		dataIndex: "street",
		key: "street",
		ellipsis: true,
	},
	{
		title: "Địa chỉ",
		dataIndex: "address",
		key: "address",
		ellipsis: true,
		render: (value) => (
			<div className="flex gap-2">
				<EnvironmentOutlined className="text-base" />
				<div>{value}</div>
			</div>
		),
	},
	{
		title: "Thông tin khác",
		dataIndex: "otherInfo",
		key: "otherInfo",
		ellipsis: true,
	},
	{
		title: "Ngày mua",
		dataIndex: "createdDate",
		key: "createdDate",
		render: (value) => getDate(value),
	},
];

const Leads = () => {
	const dispatch = useAppDispatch();
	const [data, setData] = useState();
	const [count, setCount] = useState(0);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const getData = async () => {
			dispatch(updateLoading(true));
			const res = await httpAuthGet({
				endpoint: apiCompanyGetBoughtObject,
				params: { objectType: BUY_OBJECT_TYPE.CUSTOMER, page, size: pageSize },
			});
			if (res?.status === 200) {
				const convertData = res?.data?.data?.map((item) => ({
					createdDate: item?.createdDate,
					...item?.customer,
					id: item?.id,
					customerId: item?.customerId,
				}));
				setData(convertData);
				setCount(res?.data?.count);
			} else {
				toast.error(errorMessage);
			}
			dispatch(updateLoading(false));
		};
		getData();
	}, [dispatch, page]);

	const exportCustomer = () => {
		const handler = async () => {
			const data = await httpAuthPost({
				endpoint: apiCompanyExportCustomer,
				responseType: "blob",
			});
			const url = window.URL.createObjectURL(
				new Blob([data], {
					type: data?.type,
				})
			);
			const a = document.createElement("a");
			a.style.display = "none";
			a.href = url;
			a.download = "customers.xlsx";
			document.body.appendChild(a);
			a.click();

			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		};

		handler();
	};

	return (
		<div className="">
			<div className="p-3 font-semibold text-base border-b rounded-t-lg bg-white">
				<div className="flex justify-between items-center">
					<p className="border-l-4 border-primary pl-2">Leads</p>
					<Button danger icon={<DownloadOutlined />} onClick={exportCustomer}>
						Xuất dữ liệu
					</Button>
				</div>
			</div>
			<Table
				scroll={{ x: 2000 }}
				columns={columns}
				dataSource={data}
				pagination={false}
			/>
			<div className="mt-1 py-1 rounded-b-lg bg-white">
				<Pagination
					count={Math.ceil(count / pageSize)}
					page={page}
					onChange={(e, page) => setPage(page)}
					className="flex justify-center"
				/>
			</div>
		</div>
	);
};

export default Leads;
