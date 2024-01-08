"use client";
import React from "react";
import Banner from "./Banner";
import JobList from "./JobList";
import JobSearch from "src/commons/Jobs/JobSearch";
import Breadcrumb from "src/commons/Breadcrumb";
import routeMap from "src/constants/routeMap";

const JobLayout = ({ jobInfo, majorList }) => {
	return (
		<div>
			<JobSearch />
			<div className="bg-bgBody pb-5">
				<Breadcrumb
					items={[
						{
							title: "Trang chủ",
							href: "/",
						},
						{
							title: "Tìm việc",
							href: routeMap.searchJob + "/0/0",
						},
						{
							title: jobInfo?.title,
						},
					]}
				/>
				<Banner />
				<JobList jobList={jobInfo} majorList={majorList} />
			</div>
		</div>
	);
};

export default JobLayout;
