"use client";
import { Table } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiPotentialCustomer } from "src/apis/apiEndpoint";
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
		dataIndex: "metaDatas",
		key: "metaDatas",
		render: () => "",
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

	return (
		<EmployerLayout>
			<div>
				<EmployerBanner />
			</div>
			<div>
				<p className="text-lg my-5">
					Danh sách thông tin khách hàng tiềm năng đã mua
				</p>
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
