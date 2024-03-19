"use client";
import { useState } from "react";
import CvTemplateLayout from "src/components/CvTemplate/CvTemplateLayout";
import PersonalTemplate from "src/components/CvTemplate/Templates/Personal";
import useCandidateInfo from "src/hooks/useCandidateInfo";

const PersonalCv = () => {
	const [modalType, setModalType] = useState(null);
	const { info, getCandidateInfo } = useCandidateInfo();

	const closeModal = () => {
		setModalType(null);
		getCandidateInfo();
	};

	return (
		<CvTemplateLayout info={info} modalType={modalType} closeModal={closeModal}>
			<PersonalTemplate
				info={info}
				modalType={modalType}
				setModalType={setModalType}
			/>
		</CvTemplateLayout>
	);
};

export default PersonalCv;
