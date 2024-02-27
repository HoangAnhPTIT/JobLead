"use client";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCandidate } from "src/apis/apiEndpoint";
import RightSide from "src/components/Candidates/Detail/RightSide";
import Basic from "src/components/CvDetail/Templates/Basic";
import Pro from "src/components/CvDetail/Templates/Pro";
import { USER_ROLE, errorMessage } from "src/constants/common";
import { CV_TEMPLATES } from "src/constants/cv";

const CandidateDetailPage = () => {
	const router = useRouter();
	const params = useParams();
	const dispatch = useAppDispatch();
	const { userInfo } = useAppSelector((state) => state.user);
	const [candidateInfo, setCandidateInfo] = useState();
	const [cvTemplate, setCvTemplate] = useState();
	const [indexTemplate, setIndexTemplate] = useState(0);

	const getCandidateInfo = async () => {
		dispatch(updateLoading(true));
		try {
			const response = await httpAuthGet({
				endpoint: `${apiCandidate}/${params?.id}`,
			});
			if (response.status === 200) {
				setCandidateInfo(response?.data);
				setCvTemplate(response?.data?.cvs?.[0].templateCode);
				setIndexTemplate(1);
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

	const showTemplate = () => {
		switch (cvTemplate) {
			case CV_TEMPLATES.basic:
				return <Basic data={candidateInfo} readOnly />;
			case CV_TEMPLATES.pro:
				return <Pro data={candidateInfo} readOnly />;

			default:
				return null;
		}
	};

	return (
		<div className="bg-bgContainer">
			<div className="w-xlContent mx-auto grid grid-cols-[66%_33%] gap-5">
				<div className="max-h-[calc(100vh-64px)] overflow-y-auto">
					{showTemplate()}
				</div>
				<RightSide
					info={candidateInfo}
					getData={getCandidateInfo}
					indexTemplate={indexTemplate}
					setIndexTemplate={setIndexTemplate}
					cvTemplate={cvTemplate}
					setCvTemplate={setCvTemplate}
				/>
			</div>
		</div>
	);
};

export default CandidateDetailPage;
