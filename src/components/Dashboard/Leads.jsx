"use client";
import {
	DownloadOutlined,
	EnvironmentOutlined,
	MailOutlined,
	PhoneOutlined,
} from "@ant-design/icons";
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
import { avtRandom } from "src/constants/avatar";
import { errorMessage } from "src/constants/common";
import { getDate } from "src/helper/format";

const columns = [
	{
		title: "Họ tên",
		dataIndex: "name",
		key: "name",
		render: (value) => (
			<div className="flex gap-2 items-center">
				<Image
					preview={false}
					alt=""
					width={28}
					height={28}
					src={avtRandom}
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
	},
	{
		title: "Giới tính",
		dataIndex: "gender",
		key: "gender",
		render: (value) => value?.name,
	},
	{
		title: "Số điện thoại",
		dataIndex: "phone",
		key: "phone",
		render: (value) => (
			<div className="flex gap-2">
				<PhoneOutlined />
				<div>{value}</div>
			</div>
		),
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
		render: (value) => (
			<div className="flex gap-2">
				<MailOutlined />
				<div>{value}</div>
			</div>
		),
	},
	{
		title: "Tỉnh/TP",
		dataIndex: "province",
		key: "province",
		render: (value) => value?.name,
	},
	{
		title: "Quận/Huyện",
		dataIndex: "district",
		key: "district",
		render: (value) => value?.name,
	},
	{
		title: "Xã/Phường",
		dataIndex: "ward",
		key: "ward",
		render: (value) => value?.name,
	},
	{
		title: "Đường/Số nhà",
		dataIndex: "street",
		key: "street",
	},
	{
		title: "Địa chỉ",
		dataIndex: "address",
		key: "address",
		render: (value) => (
			<div className="flex gap-2">
				<EnvironmentOutlined />
				<div>{value}</div>
			</div>
		),
	},
	{
		title: "Thông tin khác",
		dataIndex: "otherInfo",
		key: "otherInfo",
	},
	{
		title: "Ngày mua",
		dataIndex: "createdDate",
		key: "createdDate",
		render: (value) => getDate(value),
	},
];

const Leads = () => {
	const [filter, setFilter] = useState({ objectType: 1 });
	const dispatch = useAppDispatch();
	const [data, setData] = useState();

	useEffect(() => {
		const getData = async () => {
			dispatch(updateLoading(true));
			const res = await httpAuthGet({
				endpoint: apiCompanyGetBoughtObject,
				params: filter,
			});
			if (res?.status === 200) {
				const convertData = res?.data?.data?.map((item) => ({
					createdDate: item?.createdDate,
					...item?.customer,
					id: item?.id,
					customerId: item?.customerId,
				}));
				setData(convertData);
			} else {
				toast.error(errorMessage);
			}
			dispatch(updateLoading(false));
		};
		getData();
	}, [dispatch]);

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
					<Button
						type="primary"
						icon={<DownloadOutlined />}
						onClick={exportCustomer}
					>
						Xuất dữ liệu
					</Button>
				</div>
			</div>
			<Table scroll={{ x: 1500 }} columns={columns} dataSource={data} />
			<div className="mt-1 rounded-b-lg bg-white">
				{/* <Pagination
						count={Math.ceil(count / pageSize)}
						page={searchParams.get("page") || 1}
						onChange={(e, page) => onChangePage(page)}
						className="flex justify-center"
					/> */}
			</div>
		</div>
	);
};

export default Leads;
