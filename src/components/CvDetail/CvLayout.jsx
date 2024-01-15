"use client";
import { Check, Edit, Info, Save } from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthDelete, httpAuthGet } from "src/apis/apiAuthCaller";
import {
	apiCandidate,
	apiCandidateEducation,
	apiCandidateExperience,
} from "src/apis/apiEndpoint";
import { CV_MODAL_TYPES } from "src/constants/cv";
import ModalCareerGoal from "./CvModal/ModalCareerGoal";
import ModalEducation from "./CvModal/ModalEducation";
import ModalExperience from "./CvModal/ModalExperience";
import ModalGeneralinfo from "./CvModal/ModalGeneralInfo";
import ModalItSkill from "./CvModal/ModalItSkill";
import ModalLanguage from "./CvModal/ModalLanguage";
import ModalReference from "./CvModal/ModalReference";
import ModalSkill from "./CvModal/ModalSkill";
import Basic from "./Templates/Basic";
import ModalSave from "./CvModal/ModalSave";
import ModalAvatar from "./CvModal/ModalAvatar";
import { useParams } from "next/navigation";
import Pro from "./Templates/Pro";

const CvTemplate = (props) => {
	const params = useParams();
	const template = params?.template;

	if (template === "pro") return <Pro {...props} />;

	return <Basic {...props} />;
};

const CvLayout = () => {
	const dispatch = useAppDispatch();
	const [modalUpdating, setModalUpdating] = useState(null);
	const [candidateInfo, setCandidateInfo] = useState();
	const [educationIndex, setEducationIndex] = useState(null);
	const [experienceIndex, setExperienceIndex] = useState(null);

	const getCandidateInfo = async () => {
		const response = await httpAuthGet({ endpoint: apiCandidate });
		setCandidateInfo(response?.data);
	};

	const handleClose = () => {
		getCandidateInfo();
		setModalUpdating(null);
		setEducationIndex(null);
		setEducationIndex(null);
	};

	const deleteEducation = async (index) => {
		dispatch(updateLoading(true));
		try {
			await httpAuthDelete({
				endpoint: `${apiCandidateEducation}/${candidateInfo?.educations?.[index]?.id}`,
			});
			handleClose();
		} catch (error) {
			toast.error(error?.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};
	const deleteExperience = async (index) => {
		dispatch(updateLoading(true));
		try {
			await httpAuthDelete({
				endpoint: `${apiCandidateExperience}/${candidateInfo?.experiences?.[index]?.id}`,
			});
			handleClose();
		} catch (error) {
			toast.error(error?.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		getCandidateInfo();
	}, []);

	return (
		<>
			<ModalEducation
				index={educationIndex}
				data={candidateInfo?.educations}
				open={modalUpdating === CV_MODAL_TYPES.education}
				handleClose={handleClose}
			/>
			<ModalExperience
				index={experienceIndex}
				data={candidateInfo?.experiences}
				open={modalUpdating === CV_MODAL_TYPES.experience}
				handleClose={handleClose}
			/>
			<ModalSkill
				data={candidateInfo}
				open={modalUpdating === CV_MODAL_TYPES.skill}
				handleClose={handleClose}
			/>
			<ModalReference
				data={candidateInfo}
				open={modalUpdating === CV_MODAL_TYPES.reference}
				handleClose={handleClose}
			/>
			<ModalCareerGoal
				data={candidateInfo}
				open={modalUpdating === CV_MODAL_TYPES.careerGoal}
				handleClose={handleClose}
			/>
			<ModalGeneralinfo
				data={candidateInfo}
				open={modalUpdating === CV_MODAL_TYPES.generalInfo}
				handleClose={handleClose}
			/>
			<ModalItSkill
				data={candidateInfo}
				open={modalUpdating === CV_MODAL_TYPES.itSkill}
				handleClose={handleClose}
			/>
			<ModalLanguage
				data={candidateInfo}
				open={modalUpdating === CV_MODAL_TYPES.language}
				handleClose={handleClose}
			/>
			<ModalSave
				open={modalUpdating === CV_MODAL_TYPES.save}
				handleClose={handleClose}
			/>
			<ModalAvatar
				open={modalUpdating === CV_MODAL_TYPES.avatar}
				handleClose={handleClose}
			/>
			<div className="bg-bgCv py-5">
				<div className="w-[1300px] mx-auto">
					<Grid container spacing={3}>
						<Grid item xs={8}>
							<CvTemplate
								data={candidateInfo}
								setEducationIndex={setEducationIndex}
								setExperienceIndex={setExperienceIndex}
								setModalUpdating={setModalUpdating}
								deleteEducation={deleteEducation}
								deleteExperience={deleteExperience}
							/>
						</Grid>
						<Grid item xs={4}>
							<Stack gap={2} className="pr-5">
								<div>
									<Button
										variant="contained"
										className="flex items-center !text-33 !bg-yellow2 h-9"
										fullWidth
										onClick={() => setModalUpdating(CV_MODAL_TYPES.save)}
									>
										<Save fontSize="small" />
										<div className="ml-1 h-5">Lưu hồ sơ</div>
									</Button>
								</div>
								<div className="rounded border border-55 text-bd py-3 px-5">
									<div className="text-white mb-4">Tips:</div>
									<Stack gap={1} className="text-sm">
										<div>
											<Edit fontSize="inherit" className="mr-4" />
											<span className="bg-note rounded px-1 mr-1 text-white">
												Lưu ý
											</span>
											<span className="underline text-[#eee]">
												Chỉnh sửa thông tin công việc mong muốn.
											</span>
										</div>
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Ấn trực tiếp vào các phần thông tin để chỉnh sửa.
										</div>
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Nhập đầy đủ các thông tin hiển thị trong hồ sơ.
										</div>
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Bấm nút
											<span className="text-[#eee] mx-1">“ Lưu hồ sơ ”</span>
											để lưu thông tin hồ sơ.
										</div>
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Hoặc bấm nút
											<span className="text-[#eee] mx-1">
												“ Tải xuống hồ sơ ”
											</span>
											để tải về file hồ sơ có định dạng PDF.
										</div>
									</Stack>
								</div>
								<div className="rounded border border-55 py-3 px-5">
									<div className="border-b pb-3 border-white text-white">
										Các mục cần làm
									</div>
									<Stack gap={1} className="text-sm text-ee py-5">
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Thông tin cá nhân
											<Info
												fontSize="inherit"
												className="text-ee float-right"
											/>
										</div>
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Thông tin hồ sơ
											<Info
												fontSize="inherit"
												className="text-ee float-right"
											/>
										</div>
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Kỹ năng bản thân
											<Info
												fontSize="inherit"
												className="text-ee float-right"
											/>
										</div>
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Mục tiêu nghề nghiệp
											<Info
												fontSize="inherit"
												className="text-ee float-right"
											/>
										</div>
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Học vấn bằng cấp
											<Info
												fontSize="inherit"
												className="text-ee float-right"
											/>
										</div>
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Kinh nghiệm làm việc
											<Info
												fontSize="inherit"
												className="text-ee float-right"
											/>
										</div>
									</Stack>
								</div>
							</Stack>
						</Grid>
					</Grid>
				</div>
			</div>
		</>
	);
};

export default CvLayout;
