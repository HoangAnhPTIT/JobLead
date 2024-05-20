"use client";
import {
	EditOutlined,
	EnvironmentOutlined,
	ExclamationCircleOutlined,
	EyeFilled,
	EyeOutlined,
	MailOutlined,
	PhoneOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Pagination } from "@mui/material";
import { Button, Col, Image, Modal, Row, Spin, Table } from "antd";
import { isEmpty } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet, httpAuthPost } from "src/apis/apiAuthCaller";
import { apiCompanyBuyObject, apiFilterCategory } from "src/apis/apiEndpoint";
import { BUY_OBJECT_TYPE } from "src/constants/buyObjectType";
import { errorMessage } from "src/constants/common";
import { POINT_DEFINE } from "src/constants/pointDefine";
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

const Category = ({ list, count, reloadList, pageSize }) => {
	const [modal, contextHolder] = Modal.useModal();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const [itemSelected, setItemSelected] = useState();
	const [categories, setCategories] = useState();
	const [loading, setLoading] = useState(false);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
				endpoint: apiCompanyBuyObject,
				data: {
					objectId: itemSelected?.id,
					objectType: BUY_OBJECT_TYPE.CUSTOMER,
				},
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
			content: `Bạn đồng ý sử dụng ${POINT_DEFINE.buyCustomer} điểm để xem thông tin chi tiết khách hàng?`,
			okText: "Đồng ý",
			cancelText: "Hủy",
			onOk: onBuyInfo,
		});
	};

	const columns = useMemo(
		() => [
			{
				key: "name",
				dataIndex: "name",
				title: "Họ tên",
				render: (value) => (
					<>
						<UserOutlined /> {value}
					</>
				),
			},
			{
				key: "age",
				dataIndex: "age",
				title: "Tuổi",
				render: (value) => <>{value}</>,
			},
			{
				key: "gender",
				dataIndex: "gender",
				title: "Giới tính",
				render: (value) => <>{value.name}</>,
			},
			{
				key: "phone",
				dataIndex: "phone",
				title: "Só điện thoại",
				render: (value) => (
					<>
						<PhoneOutlined /> {value}
					</>
				),
			},
			{
				key: "email",
				dataIndex: "email",
				title: "Email",
				render: (value) => (
					<>
						<MailOutlined /> {value}
					</>
				),
			},
			{
				key: "address",
				dataIndex: "address",
				title: "Địa chỉ",
				render: (value) => (
					<>
						<EnvironmentOutlined /> {value}
					</>
				),
			},
			{
				key: "province",
				dataIndex: "province",
				title: "Tỉnh/TP",
				render: (value) => <>{value.name}</>,
			},
			{
				key: "district",
				dataIndex: "district",
				title: "Quận/Huyện",
				render: (value) => <>{value.name}</>,
			},
			{
				key: "ward",
				dataIndex: "ward",
				title: "Xã/Phường",
				render: (value) => <>{value.name}</>,
			},
			{
				key: "street",
				dataIndex: "street",
				title: "Đường/Số nhà",
				render: (value) => <>{value}</>,
			},
			{
				key: "otherInfo",
				dataIndex: "otherInfo",
				title: "Thông tin khác",
				render: (value) => <>{value}</>,
			},
			{
				key: "action",
				title: "Hành động",
				fixed: "right",
				width: 110,
				render: (record) => (
					<div
						className="cursor-pointer text-primary hover:text-secondary text-center"
						onClick={() => onSelectItem(record)}
					>
						<EyeOutlined /> Xem
					</div>
				),
			},
		],
		[]
	);

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
				</div>
			)}
			<div className="border p-5 pt-2">
				<div className="px-3 py-2 font-semibold text-lg mb-2">
					<div className="flex justify-between">
						<p>Danh sách khách hàng tiềm năng</p>
						<div className="flex gap-3">
							<Button className="cursor-pointer pr-6">Mua tất cả</Button>
							<Button className="cursor-pointer">Mua bộ khách hàng này</Button>
						</div>
					</div>
				</div>
				<Table
					columns={columns}
					dataSource={list}
					scroll={{ x: 2000 }}
					pagination={false}
					bordered
					rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
				/>
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
							<ItemInfo
								label="Thông tin khác"
								value={itemSelected?.otherInfo}
							/>
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
