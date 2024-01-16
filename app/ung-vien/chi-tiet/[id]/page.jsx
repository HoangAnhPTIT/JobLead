"use client";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCandidate } from "src/apis/apiEndpoint";
import RightSide from "src/components/Candidates/Detail/RightSide";
import Pro from "src/components/CvDetail/Templates/Pro";
import { USER_ROLE, errorMessage } from "src/constants/common";

const CandidateDetailPage = () => {
	const router = useRouter();
	const params = useParams();
	const dispatch = useAppDispatch();
	const { userInfo } = useAppSelector((state) => state.user);
	const [candidateInfo, setCandidateInfo] = useState();

	const getCandidateInfo = async () => {
		dispatch(updateLoading(true));
		try {
			const response = await httpAuthGet({
				endpoint: `${apiCandidate}/${params?.id}`,
			});
			if (response.status === 200) {
				setCandidateInfo(response?.data);
			} else {
				toast.error(errorMessage);
			}
		} catch {
			toast.error(errorMessage);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		if (userInfo?.role === USER_ROLE.employer) {
			getCandidateInfo();
		} else {
			router.push("/");
		}
	}, []);

	return (
		<div className="bg-bgContainer">
			<div className="w-xlContent mx-auto grid grid-cols-[66%_33%] gap-5">
				<div className="max-h-[calc(100vh-64px)] overflow-y-auto">
					<Pro data={candidateInfo} readOnly />
				</div>
				<RightSide info={candidateInfo} getData={getCandidateInfo} />
			</div>
		</div>
	);
};

export default CandidateDetailPage;
