"use client";
import Category from "@/src/commons/Category";
import { ApartmentOutlined } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { httpGet } from "src/apis/apiCaller";
import { apiCompanyFilter } from "src/apis/apiEndpoint";
import routeMap from "src/constants/routeMap";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CompanyItem from "./CompanyItem";

const TopCompanies = () => {
	const [companyList, setCompanyList] = useState();
	const searchParams = useSearchParams();
	const q = searchParams.get("q") || "";

	useEffect(() => {
		const getCompanies = async () => {
			const response = await httpGet(apiCompanyFilter, {
				type: "top",
				q,
				page: 1,
				size: 20,
			});
			setCompanyList(response?.data?.companies);
		};
		getCompanies();
	}, [q]);

	return (
		<Category
			icon={<ApartmentOutlined />}
			title="Các công ty hàng đầu"
			extra={`${routeMap.company}/cong-ty-hang-dau`}
			contentClass="px-0"
		>
			<Swiper
				modules={[Pagination]}
				spaceBetween={20}
				slidesPerView={3}
				slidesPerGroup={3}
				pagination={{ clickable: true }}
				loop={true}
				autoplay={{ delay: 5000 }}
				className="pt-2 pb-9 px-5"
			>
				{companyList &&
					companyList?.map((item, i) => (
						<SwiperSlide key={i}>
							<CompanyItem item={item} />
						</SwiperSlide>
					))}
			</Swiper>
		</Category>
	);
};

export default TopCompanies;
