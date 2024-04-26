"use client";
import { Check, DnsOutlined } from "@mui/icons-material";
import { Button, Table, Tag } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCompanyGetServices } from "src/apis/apiEndpoint";
import EmployerBanner from "src/components/Employer/EmployerBanner";
import EmployerLayout from "src/components/Employer/EmployerLayout";
import routeMap from "src/constants/routeMap";
import { SERVICE_POST_JOB, SERVICE_TVCV } from "src/constants/serviceTypes";
import { getDate } from "src/helper/format";

const postJobColunm = [
	{
		title: "Tên dịch vụ",
		key: "service.name",
		render: (record) => {

			return <p>{record.service.name}</p>
		},
	},
	{
		title: "Thời gian bắt đầu",
		key: "startDate",
		render: (record) => {
			const startAt = getDate(dayjs(record.startDate))

			return <p>{startAt}</p>
		},
	},
	{
		title: "Thời gian kết thúc",
		key: "endAt",
		render: (record) => {
			const endAt = getDate(dayjs(record.startDate).add(record.activeDays, 'days'))

			return <p>{endAt}</p>
		},
	},
	{
		title: "Trạng thái",
		key: "status",
		render: (record) => {
			const endAt = dayjs(record.startDate).add(record.activeDays, 'days')
			if (!endAt.diff(dayjs(), 'day')) return <Tag color="error">Đã hết hạn</Tag>

			return <Tag color="processing">Đang hoạt động</Tag>
		}
	}
];

const tvcvSeriviceColumn = [
	{
		title: "Điểm mua",
		dataIndex: "quantity",
		key: "quantity",
	},
	{
		title: "Thời gian bắt đầu",
		key: "startDate",
		render: (record) => {
			const startAt = getDate(dayjs(record.startDate))

			return <p>{startAt}</p>
		},
	},
	{
		title: "Thời gian kết thúc",
		key: "endAt",
		render: (record) => {
			const endAt = getDate(dayjs(record.startDate).add(record.activeDays, 'days'))

			return <p>{endAt}</p>
		},
	},
	{
		title: "Trạng thái",
		key: "status",
		render: (record) => {
			const endAt = dayjs(record.startDate).add(record.activeDays, 'days')
			if (!endAt.diff(dayjs(), 'day')) return <Tag color="error">Đã hết hạn</Tag>

			return <Tag color="processing">Đang hoạt động</Tag>
		}
	},
];

const PackageManagementPage = () => {
	const [TVCVData, setTVCVData] = useState([])
	const [postJobServiceData, setPostJobServiceData] = useState([])
	const [numOfJobUsePostService, setNumOfJobUsePostService] = useState(0)
	const [numOfRemainingJobUseService, setNumOfRemainingJobUseService] = useState(0)

	useEffect(() => {
		const getData = async () => {
			const response = await httpAuthGet({ endpoint: apiCompanyGetServices });

			setNumOfJobUsePostService(response?.data.numOfJobUsePostService)
			setNumOfRemainingJobUseService(response?.data.numOfRemainingJobUseService)

			const data = response?.data.services
			if (!data) return

			data.forEach(item => {
				if (item.service.serviceType === SERVICE_TVCV.value) {
					setTVCVData([...TVCVData,item])
				} else if (item.service.serviceType === SERVICE_POST_JOB.value) {
					setPostJobServiceData([...postJobServiceData, item])
				}
			})

		};
		getData();
	}, []);

	return (
		<EmployerLayout>
			<div>
				<EmployerBanner />
				<div>
					<p className="text-lg my-5">Quản lý dịch vụ</p>
					<div className="bg-white shadow p-5 my-5">
						<div className="flex items-center justify-between mb-5">
							<p className="uppercase text-lg">Lọc hồ sơ</p>
							<Link href={`${routeMap.employer}${routeMap.viewedUser}`}>
								<Button type="primary" danger icon={<Check fontSize="small" />}>
									Danh sách hồ sơ đã xem
								</Button>
							</Link>
						</div>
						{
							TVCVData && 
							<Table rowKey={obj => obj.id} columns={tvcvSeriviceColumn} dataSource={TVCVData} />
						}
					</div>
					<div className="bg-white shadow p-5 my-5">
						<p className="uppercase text-lg">Đăng tin tuyển dụng</p>
						<div className="flex items-center justify-between my-5">
							<div className="text-sm text-99">
								<span>Số tin đã đăng:</span>
								<span className="text-primary ml-2 mr-10">{numOfJobUsePostService}</span>
								<span>Số tin còn lại:</span>
								<span className="text-secondary ml-2">{numOfRemainingJobUseService}</span>
							</div>
							<Link href={`${routeMap.employer}${routeMap.postList}`}>
								<Button
									type="primary"
									danger
									icon={<DnsOutlined fontSize="small" />}
								>
									Quản lý tin tuyển dụng
								</Button>
							</Link>
						</div>
						<Table rowKey={obj => obj.id}  columns={postJobColunm} dataSource={postJobServiceData} />
					</div>
					{/* <div className="bg-white shadow p-5 my-5">
						<p className="uppercase text-lg">THỐNG KÊ EMAIL MỜI ỨNG TUYỂN</p>
						<div className="my-5">
							<div className="text-sm text-99">
								<span>Số ứng viên đã gửi:</span>
								<span className="text-primary ml-2 mr-10">0</span>
								<span>Số điểm sử dụng:</span>
								<span className="text-secondary ml-2">0</span>
							</div>
						</div>
						<Table bordered columns={columns} dataSource={data?.file} />
					</div> */}
				</div>
			</div>
		</EmployerLayout>
	);
};

export default PackageManagementPage;
