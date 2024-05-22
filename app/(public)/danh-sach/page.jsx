"use client";
import { Image, Spin } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCustomer } from "src/apis/apiEndpoint";
import Category from "src/components/PotentialClients/Category";
import SearchBox from "src/components/PotentialClients/SearchBox";
import { convertSearchParamsToObject } from "src/helper/format";

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
				<Image
					src={"https://placehold.co/1170x220.png"}
					width="auto"
					height={220}
					alt=""
					preview={false}
				/>
				<div className="mt-5">
					<SearchBox />
				</div>
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
