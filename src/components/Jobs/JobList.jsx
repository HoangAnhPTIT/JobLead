"use client";
import { ApartmentOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";
import Category from "src/commons/Category";
import JobItem from "src/commons/JobItem";
import { COMPONENT_SIZE } from "src/constants/common";
import { JOB_PRIORITY } from "src/constants/job";

const jobInfo = {
	jobName: "NHÂN VIÊN KẾ TOÁN TỔNG HỢP - THU NHẬP TỪ 12 TRIỆU",
	image: "/cpn2.png",
	companyName: "Công ty TNHH South Sea Leatherwares Việt Nam",
	price: "12 triệu - 15 triệu",
	location: "Hà Nội",
	type: JOB_PRIORITY.HOT,
	expireDate: "31/12/2023",
};

const data = [];

for (let i = 0; i < 20; i++) {
	data[i] = {
		...jobInfo,
		type:
			i % 4 === 0
				? JOB_PRIORITY.HOT
				: i % 4 === 1
				? JOB_PRIORITY.URGENT
				: JOB_PRIORITY.NORMAL,
	};
}

const JobList = () => {
	return (
		<div className="w-content mx-auto my-5">
			<Row gutter={16}>
				<Col span={18}>
					<Category icon={<SearchOutlined />} title="Việc làm hot">
						{data?.map((item, i) => (
							<div key={i} className="border-b p-2.5">
								<JobItem item={item} showExpire />
							</div>
						))}
					</Category>
				</Col>
				<Col span={6}>
					<Category icon={<ApartmentOutlined />} title="Việc làm theo ngành" />
				</Col>
			</Row>
		</div>
	);
};

export default JobList;
