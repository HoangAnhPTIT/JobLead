"use client";
import {
	Check,
	CheckCircle,
	Edit,
	HighlightOff,
	Info,
	Save,
} from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	httpAuthDelete,
	httpAuthGet,
	httpAuthPost,
	httpAuthPut,
} from "src/apis/apiAuthCaller";
import {
	apiCandidate,
	apiCandidateEducation,
	apiCandidateExpectation,
	apiCandidateExperience,
} from "src/apis/apiEndpoint";
import { CV_MODAL_TYPES, CV_TEMPLATES } from "src/constants/cv";
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
import { Col, Form, Modal, Row, Tooltip } from "antd";
import SelectAntd from "src/commons/AntdForm/SelectAntd";
import { getTimeValue } from "src/helper/format";
import { errorMessage } from "src/constants/common";

const CvTemplate = (props) => {
	const params = useParams();
	const action = params?.template;

	if (action === CV_TEMPLATES.pro) return <Pro {...props} />;

	return <Pro {...props} />;
};

const CvLayout = () => {
	const { entities } = useAppSelector((state) => state.entity);
	const dispatch = useAppDispatch();
	const [modalUpdating, setModalUpdating] = useState(null);
	const [candidateInfo, setCandidateInfo] = useState();
	const [educationIndex, setEducationIndex] = useState(null);
	const [experienceIndex, setExperienceIndex] = useState(null);
	const [expectationData, setExpectationData] = useState();

	const [form] = Form.useForm();

	const getCandidateInfo = async () => {
		const response = await httpAuthGet({ endpoint: apiCandidate });
		setCandidateInfo(response?.data);
	};

	const getDataExpectation = async () => {
		const response = await httpAuthGet({ endpoint: apiCandidateExpectation });
		setExpectationData(response?.data);
		form.setFieldsValue({
			...response?.data,
			dob: getTimeValue(response?.data?.dob),
		});
	};

	const handleClose = () => {
		getCandidateInfo();
		setModalUpdating(null);
		setEducationIndex(null);
		setExperienceIndex(null);
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

	const onSubmitExpectation = async () => {
		dispatch(updateLoading(true));
		try {
			const values = await form.validateFields();
			const response = expectationData?.id
				? await httpAuthPut({
						endpoint: apiCandidateExpectation,
						data: { ...expectationData, ...values },
				  })
				: await httpAuthPost({
						endpoint: apiCandidateExpectation,
						data: { ...expectationData, ...values },
				  });
			if (response.status === 200) {
				toast.success("Cập nhật thông tin thành công");
				setModalUpdating(null);
				getDataExpectation();
			} else {
				toast.error(errorMessage);
				console.error(response.message);
			}
		} catch (error) {
			console.error(error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		getDataExpectation();
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
			<div className="bg-bgCv py-5 min-h-[calc(100vh-64px)]">
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
							<Modal
								open={modalUpdating === CV_MODAL_TYPES.expectation}
								title="Thông tin bổ sung hồ sơ"
								width={760}
								onCancel={() => setModalUpdating(null)}
								footer={
									<>
										<Button
											variant="outlined"
											onClick={handleClose}
											className="flex items-center !border-33 !mr-5"
										>
											<HighlightOff fontSize="small" className="text-33" />
											<div className="h-5 ml-1 text-33">Hủy bỏ</div>
										</Button>
										<Button
											variant="contained"
											onClick={onSubmitExpectation}
											className="flex items-center"
										>
											<CheckCircle fontSize="small" />
											<div className="h-5 ml-1">Cập nhật thông tin</div>
										</Button>
									</>
								}
							>
								<div className="py-3 border-t border-b">
									<p className="text-red2">
										<strong>* Lưu ý</strong>: Dưới đây là những thông tin bắt
										buộc phải nhập trước khi lưu hồ sơ, các thông tin này không
										nằm trong CV của bạn
									</p>
									<Form form={form} layout="vertical">
										<Row gutter={16}>
											<Col span={12}>
												<SelectAntd
													form={Form}
													name="experienceId"
													label="Kinh nghiệm"
													rules={[{ required: true }]}
													list={entities?.Experience}
												/>
											</Col>
											<Col span={12}>
												<SelectAntd
													form={Form}
													name="degreeId"
													label="Trình độ học vấn"
													rules={[{ required: true }]}
													list={entities?.Degree}
												/>
											</Col>
											<Col span={12}>
												<SelectAntd
													form={Form}
													name="locationIds"
													label="Địa điểm làm việc"
													mode="multiple"
													rules={[{ required: true }]}
													list={entities?.City}
												/>
											</Col>
											<Col span={12}>
												<SelectAntd
													form={Form}
													name="careerIds"
													label="Ngành nghề"
													mode="multiple"
													rules={[{ required: true }]}
													list={entities?.Career}
												/>
											</Col>
											<Col span={24}>
												<SelectAntd
													form={Form}
													name="typeOfWorkIds"
													label="Loại hình công việc"
													mode="multiple"
													rules={[{ required: true }]}
													list={entities?.TypeOfWork}
												/>
											</Col>
											<Col span={12}>
												<SelectAntd
													form={Form}
													name="levelId"
													label="Cấp bậc"
													rules={[{ required: true }]}
													list={entities?.Level}
												/>
											</Col>
											<Col span={12}>
												<SelectAntd
													form={Form}
													name="salaryId"
													label="Mức lương"
													rules={[{ required: true }]}
													list={entities?.Salary}
												/>
											</Col>
										</Row>
									</Form>
								</div>
							</Modal>
							<Stack gap={2} className="pr-5">
								<div>
									<Button
										variant="contained"
										className="flex items-center !text-33 !bg-yellow2 h-9"
										fullWidth
										onClick={() =>
											setModalUpdating(
												expectationData?.id
													? CV_MODAL_TYPES.save
													: CV_MODAL_TYPES.expectation
											)
										}
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
											<span
												className="underline text-[#eee] cursor-pointer"
												onClick={() =>
													setModalUpdating(CV_MODAL_TYPES.expectation)
												}
											>
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
											<Tooltip
												placement="left"
												color="#fff"
												title={
													<div className="text-33">
														<p className="text-base font-semibold">
															Bao gồm các thông tin
														</p>
														<div>
															<p>- Địa chỉ email</p>
															<p>- Số điện thoại</p>
															<p>- Giới tính</p>
															<p>- Ngày sinh</p>
															<p>- Địa chỉ/nơi ở hiện tại</p>
														</div>
													</div>
												}
											>
												<Info
													fontSize="inherit"
													className="text-ee float-right cursor-pointer"
												/>
											</Tooltip>
										</div>
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Thông tin hồ sơ
											<Tooltip
												placement="left"
												color="#fff"
												title={
													<div className="text-33">
														<p className="text-base font-semibold">
															Bao gồm các thông tin
														</p>
														<div>
															<p>- Vị trí ứng tuyển</p>
															<p>- Số năm kinh nghiệm</p>
															<p>- Trình độ học vấn</p>
														</div>
													</div>
												}
											>
												<Info
													fontSize="inherit"
													className="text-ee float-right cursor-pointer"
												/>
											</Tooltip>
										</div>
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Kỹ năng bản thân
											<Tooltip
												placement="left"
												color="#fff"
												title={
													<div className="text-33">
														<p className="text-base font-semibold">
															Bao gồm các thông tin
														</p>
														<div>
															<p>
																Mô tả các kĩ năng chuyên môn trong công việc của
																bạn
															</p>
														</div>
													</div>
												}
											>
												<Info
													fontSize="inherit"
													className="text-ee float-right cursor-pointer"
												/>
											</Tooltip>
										</div>
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Mục tiêu nghề nghiệp
											<Tooltip
												placement="left"
												color="#fff"
												title={
													<div className="text-33">
														<p className="text-base font-semibold">
															Bao gồm các thông tin
														</p>
														<div>
															<p>
																Mô tả, giới thiệu về định hướng công việc của
																bản thân trong tương lai ngắn hạn hoặc dài hạn
															</p>
														</div>
													</div>
												}
											>
												<Info
													fontSize="inherit"
													className="text-ee float-right cursor-pointer"
												/>
											</Tooltip>
										</div>
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Học vấn bằng cấp
											<Tooltip
												placement="left"
												color="#fff"
												title={
													<div className="text-33">
														<p className="text-base font-semibold">
															Bao gồm các thông tin
														</p>
														<div>
															<p>
																Thông tin các chứng chỉ, bằng cấp, học vấn của
																bạn
															</p>
														</div>
													</div>
												}
											>
												<Info
													fontSize="inherit"
													className="text-ee float-right cursor-pointer"
												/>
											</Tooltip>
										</div>
										<div>
											<Check fontSize="inherit" className="mr-4" />
											Kinh nghiệm làm việc
											<Tooltip
												placement="left"
												color="#fff"
												title={
													<div className="text-33">
														<p className="text-base font-semibold">
															Bao gồm các thông tin
														</p>
														<div>
															<p>
																Thông tin những kinh nghiệm làm việc của bạn tại
																các công ty trước đây
															</p>
														</div>
													</div>
												}
											>
												<Info
													fontSize="inherit"
													className="text-ee float-right cursor-pointer"
												/>
											</Tooltip>
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
