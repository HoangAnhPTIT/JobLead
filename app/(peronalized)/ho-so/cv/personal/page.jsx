"use client";
import React, { useState } from "react";
import CvTemplateLayout from "src/components/CvTemplate/CvTemplateLayout";
import PersonalTemplate from "src/components/CvTemplate/Templates/Personal";

const PersonalCv = () => {
	const [modalType, setModalType] = useState(null);

	return (
		<CvTemplateLayout modalType={modalType} setModalType={setModalType}>
			<PersonalTemplate modalType={modalType} setModalType={setModalType} />
		</CvTemplateLayout>
	);
};

export default PersonalCv;
