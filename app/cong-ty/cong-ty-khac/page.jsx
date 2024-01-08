"use client";
import { WorkOutline } from "@mui/icons-material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { httpGet } from "src/apis/apiCaller";
import { apiOtherCompany } from "src/apis/apiEndpoint";
import LayoutCompanyType from "src/components/Companies/CompanyType/LayoutCompanyType";
import routeMap from "src/constants/routeMap";

const breadcrum = [
	{
		title: "Trang chủ",
		href: "/",
	},
	{
		title: "Công ty",
		href: routeMap.company,
	},
	{
		title: "Công ty khác",
	},
];

const OtherCompanyPage = () => {
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();
	const [companies, setCompanies] = useState();
	const page = searchParams.get("page") || 1;

	const data = {
		title: "Các công ty khác",
		icon: <WorkOutline />,
		companies: companies?.companies,
		breadcrum,
		count: companies?.count || null,
	};

	useEffect(() => {
		const getData = async () => {
			dispatch(updateLoading(true));
			try {
				const res = await httpGet(apiOtherCompany, {
					page: page,
					size: 12,
				});
				setCompanies(res?.data);
			} catch (error) {
				console.error(error);
			} finally {
				dispatch(updateLoading(false));
			}
		};
		getData();
	}, [page]);

	return <LayoutCompanyType data={data} />;
};

export default OtherCompanyPage;
