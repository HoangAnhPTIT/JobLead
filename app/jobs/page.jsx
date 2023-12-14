import React from "react";
import Banner from "src/components/Jobs/Banner";
import JobList from "src/components/Jobs/JobList";
import JobSearch from "src/components/Jobs/JobSearch";

const JobsPage = () => {
	return (
		<div>
			<JobSearch />
			<div className="bg-bgBody py-11">
				<Banner />
				<JobList />
			</div>
		</div>
	);
};

export default JobsPage;
