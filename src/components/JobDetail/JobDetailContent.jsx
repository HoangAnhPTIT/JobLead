"use client";
import { useAppSelector } from "lib/hooks";
import { useEffect } from "react";
import { httpAuthPost } from "src/apis/apiAuthCaller";
import { httpPost } from "src/apis/apiCaller";
import { apiUserViewJob } from "src/apis/apiEndpoint";
import ImageFull from "src/commons/Image";
import JobSearch from "src/commons/Jobs/JobSearch";
import JobCompanyInfo from "./JobCompanyInfo";
import JobDetailInfo from "./JobDetailInfo";
import JobGeneralInfo from "./JobGeneralInfo";
import JobSticky from "./JobSticky";

const JobDetailContent = ({ data }) => {
	const { isLogin } = useAppSelector((state) => state.user);
	const id = data?.id;

	useEffect(() => {
		if (id) {
			const endpoint = `${apiUserViewJob}/${id}`;
			isLogin ? httpAuthPost({ endpoint }) : httpPost(endpoint);
		}
	}, [id, isLogin]);

	return (
		<div>
			<JobSticky data={data} />
			<JobSearch />
			<div className="bg-bgBody py-5">
				<div className="w-full sm:w-smContent md:w-mdContent lg:w-lgContent xl:w-xlContent mx-auto">
					<div className="mb-5">
						<ImageFull src="https://placehold.co/1170x220.png" alt="" />
					</div>
					<div className="mb-3">
						<JobGeneralInfo data={data} />
					</div>
					<JobDetailInfo data={data} />
					<JobCompanyInfo data={data?.company} />
				</div>
			</div>
		</div>
	);
};

export default JobDetailContent;
