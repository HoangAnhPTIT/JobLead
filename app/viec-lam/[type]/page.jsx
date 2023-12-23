import { httpGet } from "src/apis/apiCaller";
import { apiJob } from "src/apis/apiEndpoint";
import JobLayout from "src/components/Jobs/JobLayout";
import { JOB_TYPE_MAP_ROUTE } from "src/constants/job";
import { jobTypeRouteMap } from "src/constants/routeMap";

const jobTypeRoute = Object.values(jobTypeRouteMap);

export async function generateStaticParams() {
	const jobTypes = jobTypeRoute.map((item) => ({ type: item }));
	return jobTypes;
}

const JobsPage = async ({ params, searchParams }) => {
	const { type } = params;
	const { page } = searchParams;

	const hotJobResponse = await httpGet(
		`${apiJob}/filter/service/${JOB_TYPE_MAP_ROUTE[type]}?page=${
			page || 1
		}&size=10`
	);

	const majorResponse = await httpGet(`${apiJob}/count/career`);

	const jobInfo = hotJobResponse?.data || [];
	const majorList = majorResponse?.data || [];

	return <JobLayout jobInfo={jobInfo} majorList={majorList} />;
};

export default JobsPage;
