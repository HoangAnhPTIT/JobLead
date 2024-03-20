"use client";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { httpAuthDelete } from "src/apis/apiAuthCaller";
import {
	apiCandidateEducation,
	apiCandidateExperience,
} from "src/apis/apiEndpoint";
import CvTemplateLayout from "src/components/CvTemplate/Common/CvTemplateLayout";
import PersonalTemplate from "src/components/CvTemplate/Templates/Personal";
import { errorMessage, updateSuccessMessage } from "src/constants/common";
import { CV_MODAL_TYPES } from "src/constants/cv";
import useCandidateInfo from "src/hooks/useCandidateInfo";

const ENDPOINT_DELETE = {
	[CV_MODAL_TYPES.education]: apiCandidateEducation,
	[CV_MODAL_TYPES.experience]: apiCandidateExperience,
};

const PersonalCv = () => {
	const dispatch = useAppDispatch();
	const { info, getCandidateInfo } = useCandidateInfo();
	const [modalType, setModalType] = useState(null);
	const [dataSelected, setDataSelected] = useState(null);

	const closeModal = (reloadData = true) => {
		setModalType(null);
		setDataSelected(null);
		reloadData && getCandidateInfo();
	};

	const onEditSection = (data, typeModal) => {
		setDataSelected(data);
		setModalType(typeModal);
	};

	const onDeleteSection = async (id, sectionType) => {
		dispatch(updateLoading(true));
		try {
			const response = await httpAuthDelete({
				endpoint: `${ENDPOINT_DELETE[sectionType]}/${id}`,
			});
			if (response.success) {
				toast.success(updateSuccessMessage);
				getCandidateInfo();
			} else {
				toast.error(errorMessage);
			}
		} catch (error) {
			toast.error(error?.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	return (
		<CvTemplateLayout
			info={info}
			modalType={modalType}
			dataSelected={dataSelected}
			closeModal={closeModal}
		>
			<PersonalTemplate
				info={info}
				setModalType={setModalType}
				setDataSelected={setDataSelected}
				onEditSection={onEditSection}
				onDeleteSection={onDeleteSection}
			/>
		</CvTemplateLayout>
	);
};

export default PersonalCv;
