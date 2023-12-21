"use client";
import Category from "@/src/commons/Category";
import JobItem from "@/src/commons/JobItem";
import { JOB_PRIORITY } from "@/src/constants/job";
import { ApartmentOutlined, SearchOutlined } from "@ant-design/icons";
import { Grid, Pagination } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import ImageFull from "src/commons/Image";
import ItemCate from "../Home/ItemCate";

const jobInfo = {
	jobName: "NHÂN VIÊN KẾ TOÁN TỔNG HỢP - THU NHẬP TỪ 12 TRIỆU",
	avatar: "/cpn2.png",
	companyName: "Công ty TNHH South Sea Leatherwares Việt Nam",
	price: "12 triệu - 15 triệu",
	location: "Hà Nội",
	type: JOB_PRIORITY.HOT,
	expireDate: "31/12/2023",
};

const data = [];

for (let i = 0; i < 23; i++) {
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

const categoryJobList = [
	{
		title: "Kinh doanh",
		amount: "1091",
		link: "/more",
	},
	{
		title: "Kinh doanh",
		amount: "1091",
		link: "/more",
	},
	{
		title: "Bans hang",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Sinh viên / Mới tốt nghiệp / Thực tập",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Sinh viên / Mới tốt nghiệp / Thực tập / hihi",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Sinh viên / Mới tốt nghiệp / Thực tập",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Kinh doanh",
		amount: "1091",
		link: "/more",
	},
	{
		title: "Kinh doanh",
		amount: "1091",
		link: "/more",
	},
	{
		title: "Bans hang",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Sinh viên / Mới tốt nghiệp / Thực tập",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Sinh viên / Mới tốt nghiệp / Thực tập / hihi",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Sinh viên / Mới tốt nghiệp / Thực tập",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Kinh doanh",
		amount: "1091",
		link: "/more",
	},
	{
		title: "Kinh doanh",
		amount: "1091",
		link: "/more",
	},
	{
		title: "Bans hang",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Sinh viên / Mới tốt nghiệp / Thực tập",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Sinh viên / Mới tốt nghiệp / Thực tập / hihi",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Sinh viên / Mới tốt nghiệp / Thực tập",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Kinh doanh",
		amount: "1091",
		link: "/more",
	},
	{
		title: "Kinh doanh",
		amount: "1091",
		link: "/more",
	},
	{
		title: "Bans hang",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Sinh viên / Mới tốt nghiệp / Thực tập",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Sinh viên / Mới tốt nghiệp / Thực tập / hihi",
		amount: "10991",
		link: "/more",
	},
	{
		title: "Sinh viên / Mới tốt nghiệp / Thực tập",
		amount: "10991",
		link: "/more",
	},
];

const JobList = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const dataShow = data.slice((currentPage - 1) * 10, currentPage * 10);

	return (
		<div className="w-content mx-auto my-5">
			<Grid container spacing={4}>
				<Grid item xs={9}>
					<Category
						icon={<SearchOutlined />}
						title="Việc làm hot"
						contentClass="border-b-0"
					>
						{dataShow?.map((item, i) => (
							<div key={i} className="border-b p-2.5">
								<JobItem item={item} showExpire />
							</div>
						))}
					</Category>
					<Pagination
						count={Math.ceil(data?.length / 10)}
						page={currentPage}
						onChange={(e, page) => setCurrentPage(page)}
						className="flex justify-center py-5 bg-white"
					/>
				</Grid>
				<Grid item xs={3}>
					<Category
						icon={<ApartmentOutlined />}
						title="Việc làm theo ngành"
						contentClass="pt-0"
					>
						{categoryJobList?.map((item, i) => (
							<div key={i} className="my-2">
								<ItemCate {...item} />
							</div>
						))}
					</Category>
					<div>
						<Link href="/">
							<ImageFull src="/cv-banner-2.png" alt="" classname="mt-7" />
						</Link>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default JobList;
