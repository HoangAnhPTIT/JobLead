"use client";
import { UserOutlined } from "@ant-design/icons";
import { Pagination } from "@mui/material";
import { Avatar, Button, Col, Image, Modal, Row } from "antd";
import { isEmpty } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiFilterCategory } from "src/apis/apiEndpoint";
import Nodata from "src/commons/Nodata";
import { imageError } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { convertSearchParamsToObject, genUrlParams } from "src/helper/format";
import { Pagination as SwiperPagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const categoryIdDefault = "00000000-0000-0000-0000-000000000000";

const ShowAvatar = ({ src, ...option }) => (
	<Avatar
		icon={src ? <Image src={src} alt="" preview={false} /> : <UserOutlined />}
		shape="circle"
		size={64}
		{...option}
	/>
);

const Category = ({ title, list, count }) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const [itemSelected, setItemSelected] = useState();
	const [categories, setCategories] = useState();

	const onChangePage = async (page) => {
		const searchParamsObject =
			searchParams.toString() && convertSearchParamsToObject(searchParams);
		router.push(genUrlParams(pathname, { ...searchParamsObject, page }));
	};

	const onSelectItem = (item) => {
		setItemSelected(item);
	};

	const onCloseModal = () => {
		setItemSelected(null);
	};

	const onSelectCategory = (id) => {
		router.push(`${routeMap.potentialClients}?categoryId=${id}`);
	};

	useEffect(() => {
		const getData = async () => {
			const categoryResponse = await httpAuthGet({
				endpoint: apiFilterCategory,
				params: {
					parentId: searchParams.get("categoryId") || categoryIdDefault,
				},
			});
			setCategories(categoryResponse?.data?.categories);
		};
		getData();
	}, [searchParams]);

	return (
		<div>
			{!isEmpty(categories) && (
				<div>
					<div className="px-3 py-2 bg-primary text-white font-semibold text-lg">
						Phân loại
					</div>
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
						className="pt-2 pb-9 px-5 border mb-5"
					>
						{categories?.map((item, i) => (
							<SwiperSlide key={i}>
								<div
									className="image-shadow p-2 shadow rounded relative cursor-pointer"
									onClick={() => onSelectCategory(item?.id)}
								>
									<Image
										src={item?.thumbnail}
										width={200}
										height={200}
										alt={item?.name || ""}
										preview={false}
									/>
									<div className="text-center text-sm mt-2 text-primary absolute bottom-0 left-0 bg-gray-50 w-full py-2">
										<strong className="text-base">{item?.name}</strong>
										<p>Phân loại con: {item?.numOfChild}</p>
										<p>Số khách hàng: {item?.numOfCustomer}</p>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			)}
			<div className="">
				<div className="px-3 py-2 bg-primary text-white font-semibold text-lg">
					{title}
				</div>
				<div className="border">
					{count > 0 ? (
						<Row gutter={16} className="p-5">
							{list?.map((item, i) => (
								<Col xs={24} md={12} key={i}>
									<div
										className="p-3 border flex gap-5 cursor-pointer"
										onClick={() => onSelectItem(item)}
									>
										<div>
											<ShowAvatar src={item?.avatar} />
										</div>
										<div>
											<h3 className="font-semibold text-base">{item?.name}</h3>
											<p>
												<strong>Tỉnh/TP:</strong> {item?.province?.name}
											</p>
											<p>
												<strong>Quận/Huyện:</strong> {item?.district?.name}
											</p>
										</div>
									</div>
								</Col>
							))}
						</Row>
					) : (
						<Nodata />
					)}
				</div>
				<div className="mt-5">
					{count > 0 && (
						<Pagination
							count={Math.ceil(count / 20)}
							page={searchParams.get("page") || 1}
							onChange={(e, page) => onChangePage(page)}
							className="flex justify-center"
						/>
					)}
				</div>
				<Modal
					open={Boolean(itemSelected)}
					title="Thông tin chi tiết"
					onCancel={onCloseModal}
					width={700}
				>
					<div className="flex flex-col items-center">
						<ShowAvatar src={itemSelected?.avatar} size={100} />
						<p className="text-lg font-semibold mt-3">{itemSelected?.name}</p>
						<Button type="text">Xem thêm...</Button>
					</div>
				</Modal>
			</div>
		</div>
	);
};

export default Category;
