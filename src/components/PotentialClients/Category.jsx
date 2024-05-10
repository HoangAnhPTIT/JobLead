"use client";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
	CalendarMonth,
	Call,
	Email,
	FmdGood,
	Transgender,
} from "@mui/icons-material";
import { Pagination } from "@mui/material";
import { Button, Col, Image, Modal, Row, Spin } from "antd";
import { isEmpty } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet, httpAuthPost } from "src/apis/apiAuthCaller";
import { apiFilterCategory, apiPotentialCustomer } from "src/apis/apiEndpoint";
import Nodata from "src/commons/Nodata";
import { errorMessage } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { convertSearchParamsToObject, genUrlParams } from "src/helper/format";
import { Pagination as SwiperPagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const categoryIdDefault = "00000000-0000-0000-0000-000000000000";
const infoDetail = (info) => info || "__";

const ItemInfo = ({ label, value }) => {
	return (
		<Row gutter={16} className="my-1 border-b">
			<Col span={8}>{label}</Col>
			<Col span={16}>
				<span className="text-base">{infoDetail(value)}</span>
			</Col>
		</Row>
	);
};

const Category = ({ title, list, count, reloadList, pageSize }) => {
	const [modal, contextHolder] = Modal.useModal();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const [itemSelected, setItemSelected] = useState();
	const [categories, setCategories] = useState();
	const [loading, setLoading] = useState(false);

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
		reloadList();
	};

	const onSelectCategory = (id) => {
		router.push(`${routeMap.potentialClients}?categoryId=${id}`);
	};

	const onBuyInfo = async () => {
		setLoading(true);
		try {
			const response = await httpAuthPost({
				endpoint: apiPotentialCustomer,
				data: { CustomerId: itemSelected?.id },
			});
			if (response?.status === 200) {
				toast.success("Mua thông tin thành công");
				setItemSelected(response?.data);
				getData();
			} else {
				toast.error(response?.message);
			}
		} catch {
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const onConfirmBuy = () => {
		modal.confirm({
			title: "Xác nhận mua thông tin",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn đồng ý sử dụng điểm để xem thông tin chi tiết khách hàng?",
			okText: "Đồng ý",
			cancelText: "Hủy",
			onOk: onBuyInfo,
		});
	};

	useEffect(() => {
		getData();
	}, [searchParams]);

	const ItemInfoList = ({ icon, text }) => {
		return (
			<div className="flex items-center mt-4 text-gray-700">
				{icon}
				<p className="px-2 text-sm three-dot">{infoDetail(text)}</p>
			</div>
		);
	};

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
								<Col span={4} key={i}>
									<div
										className="flex gap-3 cursor-pointer"
										onClick={() => onSelectItem(item)}
									>
										<div className="max-w-sm bg-white border rounded-lg overflow-hidden mb-4 flex-1">
											<div className="py-4 px-6">
												<h1 className="text-2xl font-semibold text-gray-800 three-dot">
													{infoDetail(item?.name)}
												</h1>
												<ItemInfoList
													icon={<Transgender />}
													text={item?.gender?.name}
												/>
												<ItemInfoList
													icon={<CalendarMonth />}
													text={item?.age}
												/>
												<ItemInfoList icon={<Call />} text={item?.phone} />
												<ItemInfoList icon={<Email />} text={item?.email} />
												<ItemInfoList
													icon={<FmdGood />}
													text={item?.province?.name}
												/>
											</div>
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
							count={Math.ceil(count / pageSize)}
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
					footer={
						<Button type="primary" onClick={onCloseModal}>
							OK
						</Button>
					}
				>
					<Spin spinning={loading}>
						<div className="">
							<ItemInfo label="Họ tên" value={itemSelected?.name} />
							<ItemInfo label="Tuổi" value={itemSelected?.age} />
							<ItemInfo label="Giới tính" value={itemSelected?.gender?.name} />
							<ItemInfo label="Số điện thoại" value={itemSelected?.phone} />
							<ItemInfo label="Email" value={itemSelected?.email} />
							<ItemInfo label="Địa chỉ" value={itemSelected?.address} />
							<ItemInfo label="Tỉnh/TP" value={itemSelected?.province?.name} />
							<ItemInfo
								label="Quận/Huyện"
								value={itemSelected?.district?.name}
							/>
							<ItemInfo label="Xã/Phường" value={itemSelected?.ward?.name} />
							<ItemInfo label="Đường/Số nhà" value={itemSelected?.street} />
							{/* <ItemInfo label="MetaData" value={""} /> */}
							<ItemInfo label="Thông tin khác" />
						</div>
						{!itemSelected?.isViewed && (
							<div className="text-center mt-5">
								<Button danger onClick={onConfirmBuy}>
									Xem thông tin chi tiết
								</Button>
							</div>
						)}
						{contextHolder}
					</Spin>
				</Modal>
			</div>
		</div>
	);
};

export default Category;
