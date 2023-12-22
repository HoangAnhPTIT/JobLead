"use client";
import Category from "@/src/commons/Category";
import JobItem from "@/src/commons/JobItem";
import { ApartmentOutlined, SearchOutlined } from "@mui/icons-material";
import { Grid, Pagination } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import ImageFull from "src/commons/Image";
import ItemCate from "../Home/ItemCate";

const JobList = ({ jobList, majorList }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const dataShow =
		jobList?.slice((currentPage - 1) * 10, currentPage * 10) || [];
	console.log("jobList", jobList);

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
						count={Math.ceil(jobList?.length / 10)}
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
						{majorList?.map((item, i) => (
							<div key={i} className="my-2">
								<ItemCate
									title={item?.career?.name}
									amount={item?.jobCount}
									link="/"
								/>
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
