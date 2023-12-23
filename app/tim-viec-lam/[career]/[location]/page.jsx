import { concat } from "lodash";
import React from "react";
import { httpGet, httpPost } from "src/apis/apiCaller";
import { apiJob, apiJobByCareer, apiJobByLocation } from "src/apis/apiEndpoint";
import JobLayout from "src/components/Jobs/JobLayout";
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
	const { page } = searchParams;

	const payload = {
		careerId: paramValue(career),
		workLocationId: paramValue(location),
		paging: { page, size: 10 },
	};

	const hotJobResponse = await httpPost(`${apiJob}/filter`, payload);

	const majorResponse = await httpGet(`${apiJob}/count/career`);

	const jobInfo = hotJobResponse?.data || [];
	const majorList = majorResponse?.data || [];

	return <JobLayout jobInfo={jobInfo} majorList={majorList} />;
};

export default JobFilterPage;
