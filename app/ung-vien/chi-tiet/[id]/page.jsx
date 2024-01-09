"use client";
import { useEffect, useState } from "react";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCandidate } from "src/apis/apiEndpoint";
import RightSide from "src/components/Candidates/Detail/RightSide";
import Basic from "src/components/CvDetail/Templates/Basic";

const CandidateDetailPage = () => {
	const [candidateInfo, setCandidateInfo] = useState();

	const getCandidateInfo = async () => {
		const response = await httpAuthGet({ endpoint: apiCandidate });
		setCandidateInfo(response?.data);
	};

	useEffect(() => {
		getCandidateInfo();
	}, []);

	return (
		<div className="bg-bgContainer">
			<div className="w-xlContent mx-auto grid grid-cols-[66%_33%] gap-5">
				<div className="max-h-[calc(100vh-64px)] overflow-y-auto">
					<Basic data={candidateInfo} readOnly />
				</div>
				<RightSide />
			</div>
		</div>
	);
};

export default CandidateDetailPage;
