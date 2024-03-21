import dayjs from "dayjs";

export const convertCandidateInfo = (data) => {
	const newData = {
		generalInfo: {
			fullName: data?.fullName,
			avatar: data?.avatar,
			email: data?.email,
			gender: data?.gender?.name,
			genderId: data?.gender?.id,
			birthday: data?.dob ? dayjs(data?.dob).format("DD/MM/YYYY") : null,
			phone: data?.phone,
			location: data?.location,
			workTitle: data?.workTitle,
			dob: data?.dob,
		},
		career: {
			items: data?.candidateCareerGoals?.map((item) => ({
				name: item?.careerGoal?.name,
				id: item?.careerGoal?.id,
			})),
			description: data?.careerGoalDescription,
		},
		education: data?.educations?.map((item) => ({
			id: item?.id,
			period: `${
				item?.startDate ? dayjs(item?.startDate).format("DD/MM/YYYY") : ""
			} - ${
				item?.finishDate ? dayjs(item?.finishDate).format("DD/MM/YYYY") : ""
			}`,
			degree: item?.learningClassification?.name,
			degreeId: item?.learningClassification?.id,
			certification: item?.certification,
			school: item?.school,
			class: item?.class,
			major: item?.major,
			startDate: item?.startDate,
			finishDate: item?.finishDate,
			description: item?.description,
		})),
		experience: data?.experiences?.map((item) => ({
			id: item?.id,
			period: `${
				item?.startDate ? dayjs(item?.startDate).format("DD/MM/YYYY") : ""
			} - ${
				item?.isCurrentWork
					? "Hiện tại"
					: item?.finishDate
					? dayjs(item?.finishDate).format("DD/MM/YYYY")
					: ""
			}`,
			company: item?.company,
			title: item?.title,
			description: item?.description,
			startDate: item?.startDate,
			finishDate: item?.finishDate,
			isCurrentWork: item?.isCurrentWork,
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
				id: item?.skill?.id,
			})),
			description: data?.skillDescription,
		},
		activity: data?.candidateActivities?.map((item) => ({
			id: item?.id,
			title: item?.title,
			description: item?.description,
		})),
	};

	return newData;
};
