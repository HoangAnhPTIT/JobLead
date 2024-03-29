import { concat } from "lodash";
import { cookies } from "next/headers";
import { httpAuthPost } from "src/apis/apiAuthCaller";
import { httpGet } from "src/apis/apiCaller";
import { apiJob, apiJobByCareer, apiJobByLocation } from "src/apis/apiEndpoint";
import JobLayout from "src/components/Jobs/JobLayout";
import { token } from "src/constants/common";
import { paramValue } from "src/helper/format";

export const generateStaticParams = async () => {
	const jobByLocationResponse = await httpGet(apiJobByLocation);
	const jobByCareerResponse = await httpGet(apiJobByCareer);

	const jobByLocationData = jobByLocationResponse?.data;
	const jobByCareerData = jobByCareerResponse?.data;

	const getParams = jobByCareerData?.reduce((list, career) => {
		const getLocations = jobByLocationData?.map((item) => ({
			career: career?.career?.slug,
			location: item?.workLocation?.slug,
		}));
		return concat(list, ...getLocations);
	}, []);

	return getParams;
};

const JobFilterPage = async ({ params, searchParams }) => {
	const { career, location } = params;
	const { page, ...rest } = searchParams;
	const cookieStore = cookies();
	const TOKEN = cookieStore.get(token).value;

	const payload = {
		careerId: paramValue(career),
		workLocationId: paramValue(location),
		paging: { page: page || 1, size: 10 },
		...rest,
	};

	const jobResponse = await httpAuthPost({
		endpoint: `${apiJob}/filter`,
		data: payload,
		TOKEN,
	});

	const majorResponse = await httpGet(`${apiJob}/count/career`);

	const jobInfo = jobResponse?.data || [];
	const majorList = majorResponse?.data || [];

	return <JobLayout jobInfo={jobInfo} majorList={majorList} />;
};

export default JobFilterPage;
