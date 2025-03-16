"use client";
import {
	DownloadOutlined,
	EnvironmentOutlined,
	EyeOutlined,
	MailOutlined,
	PhoneOutlined,
} from "@ant-design/icons";
import { Pagination } from "@mui/material";
import { Button, Image, Table } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet, httpAuthPost } from "src/apis/apiAuthCaller";
import {
	apiCompanyExportCustomer,
	apiCompanyExportLeads,
	apiCompanyGetLeads,
} from "src/apis/apiEndpoint";
import { errorMessage } from "src/constants/common";

const pageSize = 10;

const Leads = () => {
	const dispatch = useAppDispatch();
	const [data, setData] = useState();
	const [count, setCount] = useState(0);
	const [page, setPage] = useState(1);


	const columns = useMemo(
		() => [
			{
				key: "name",
				dataIndex: "",
				title: "Họ tên",
				ellipsis: true,
				width: 250,
				render: (record) => (
					<div className="flex gap-2 items-center">
						<Image
							preview={false}
							alt=""
							width={28}
							height={28}
							src={record?.avt}
							className="rounded-full"
						/>
						<div>{record?.name}</div>
					</div>
				),
			},
			{
				key: "age",
				dataIndex: "age",
				title: "Tuổi",
				ellipsis: true,
				width: 80,
				render: (value) => <>{value}</>,
			},
			{
				key: "gender",
				dataIndex: "gender",
				title: "Giới tính",
				ellipsis: true,
				width: 100,
				render: (value) => <>{value?.name}</>,
			},
			{
				key: "phone",
				dataIndex: "phone",
				title: "Số điện thoại",
				ellipsis: true,
				render: (value) => (
					<div className="flex gap-2">
						<PhoneOutlined className="text-base" />
						<div>{value}</div>
					</div>
				),
			},
			{
				key: "email",
				dataIndex: "email",
				title: "Email",
				ellipsis: true,
				render: (value) => (
					<div className="flex gap-2">
						<MailOutlined className="text-base" />
						<div>{value}</div>
					</div>
				),
			},
			{
				key: "address",
				dataIndex: "address",
				title: "Địa chỉ",
				ellipsis: true,
				render: (value) => (
					<div className="flex gap-2">
						<EnvironmentOutlined className="text-base" />
						<div>{value}</div>
					</div>
				),
			},
			{
				key: "province",
				dataIndex: "province",
				title: "Tỉnh/TP",
				render: (value) => <>{value?.name}</>,
			},
			{
				key: "district",
				dataIndex: "district",
				title: "Quận/Huyện",
				ellipsis: true,
				render: (value) => <>{value?.name}</>,
			},
			{
				key: "ward",
				dataIndex: "ward",
				title: "Xã/Phường",
				ellipsis: true,
				render: (value) => <>{value?.name}</>,
			},
			{
				key: "street",
				dataIndex: "street",
				title: "Đường/Số nhà",
				ellipsis: true,
				render: (value) => <>{value}</>,
			},
			{
				key: "otherInfo",
				dataIndex: "otherInfo",
				title: "Thông tin khác",
				render: (value) => <>{value}</>,
			},
			// {
			// 	key: "action",
			// 	title: "Hành động",
			// 	fixed: "right",
			// 	width: 110,
			// 	render: (record) => (
			// 		<div className="flex justify-center">
			// 			<div
			// 				className="cursor-pointer rounded bg-viewBg text-view px-1.5 py-0.5 hover:text-white hover:bg-view w-min"
			// 				// onClick={() => setItemSelected(record)}
			// 			>
			// 				<EyeOutlined />
			// 			</div>
			// 		</div>
			// 	),
			// },
		],
		[]
	);

	useEffect(() => {
		const getData = async () => {
			dispatch(updateLoading(true));
			const res = await httpAuthGet({
				endpoint: apiCompanyGetLeads,
			});
			if (res?.status === 200) {
				setData(res?.data?.items);
				setCount(res?.data?.totalCount);
			} else {
				toast.error(errorMessage);
			}
			dispatch(updateLoading(false));
		};
		getData();
	}, [dispatch, page]);

	const exportCustomer = () => {
		const handler = async () => {
			const data = await httpAuthGet({
				endpoint: apiCompanyExportLeads,
				responseType: "blob",
			});
			console.log(data)
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
				scroll={{ x: 3000 }}
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
