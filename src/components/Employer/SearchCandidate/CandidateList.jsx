import React from "react";
import CandidateItem from "src/commons/CandidateItem";

const CandidateList = ({ candidates }) => {
	return (
		<div>
			<p className="my-5 text-xl">Danh sách ứng viên phù hợp</p>
			{candidates?.map((candidate, i) => (
				<CandidateItem item={candidate} key={i} />
			))}
		</div>
	);
};

export default CandidateList;
