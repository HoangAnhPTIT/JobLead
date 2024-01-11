import ImageFull from "src/commons/Image";
import JobSearch from "src/commons/Jobs/JobSearch";
import JobGeneralInfo from "./JobGeneralInfo";
import JobDetailInfo from "./JobDetailInfo";
import JobCompanyInfo from "./JobCompanyInfo";
import JobSticky from "./JobSticky";

const JobDetailContent = ({ data }) => {
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
