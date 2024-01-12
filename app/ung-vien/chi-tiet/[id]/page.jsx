"use client";
import { useAppSelector } from "lib/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCandidate } from "src/apis/apiEndpoint";
import RightSide from "src/components/Candidates/Detail/RightSide";
import Basic from "src/components/CvDetail/Templates/Basic";
import { USER_ROLE } from "src/constants/common";

const CandidateDetailPage = () => {
	const router = useRouter();
	const params = useParams();
	const { userInfo } = useAppSelector((state) => state.user);
	const [candidateInfo, setCandidateInfo] = useState();

	useEffect(() => {
		if (userInfo?.role === USER_ROLE.employer) {
			const getCandidateInfo = async () => {
				const response = await httpAuthGet({
					endpoint: `${apiCandidate}/${params?.id}`,
				});
				setCandidateInfo(response?.data);
			};
			getCandidateInfo();
		} else {
			router.push("/");
		}
	}, []);

	return (
		<div className="bg-bgContainer">
			<div className="w-xlContent mx-auto grid grid-cols-[66%_33%] gap-5">
				<div className="max-h-[calc(100vh-64px)] overflow-y-auto">
					<Basic data={candidateInfo} readOnly />
				</div>
				<RightSide info={candidateInfo} />
			</div>
		</div>
	);
};

export default CandidateDetailPage;
