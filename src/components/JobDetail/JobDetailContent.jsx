import ImageFull from "src/commons/Image";
import JobSearch from "src/commons/Jobs/JobSearch";
import JobGeneralInfo from "./JobGeneralInfo";
import JobDetailInfo from "./JobDetailInfo";

const JobDetailContent = () => {
	return (
		<div>
			<JobSearch />
			<div className="bg-bgBody py-5">
				<div className="w-content mx-auto">
					<div className="mb-5">
						<ImageFull src="https://placehold.co/1170x220.png" alt="" />
					</div>
					<div className="mb-3">
						<JobGeneralInfo />
					</div>
					<div>
						<JobDetailInfo />
					</div>
				</div>
			</div>
		</div>
	);
};

export default JobDetailContent;
