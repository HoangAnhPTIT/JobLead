import React from "react";
import JobSearch from "./JobSearch";
import Banner from "./Banner";
import JobList from "./JobList";

const JobLayout = ({ jobInfo, majorList }) => {
	return (
		<div>
			<JobSearch />
			<div className="bg-bgBody py-11">
				<Banner />
				<JobList jobList={jobInfo} majorList={majorList} />
			</div>
		</div>
	);
};

export default JobLayout;
