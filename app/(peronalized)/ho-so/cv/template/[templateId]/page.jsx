"use client";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthDelete, httpAuthGet } from "src/apis/apiAuthCaller";
import {
	apiCandidateEducation,
	apiCandidateExpectation,
	apiCandidateExperience,
	apiCv,
	apiCvTemplate,
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
	const { templateId } = useParams();
	const dispatch = useAppDispatch();
	const { info, getCandidateInfo } = useCandidateInfo();
	const [modalType, setModalType] = useState(null);
	const [dataSelected, setDataSelected] = useState(null);
	const [additionInfo, setAdditionInfo] = useState(null);
	const [cvInfo, setCvInfo] = useState(null);

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

	useEffect(() => {
		const getAdditionData = async () => {
			dispatch(updateLoading(true));
			try {
				const response = await httpAuthGet({
					endpoint: apiCandidateExpectation,
				});
				const cvInfoResponse = await httpAuthGet({
					endpoint: `${apiCvTemplate}/${templateId}`,
				});
				if (response.status === 200) {
					setAdditionInfo(response?.data);
				} else {
					toast.error(response?.message);
				}
				if (cvInfoResponse.status === 200) {
					setCvInfo(response?.data);
				} else {
					toast.error(response?.message);
				}
			} catch (error) {
				toast.error(error?.message || error);
			} finally {
				dispatch(updateLoading(false));
			}
		};
		getAdditionData();
	}, [dispatch]);

	return (
		<CvTemplateLayout
			info={info}
			modalType={modalType}
			setModalType={setModalType}
			dataSelected={dataSelected}
			closeModal={closeModal}
			additionInfo={additionInfo}
			cvInfo={cvInfo}
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
