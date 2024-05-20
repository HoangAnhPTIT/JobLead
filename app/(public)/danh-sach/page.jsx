"use client";
import { Spin } from "antd";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCustomer } from "src/apis/apiEndpoint";
import Breadcrumb from "src/commons/Breadcrumb";
import Category from "src/components/PotentialClients/Category";
import SearchBox from "src/components/PotentialClients/SearchBox";
import { convertSearchParamsToObject } from "src/helper/format";

const breadcrum = [
	{
		title: "Trang chủ",
		href: "/",
	},
	{
		title: "Khách hàng tiềm năng",
	},
];

const pageSize = 30;

const PotentialClients = () => {
	const searchParams = useSearchParams();
	const [customers, setCustomers] = useState();
	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [toggleReload, setToggleReload] = useState(false);
	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				const searchParamValues =
					searchParams.toString() && convertSearchParamsToObject(searchParams);
				const response = await httpAuthGet({
					endpoint: apiCustomer,
					params: {
						...searchParamValues,
						size: pageSize,
						page: searchParamValues?.page || 1,
					},
				});
				setCustomers(response?.data?.customers);
				setCount(response?.data?.count);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, [searchParams, toggleReload]);

	return (
		<Spin spinning={loading}>
			<div>
				<SearchBox />
				<Breadcrumb extendClass={"ml-1"} items={breadcrum} />
				<Category
					list={customers}
					count={count}
					pageSize={pageSize}
					reloadList={() => setToggleReload(!toggleReload)}
				/>
			</div>
		</Spin>
	);
};

export default PotentialClients;
