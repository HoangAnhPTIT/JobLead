"use client";
import { ExclamationCircleOutlined } from "@ant-design/icons";
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

const Category = ({ title, list, count, reloadList }) => {
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
		setCategories(categoryResponse?.data?.categories);
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
		reloadList()
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
										<div class="max-w-sm bg-white border rounded-lg overflow-hidden mb-4 flex-1">
											<div class="py-4 px-6">
												<h1 class="text-2xl font-semibold text-gray-800 three-dot">{infoDetail(item?.name)}</h1>
												{/* <p class="py-2 text-lg text-gray-700 three-dot">{infoDetail(item?.gender?.description)}</p> */}
												<div class="flex items-center mt-4 text-gray-700">
													<svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
														<path d="M239.208 343.937c-17.78 10.103-38.342 15.876-60.255 15.876-21.909 0-42.467-5.771-60.246-15.87C71.544 358.331 42.643 406 32 448h293.912c-10.639-42-39.537-89.683-86.704-104.063zM178.953 120.035c-58.479 0-105.886 47.394-105.886 105.858 0 58.464 47.407 105.857 105.886 105.857s105.886-47.394 105.886-105.857c0-58.464-47.408-105.858-105.886-105.858zm0 186.488c-33.671 0-62.445-22.513-73.997-50.523H252.95c-11.554 28.011-40.326 50.523-73.997 50.523z" /><g><path d="M322.602 384H480c-10.638-42-39.537-81.691-86.703-96.072-17.781 10.104-38.343 15.873-60.256 15.873-14.823 0-29.024-2.654-42.168-7.49-7.445 12.47-16.927 25.592-27.974 34.906C289.245 341.354 309.146 364 322.602 384zM306.545 200h100.493c-11.554 28-40.327 50.293-73.997 50.293-8.875 0-17.404-1.692-25.375-4.51a128.411 128.411 0 0 1-6.52 25.118c10.066 3.174 20.779 4.862 31.895 4.862 58.479 0 105.886-47.41 105.886-105.872 0-58.465-47.407-105.866-105.886-105.866-37.49 0-70.427 19.703-89.243 49.09C275.607 131.383 298.961 163 306.545 200z" /></g>
													</svg>
													<h1 class="px-2 text-sm">{infoDetail(item?.gender?.name)}</h1>
												</div>
												<div class="flex items-center mt-4 text-gray-700">
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
														<path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
														<path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
													</svg>
													<h1 class="px-2 text-sm">{infoDetail(item?.age)}</h1>
												</div>
												<div class="flex items-center mt-4 text-gray-700">
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
														<path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
													</svg>

													<h1 class="px-2 text-sm">{infoDetail(item?.phone)}</h1>
												</div>
												<div class="flex items-center mt-4 text-gray-700">
													<svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
														<path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
													</svg>
													<h1 class="px-2 text-sm">{infoDetail(item?.email)}</h1>
												</div>
												<div class="flex items-center mt-4 text-gray-700">
													<svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
														<path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
													</svg>
													<h1 class="px-2 text-sm">{infoDetail(item?.province?.name)}</h1>
												</div>
											</div>
										</div>
										{/* <div>
											<h3 className="font-semibold text-base underline underline-offset-4">
												{infoDetail(item?.name)}
											</h3>
											<p>
												<span className="mr-2">
													<strong className="mr-2">Tuổi:</strong>
													{infoDetail(item?.age)}
												</span>
											</p>
											<p>
												<span>
													<strong className="mr-2">Giới tính:</strong>
													{infoDetail(item?.gender?.name)}
												</span>
											</p>
											<p>
												<span className="mr-2">
													<strong className="mr-2">Sdt:</strong>
													{infoDetail(item?.phone)}
												</span>
											</p>
											<p>
												<span>
													<strong className="mr-2">Email:</strong>
													{infoDetail(item?.email)}
												</span>
											</p>
											<p>
												<strong className="mr-2">Tỉnh/TP:</strong>
												{infoDetail(item?.province?.name)}
											</p>
										</div> */}
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
							count={Math.ceil(count / 12)}
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
