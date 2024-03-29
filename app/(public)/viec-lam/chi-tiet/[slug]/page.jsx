import { cookies } from "next/headers";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiJob } from "src/apis/apiEndpoint";
import JobDetailContent from "src/components/JobDetail/JobDetailContent";
import { token } from "src/constants/common";

const JobDetailPage = async ({ params }) => {
	const cookieStore = cookies();
	const TOKEN = cookieStore.get(token)?.value;

	const response = await httpAuthGet({
		endpoint: `${apiJob}`,
		params: { slug: params?.slug },
		TOKEN,
	});

	const data = response?.jobInfo || {};

	return <JobDetailContent data={data} />;
};

export default JobDetailPage;
