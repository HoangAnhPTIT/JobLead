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
import { responsiveContent } from "src/constants/css";
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

const PotentialClients = () => {
	const searchParams = useSearchParams();
	const [customers, setCustomers] = useState();
	const [count, setCount] = useState(0);
	const [loading, setLoading] = useState(false);

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
						limit: 20,
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
	}, [searchParams]);

	return (
		<Spin spinning={loading}>
			<div className={classNames(responsiveContent, "py-5")}>
				<SearchBox />
				<Breadcrumb items={breadcrum} />
				<Category title="Khách hàng tiềm năng" list={customers} count={count} />
			</div>
		</Spin>
	);
};

export default PotentialClients;
