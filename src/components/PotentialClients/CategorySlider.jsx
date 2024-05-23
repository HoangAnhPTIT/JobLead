import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination as SwiperPagination } from "swiper/modules";
import { useRouter, useSearchParams } from "next/navigation";
import routeMap from "src/constants/routeMap";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiFilterCategory } from "src/apis/apiEndpoint";
import { Card, Image } from "antd";
import { categoryIdDefault } from "src/constants/common";

const CategorySlider = () => {
	const [categories, setCategories] = useState();
	const router = useRouter();
	const searchParams = useSearchParams();

	const onSelectCategory = (id) => {
		router.push(`${routeMap.potentialClients}?categoryId=${id}`);
	};

	useEffect(() => {
		const getData = async () => {
			const categoryResponse = await httpAuthGet({
				endpoint: apiFilterCategory,
				params: {
					parentId: searchParams.get("categoryId") || categoryIdDefault,
					size: 12,
					page: searchParams.get("page") || 1,
				},
			});
			setCategories(categoryResponse?.data);
		};
		getData();
	}, [searchParams]);

	return (
		!isEmpty(categories) && (
			<Card title="Phân loại" className="!my-5" bodyStyle={{ padding: 10 }}>
				<Swiper
					modules={[SwiperPagination]}
					slidesPerView={5}
					slidesPerGroup={5}
					breakpoints={{
						640: {
							spaceBetween: 20,
						},
						768: {
							spaceBetween: 40,
						},
						1024: {
							spaceBetween: 50,
						},
					}}
					pagination={{ clickable: true }}
					className="pb-9"
				>
					{categories?.map((item, i) => (
						<SwiperSlide key={i}>
							<div
								className="image-shadow p-2 shadow rounded relative cursor-pointer"
								onClick={() => onSelectCategory(item?.id)}
							>
								<Image
									src={item?.thumbnail}
									width="auto"
									height={200}
									alt={item?.name || ""}
									preview={false}
									className="object-cover"
								/>
								<div className="text-center text-sm mt-2 text-primary absolute bottom-0 left-0 bg-opacity-75 bg-gray-50 w-full py-2">
									<strong className="text-base">{item?.name}</strong>
									<p>Phân loại con: {item?.numOfChild}</p>
									<p>Số khách hàng: {item?.numOfCustomer}</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</Card>
		)
	);
};

export default CategorySlider;
