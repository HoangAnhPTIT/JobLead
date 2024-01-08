"use client";
import { ApartmentOutlined } from "@mui/icons-material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useEffect, useState } from "react";
import { httpGet } from "src/apis/apiCaller";
import { apiTopCompany } from "src/apis/apiEndpoint";
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
		title: "Công ty hàng đầu",
	},
];

const TopCompaniePage = () => {
	const dispatch = useAppDispatch();
	const [companies, setCompanies] = useState();

	const data = {
		title: "Các công ty hàng đầu",
		icon: <ApartmentOutlined />,
		companies,
		breadcrum,
	};

	useEffect(() => {
		const getData = async () => {
			dispatch(updateLoading(true));
			try {
				const res = await httpGet(apiTopCompany);
				setCompanies(res?.data);
			} catch (error) {
				console.error(error);
			} finally {
				dispatch(updateLoading(false));
			}
		};
		getData();
	}, []);

	return <LayoutCompanyType data={data} />;
};

export default TopCompaniePage;
