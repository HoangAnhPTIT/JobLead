import { httpGet } from "src/apis/apiCaller";
import { apiJob } from "src/apis/apiEndpoint";
import JobDetailContent from "src/components/JobDetail/JobDetailContent";

const JobDetailPage = async ({ params }) => {
	const response = await httpGet(`${apiJob}/${params?.slug}`);

	const data = response?.jobInfo || {};

	return <JobDetailContent data={data} />;
};

export default JobDetailPage;
