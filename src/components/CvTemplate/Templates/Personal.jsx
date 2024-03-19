import React from "react";
import CvItemLayout from "../CvItemLayout";
import { CV_MODAL_TYPES } from "src/constants/cv";
import useCandidateInfo from "src/hooks/useCandidateInfo";

const color = "#B31312";

const PersonalTemplate = ({ modalType, setModalType }) => {
	const info = useCandidateInfo();
	console.log("info", info);
	return (
		<div className="bg-white">
			<CvItemLayout itemType={CV_MODAL_TYPES.generalInfo}>
				<div className="text-white" style={{ background: color }}>
					Hoj ten
				</div>
			</CvItemLayout>
		</div>
	);
};

export default PersonalTemplate;
