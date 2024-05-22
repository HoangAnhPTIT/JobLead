import {
	EnvironmentOutlined,
	ExclamationCircleOutlined,
	EyeOutlined,
	MailOutlined,
	PhoneOutlined,
} from "@ant-design/icons";
import { Pagination } from "@mui/material";
import { Button, Image, Modal, Spin, Table } from "antd";
import { isEmpty } from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet, httpAuthPost } from "src/apis/apiAuthCaller";
import {
	apiCompanyBuyObject,
	apiCompanyPrebuy,
	apiCustomer,
} from "src/apis/apiEndpoint";
import { avt } from "src/constants/avatar";
import { BUY_MODE, BUY_OBJECT_TYPE } from "src/constants/buyObjectType";
import { categoryIdDefault, errorMessage } from "src/constants/common";
import { POINT_DEFINE } from "src/constants/pointDefine";
import { convertSearchParamsToObject, genUrlParams } from "src/helper/format";

const pageSize = 10;

const LeadTable = ({ setItemSelected, triggerReload }) => {
	const [modal, contextHolder] = Modal.useModal();
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [loading, setLoading] = useState(false);
	const [customers, setCustomers] = useState();
	const [count, setCount] = useState(0);

	const onChangePage = async (page) => {
		const searchParamsObject =
			searchParams.toString() && convertSearchParamsToObject(searchParams);
		router.push(genUrlParams(pathname, { ...searchParamsObject, page }));
	};

	const columns = useMemo(
		() => [
			{
				key: "name",
				dataIndex: "",
				title: "Họ tên",
				ellipsis: true,
				width: 250,
				render: (record) => (
					<div className="flex gap-2 items-center">
						<Image
							preview={false}
							alt=""
							width={28}
							height={28}
							src={record?.avt}
							className="rounded-full"
						/>
						<div>{record?.name}</div>
					</div>
				),
			},
			{
				key: "age",
				dataIndex: "age",
				title: "Tuổi",
				ellipsis: true,
				width: 80,
				render: (value) => <>{value}</>,
			},
			{
				key: "gender",
				dataIndex: "gender",
				title: "Giới tính",
				ellipsis: true,
				width: 100,
				render: (value) => <>{value?.name}</>,
			},
			{
				key: "phone",
				dataIndex: "phone",
				title: "Số điện thoại",
				ellipsis: true,
				render: (value) => (
					<div className="flex gap-2">
						<PhoneOutlined className="text-base" />
						<div>{value}</div>
					</div>
				),
			},
			{
				key: "email",
				dataIndex: "email",
				title: "Email",
				ellipsis: true,
				render: (value) => (
					<div className="flex gap-2">
						<MailOutlined className="text-base" />
						<div>{value}</div>
					</div>
				),
			},
			{
				key: "address",
				dataIndex: "address",
				title: "Địa chỉ",
				ellipsis: true,
				render: (value) => (
					<div className="flex gap-2">
						<EnvironmentOutlined className="text-base" />
						<div>{value}</div>
					</div>
				),
			},
			{
				key: "province",
				dataIndex: "province",
				title: "Tỉnh/TP",
				render: (value) => <>{value?.name}</>,
			},
			{
				key: "district",
				dataIndex: "district",
				title: "Quận/Huyện",
				ellipsis: true,
				render: (value) => <>{value?.name}</>,
			},
			{
				key: "ward",
				dataIndex: "ward",
				title: "Xã/Phường",
				ellipsis: true,
				render: (value) => <>{value?.name}</>,
			},
			{
				key: "street",
				dataIndex: "street",
				title: "Đường/Số nhà",
				ellipsis: true,
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
					<div className="flex justify-center">
						<div
							className="cursor-pointer rounded bg-viewBg text-view px-1.5 py-0.5 hover:text-white hover:bg-view w-min"
							onClick={() => setItemSelected(record)}
						>
							<EyeOutlined />
						</div>
					</div>
				),
			},
		],
		[]
	);
	const data = useMemo(
		() =>
			customers?.map((item) => ({
				...item,
				avt: avt[Math.floor(Math.random() * avt.length)],
			})),
		[customers]
	);

	const getData = useCallback(async () => {
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
	}, [searchParams]);

	const onBuyCustomers = async () => {
		setLoading(true);
		try {
			const response = await httpAuthPost({
				endpoint: apiCompanyBuyObject,
				data: {
					objectIds: selectedRowKeys,
					objectType: BUY_OBJECT_TYPE.CUSTOMER,
					buyMode: BUY_MODE.BUY_MULTIPLE,
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

	const onConfirmBuy = async () => {
		try {
			const response = await httpAuthPost({
				endpoint: apiCompanyPrebuy,
				data: {
					objectIds: selectedRowKeys,
					objectType: BUY_OBJECT_TYPE.CUSTOMER,
					buyMode: BUY_MODE.BUY_MULTIPLE,
				},
			});
			modal.confirm({
				title: "Xác nhận mua thông tin",
				icon: <ExclamationCircleOutlined />,
				content: (
					<span>
						Bạn đồng ý sử dụng
						<strong className="mx-2 text-primary">
							{response?.data?.points || 0} point(s)
						</strong>
						để xem thông tin chi tiết các khách hàng này?
					</span>
				),
				okText: "Đồng ý",
				cancelText: "Hủy",
				onOk: onBuyCustomers,
			});
		} catch (error) {
			toast.error(errorMessage);
		}
	};

	const onConfirmBuyCategory = async () => {
		try {
			const response = await httpAuthPost({
				endpoint: apiCompanyPrebuy,
				data: {
					objectType: BUY_OBJECT_TYPE.CUSTOMER,
					categoryId: searchParams.get("categoryId") || categoryIdDefault,
					buyMode: BUY_MODE.BUY_BY_CATEGORY_ID,
				},
			});
			modal.confirm({
				title: "Xác nhận mua thông tin",
				icon: <ExclamationCircleOutlined />,
				content: (
					<span>
						Bạn đồng ý sử dụng
						<strong className="mx-2 text-primary">
							{response?.data?.points || 0} point(s)
						</strong>
						để xem thông tin chi tiết bộ khách hàng này?
					</span>
				),
				okText: "Đồng ý",
				cancelText: "Hủy",
				onOk: onBuyCategoryCustomers,
			});
		} catch (error) {
			//
			toast.error(errorMessage);
		}
	};
	const onBuyCategoryCustomers = async () => {
		setLoading(true);
		try {
			const response = await httpAuthPost({
				endpoint: apiCompanyBuyObject,
				data: {
					objectType: BUY_OBJECT_TYPE.CUSTOMER,
					categoryId: searchParams.get("categoryId") || categoryIdDefault,
					buyMode: BUY_MODE.BUY_BY_CATEGORY_ID,
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

	useEffect(() => {
		getData();
	}, [getData, searchParams, triggerReload]);

	return (
		<Spin spinning={loading}>
			<div className="p-3 font-semibold text-base border-b rounded-t-lg bg-white">
				<div className="flex justify-between items-center">
					<p className="border-l-4 border-primary pl-2">Leads</p>
					<div className="flex gap-3">
						<Button
							className="cursor-pointer pr-6"
							disabled={isEmpty(selectedRowKeys)}
							onClick={onConfirmBuy}
						>
							Mua tất cả
						</Button>
						<Button className="cursor-pointer" onClick={onConfirmBuyCategory}>
							Mua bộ khách hàng này
						</Button>
					</div>
				</div>
			</div>
			<Table
				columns={columns}
				dataSource={data}
				scroll={{ x: 2000 }}
				pagination={false}
				rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
				rowKey="id"
			/>
			<div className="mt-1 py-1 rounded-b-lg bg-white">
				<Pagination
					count={Math.ceil(count / pageSize)}
					page={Number(searchParams.get("page")) || 1}
					onChange={(e, page) => onChangePage(page)}
					className="flex justify-center"
				/>
			</div>
			{contextHolder}
		</Spin>
	);
};

export default LeadTable;
