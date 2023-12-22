import { httpGet } from "src/apis/apiCaller";
import { apiJob } from "src/apis/apiEndpoint";
import Banner from "src/components/Jobs/Banner";
import JobList from "src/components/Jobs/JobList";
import JobSearch from "src/components/Jobs/JobSearch";

const JobsPage = async () => {
	const hotJobResponse = await httpGet(`${apiJob}/classify/service`);
	const majorResponse = await httpGet(`${apiJob}/count/career`);

	const jobList = hotJobResponse?.data || [];
	const majorList = majorResponse?.data || [];

	return (
		<div>
			<JobSearch />
			<div className="bg-bgBody py-11">
				<Banner />
				<JobList jobList={jobList} majorList={majorList} />
			</div>
		</div>
	);
};

export default JobsPage;
