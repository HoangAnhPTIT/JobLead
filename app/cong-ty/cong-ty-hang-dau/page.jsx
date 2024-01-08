"use client";
import { ApartmentOutlined } from "@mui/icons-material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useEffect, useState } from "react";
import { httpGet } from "src/apis/apiCaller";
import { apiTopCompany } from "src/apis/apiEndpoint";
import LayoutCompanyType from "src/components/Companies/CompanyType/LayoutCompanyType";

const TopCompaniePage = () => {
	const dispatch = useAppDispatch();
	const [companies, setCompanies] = useState();

	const data = {
		title: "Các công ty hàng đầu",
		icon: <ApartmentOutlined />,
		companies,
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
