"use client";
import { Check, DnsOutlined } from "@mui/icons-material";
import { Button, Table } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import EmployerBanner from "src/components/Employer/EmployerBanner";
import EmployerLayout from "src/components/Employer/EmployerLayout";
import routeMap from "src/constants/routeMap";

const columns = [
	{
		title: "Điểm mua",
		dataIndex: "point",
		key: "point",
	},
	{
		title: "Thời gian bắt đầu",
		dataIndex: "startAt",
		key: "startAt",
	},
	{
		title: "Thời gian kết thúc",
		dataIndex: "endAt",
		key: "endAt",
	},
	{
		title: "Trạng thái",
		dataIndex: "status",
		key: "status",
	},
];

const PackageManagementPage = () => {
	const [data, setData] = useState();
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
						<Table bordered columns={columns} dataSource={data?.file} />
					</div>
					<div className="bg-white shadow p-5 my-5">
						<p className="uppercase text-lg">Đăng tin tuyển dụng</p>
						<div className="flex items-center justify-between my-5">
							<div className="text-sm text-99">
								<span>Số tin đã đăng:</span>
								<span className="text-primary ml-2 mr-10">0</span>
								<span>Số tin còn lại:</span>
								<span className="text-secondary ml-2">0</span>
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
						<Table bordered columns={columns} dataSource={data?.file} />
					</div>
					<div className="bg-white shadow p-5 my-5">
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
					</div>
				</div>
			</div>
		</EmployerLayout>
	);
};

export default PackageManagementPage;
