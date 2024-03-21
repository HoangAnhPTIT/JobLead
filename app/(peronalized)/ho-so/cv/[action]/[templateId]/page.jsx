"use client";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthDelete, httpAuthGet } from "src/apis/apiAuthCaller";
import {
	apiCandidateActivity,
	apiCandidateEducation,
	apiCandidateExpectation,
	apiCandidateExperience,
	apiCvTemplate,
} from "src/apis/apiEndpoint";
import CvTemplateLayout from "src/components/CvTemplate/Common/CvTemplateLayout";
import Cv1 from "src/components/CvTemplate/Templates/Cv1";
import { errorMessage, updateSuccessMessage } from "src/constants/common";
import { CV_ACTIONS, CV_MODAL_TYPES } from "src/constants/cv";
import routeMap from "src/constants/routeMap";
import useCandidateInfo from "src/hooks/useCandidateInfo";

const ENDPOINT_DELETE = {
	[CV_MODAL_TYPES.education]: apiCandidateEducation,
	[CV_MODAL_TYPES.experience]: apiCandidateExperience,
	[CV_MODAL_TYPES.activity]: apiCandidateActivity,
};

const PersonalCv = () => {
	const router = useRouter();
	const { action, templateId } = useParams();
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
	}, [dispatch, templateId]);

	// useEffect(() => {
	// 	if (!(action === CV_ACTIONS.edit && templateId)) {
	// 		router.push(routeMap.notFound);
	// 	}
	// }, [action, router, templateId]);

	// if (!(action === CV_ACTIONS.edit && templateId)) {
	// 	return null;
	// }

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
			<Cv1
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
