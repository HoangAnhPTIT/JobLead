"use client";
import { DownloadOutlined } from "@ant-design/icons";
import { Table, Button } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiCaller, httpAuthGet, httpAuthPost } from "src/apis/apiAuthCaller";
import { apiCompanyExportCustomer, apiPotentialCustomer } from "src/apis/apiEndpoint";
import EmployerBanner from "src/components/Employer/EmployerBanner";
import EmployerLayout from "src/components/Employer/EmployerLayout";
import { errorMessage } from "src/constants/common";
import { getDate } from "src/helper/format";

const columns = [
	{
		title: "Họ tên",
		dataIndex: "name",
		key: "name",
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
	},
	{
		title: "Email",
		dataIndex: "email",
		key: "email",
	},
	{
		title: "Địa chỉ",
		dataIndex: "address",
		key: "address",
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
		title: "MetaData",
		dataIndex: "metaData",
		key: "metaData",
		render: () => "",
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

const ViewedCandidatePage = () => {
	const dispatch = useAppDispatch();
	const [data, setData] = useState();

	useEffect(() => {
		const getData = async () => {
			dispatch(updateLoading(true));
			const res = await httpAuthGet({
				endpoint: apiPotentialCustomer,
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
			const data = await httpAuthPost({ endpoint: apiCompanyExportCustomer, responseType: "blob" })
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
		}

		handler()
	}

	return (
		<EmployerLayout>
			<div>
				<EmployerBanner />
			</div>
			<div>
				<div className="flex justify-between items-center">
					<p className="text-lg my-5">
						Danh sách thông tin khách hàng tiềm năng đã mua
					</p>
					<Button type="primary" icon={<DownloadOutlined />} onClick={exportCustomer}>Xuất dữ liệu</Button>
				</div>
				<Table
					size="small"
					scroll={{ x: 1500 }}
					bordered
					columns={columns}
					dataSource={data}
				/>
			</div>
		</EmployerLayout>
	);
};

export default ViewedCandidatePage;
