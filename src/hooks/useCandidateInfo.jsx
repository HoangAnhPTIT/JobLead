import dayjs from "dayjs";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCandidate } from "src/apis/apiEndpoint";
import { errorMessage } from "src/constants/common";

const useCandidateInfo = () => {
	const dispatch = useAppDispatch();
	const [info, setInfo] = useState(null);

	useEffect(() => {
		const getCandidateInfo = async () => {
			try {
				dispatch(updateLoading(true));
				const response = await httpAuthGet({
					endpoint: apiCandidate,
				});
				if (response?.status === 200) {
					const { data } = response;

					const newData = {
						generalInfo: {
							fullName: data?.fullName,
							avatar: data?.avatar,
							email: data?.email,
							gender: data?.gender?.name,
							dob: dayjs(data?.dob).format("DD/MM/YYYY"),
							phone: data?.phone,
							location: data?.location,
							workTitle: data?.workTitle,
						},
						career: {
							items: data?.candidateCareerGoals?.map(
								(item) => item?.careerGoal?.name
							),
							description: data?.careerGoalDescription,
						},
						education: data?.educations?.map((item) => ({
							period: `${dayjs(item?.startDate).format("DD/MM/YYYY")} - ${dayjs(
								item?.finishDate
							).format("DD/MM/YYYY")}`,
							degree: item?.learningClassification?.name,
							certification: item?.certification,
							school: item?.school,
							class: item?.class,
							major: item?.major,
						})),
						experiences: data?.experiences?.map((item) => ({
							period: `${dayjs(item?.startDate).format("DD/MM/YYYY")} - ${
								item?.finishDate
									? dayjs(item?.finishDate).format("DD/MM/YYYY")
									: "Hiện tại"
							}`,
							company: item?.company,
							title: item?.title,
							description: item?.description,
						})),
						itSkill: data?.itSkills?.map((item) => ({
							name: item?.name,
							star: item?.star,
						})),
						languageSkill: data?.languageSkills?.map((item) => ({
							name: item?.name,
							star: item?.star,
						})),
						softSkill: {
							items: data?.skills?.map((item) => ({
								name: item?.skill?.name,
							})),
							description: data?.skillDescription,
						},
					};

					setInfo(newData);
				} else {
					toast.error(response?.message);
				}
			} catch {
				toast.error(errorMessage);
			} finally {
				dispatch(updateLoading(false));
			}
		};
		getCandidateInfo();
	}, [dispatch]);

	return info;
};

export default useCandidateInfo;
