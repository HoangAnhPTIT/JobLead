"use client";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCandidate } from "src/apis/apiEndpoint";
import LoadingComponent from "src/commons/LoadingComponent";
import NotFound from "src/commons/NotFound";
import RightSide from "src/components/Candidates/Detail/RightSide";
import Cv1 from "src/components/CvTemplate/Templates/Cv1";
import Cv2 from "src/components/CvTemplate/Templates/Cv2";
import Cv3 from "src/components/CvTemplate/Templates/Cv3";
import { USER_ROLE, errorMessage } from "src/constants/common";
import { CV_ACTIONS, CV_TEMPLATES } from "src/constants/cv";
import { convertCandidateInfo } from "src/helper/data";

const CandidateDetailPage = () => {
	const router = useRouter();
	const { action, id } = useParams();
	const dispatch = useAppDispatch();
	const { userInfo } = useAppSelector((state) => state.user);
	const [candidateInfo, setCandidateInfo] = useState();
	const [cvTemplate, setCvTemplate] = useState();
	const [indexTemplate, setIndexTemplate] = useState(0);
	const [originalData, setOriginalData] = useState(null);

	const getCandidateInfo = async () => {
		dispatch(updateLoading(true));
		try {
			const response = await httpAuthGet({
				endpoint: `${apiCandidate}/${id}`,
			});
			if (response.status === 200) {
				const genData = convertCandidateInfo(response.data);
				setOriginalData(response.data);
				setCandidateInfo(genData);
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

	const templates = {
		[CV_TEMPLATES.cv1]: <Cv1 info={candidateInfo} />,
		[CV_TEMPLATES.cv2]: <Cv2 info={candidateInfo} />,
		[CV_TEMPLATES.cv3]: <Cv3 info={candidateInfo} />,
		[CV_TEMPLATES.basic]: <Cv3 info={candidateInfo} />,
		[CV_TEMPLATES.pro]: <Cv2 info={candidateInfo} />,
	};

	if (action === CV_ACTIONS.view) {
		return (
			<div className="bg-bgContainer">
				<div className="w-xlContent mx-auto grid grid-cols-[67%_33%] gap-5">
					<div className="max-h-[calc(100vh-64px)] overflow-y-auto pt-4">
						<LoadingComponent>{templates[cvTemplate]}</LoadingComponent>
					</div>
					<RightSide
						info={candidateInfo}
						getData={getCandidateInfo}
						indexTemplate={indexTemplate}
						setIndexTemplate={setIndexTemplate}
						cvTemplate={cvTemplate}
						setCvTemplate={setCvTemplate}
						originalData={originalData}
					/>
				</div>
			</div>
		);
	}

	return <NotFound />;
};

export default CandidateDetailPage;
