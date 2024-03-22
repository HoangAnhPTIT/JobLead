import { StarFilled } from "@ant-design/icons";
import {
	BorderColor,
	CalendarMonth,
	Check,
	CheckCircle,
	Circle,
	Email,
	FolderShared,
	PhoneEnabled,
	Place,
	School,
	TransgenderOutlined,
} from "@mui/icons-material";
import { Col, Row } from "antd";
import { isEmpty } from "lodash";
import ShowDescription from "src/commons/ShowDescription";
import { CV_MODAL_TYPES } from "src/constants/cv";
import CvAddLayout from "../Common/CvAddLayout";
import CvEditDeleteLayout from "../Common/CvEditDeleteLayout";
import CvEditLayout from "../Common/CvEditLayout";
import NoDataYet from "../Common/NoDataYet";
import AvatarImage from "../Components/Generalnfo/AvatarImage";
import PrivateInfo from "../Components/Generalnfo/PrivateInfo";
import Career from "../Components/OtherInfo/Career";
import RateInfo from "../Components/OtherInfo/RateInfo";
import Skill from "../Components/OtherInfo/Skill";
import Education from "../Components/OtherInfo/Education";
import Fullname from "../Components/Generalnfo/Fullname";
import WorkTitle from "../Components/Generalnfo/WorkTitle";
import { Stack } from "@mui/material";

const color = "#009ce0";

const Cv3 = ({ info, onEditSection, onDeleteSection, setModalType }) => {
	return (
		<div className="bg-white p-5">
			<Row gutter={60}>
				<Col span={13}>
					<div className="px-14">
						<CvEditLayout
							itemType={CV_MODAL_TYPES.generalInfo}
							setModalType={setModalType}
						>
							<Fullname fullName={info?.generalInfo?.fullName} css="text-4xl" />
							<WorkTitle
								workTitle={info?.generalInfo?.workTitle}
								css="mt-3 text-lg"
							/>
						</CvEditLayout>
					</div>
					<div className="mt-10">
						<CvAddLayout
							itemType={CV_MODAL_TYPES.education}
							setModalType={setModalType}
						>
							<div className="text-xl" style={{ color }}>
								<School style={{ color, fontSize: 50 }} className="mr-2" />
								HỌC VẤN
							</div>
							<div className="px-5">
								{isEmpty(info?.education) ? (
									<NoDataYet />
								) : (
									info?.education?.map((item, i) => (
										<CvEditDeleteLayout
											key={i}
											onEdit={() =>
												onEditSection(item, CV_MODAL_TYPES.education)
											}
											onDelete={() =>
												onDeleteSection(item?.id, CV_MODAL_TYPES.education)
											}
										>
											<div className="px-1 relative">
												<div className="absolute top-1 -left-[2px]">
													<Circle fontSize="inherit" style={{ color }} />
												</div>
												<div
													className="border-l-[1px] pl-4 pb-2"
													style={{ borderColor: "#ccc" }}
												>
													<div className="pt-2 ">
														<div
															style={{ background: color, lineHeight: "20px" }}
															className="text-white w-fit px-3 rounded-r ml-5 relative "
														>
															<div
																className="absolute w-3.5 h-3.5 -left-[7px] top-[3px] rotate-45"
																style={{ background: color }}
															/>
															{item?.period}
														</div>
														<div className="pl-5">
															{<Education info={item} />}
														</div>
													</div>
												</div>
											</div>
										</CvEditDeleteLayout>
									))
								)}
							</div>
						</CvAddLayout>
					</div>
					<div className="mt-2">
						<CvAddLayout
							itemType={CV_MODAL_TYPES.experience}
							setModalType={setModalType}
						>
							<div className="text-xl" style={{ color }}>
								<FolderShared
									style={{ color, fontSize: 50 }}
									className="mr-2"
								/>
								KINH NGHIỆM LÀM VIỆC
							</div>
							<div className="px-5">
								{isEmpty(info?.experience) ? (
									<NoDataYet />
								) : (
									info?.experience?.map((item, i) => (
										<CvEditDeleteLayout
											key={i}
											onEdit={() =>
												onEditSection(item, CV_MODAL_TYPES.experience)
											}
											onDelete={() =>
												onDeleteSection(item?.id, CV_MODAL_TYPES.experience)
											}
										>
											<div className="px-1 relative">
												<div className="absolute top-1 -left-[2px]">
													<Circle fontSize="inherit" style={{ color }} />
												</div>
												<div
													className="border-l-[1px] pl-4 pb-2"
													style={{ borderColor: "#ccc" }}
												>
													<div className="pt-2 ">
														<div
															style={{ background: color, lineHeight: "20px" }}
															className="text-white w-fit px-3 rounded-r ml-5 relative "
														>
															<div
																className="absolute w-3.5 h-3.5 -left-[7px] top-[3px] rotate-45"
																style={{ background: color }}
															/>
															{item?.period}
														</div>
														<div className="ml-5 mt-2">
															<p className="font-semibold text-base">
																{item?.company}
															</p>
															<p>
																<strong className="mr-1">Vị trí:</strong>
																{item?.title}
															</p>
															<p className="mt-1">
																<strong className="mr-1">Mô tả:</strong>
															</p>
															<ShowDescription
																description={item?.description}
															/>
														</div>
													</div>
												</div>
											</div>
										</CvEditDeleteLayout>
									))
								)}
							</div>
						</CvAddLayout>
					</div>
					<div className="mt-2">
						<CvEditLayout
							itemType={CV_MODAL_TYPES.skill}
							setModalType={setModalType}
						>
							<div className="text-xl" style={{ color }}>
								<BorderColor style={{ color, fontSize: 50 }} className="mr-2" />
								KỸ NĂNG
							</div>
							<div className="px-5">
								<div className="px-1 relative">
									<div className="absolute top-1 -left-[2px]">
										<Circle fontSize="inherit" style={{ color }} />
									</div>
									<div
										className="border-l-[1px] pl-4 pb-2"
										style={{ borderColor: "#ccc" }}
									>
										<div className="px-5">
											<Skill
												info={info?.softSkill}
												icon={
													<CheckCircle fontSize="small" style={{ color }} />
												}
											/>
										</div>
									</div>
								</div>
							</div>
						</CvEditLayout>
					</div>
				</Col>
				<Col span={11}>
					<div className="w-fit bg-white border-[6px] border-[#9bd6f0] rounded-full overflow-hidden">
						<AvatarImage
							setModalType={setModalType}
							avatar={info?.generalInfo?.avatar}
							defaultColor="#ccc"
						/>
					</div>
					<div className="mt-5">
						<CvEditLayout
							itemType={CV_MODAL_TYPES.careerGoal}
							setModalType={setModalType}
						>
							<div className="text-xl" style={{ color }}>
								Mục tiêu nghề nghiệp
							</div>
							<div className="pt-2">
								<Career
									info={info?.career}
									icon={<Check fontSize="small" style={{ color }} />}
								/>
							</div>
						</CvEditLayout>
					</div>
					<div className="mt-5 border-t pt-4">
						<CvEditLayout
							itemType={CV_MODAL_TYPES.generalInfo}
							setModalType={setModalType}
						>
							<div className="text-xl" style={{ color }}>
								Thông tin cá nhân
							</div>
							<Stack gap={1.5} className="mt-3">
								<PrivateInfo
									icon={
										<TransgenderOutlined
											fontSize="small"
											className="mr-2"
											style={{ color }}
										/>
									}
									info={info?.generalInfo?.gender}
									label="Giới tính"
								/>
								<PrivateInfo
									info={info?.generalInfo?.birthday}
									icon={
										<CalendarMonth
											fontSize="small"
											className="mr-2"
											style={{ color }}
										/>
									}
									label="Ngày sinh"
								/>
								<PrivateInfo
									icon={
										<PhoneEnabled
											fontSize="small"
											className="mr-2"
											style={{ color }}
										/>
									}
									info={info?.generalInfo?.phone}
									label="Số điện thoại"
								/>
								<PrivateInfo
									info={info?.generalInfo?.email}
									icon={
										<Email
											fontSize="small"
											className="mr-2"
											style={{ color }}
										/>
									}
									label="Email"
								/>
								<PrivateInfo
									icon={
										<Place
											fontSize="small"
											className="mr-2"
											style={{ color }}
										/>
									}
									info={info?.generalInfo?.location}
									label="Địa chỉ"
								/>
							</Stack>
						</CvEditLayout>
					</div>
					<div className="mt-5 border-t pt-4">
						<CvEditLayout
							itemType={CV_MODAL_TYPES.itSkill}
							setModalType={setModalType}
						>
							<div className="text-xl" style={{ color }}>
								Tin học
							</div>
							<RateInfo info={info?.itSkill} iconColor={color} />
						</CvEditLayout>
					</div>
					<div className="mt-5 border-t pt-4">
						<CvEditLayout
							itemType={CV_MODAL_TYPES.language}
							setModalType={setModalType}
						>
							<div className="text-xl" style={{ color }}>
								Ngoại ngữ
							</div>
							<RateInfo info={info?.languageSkill} iconColor={color} />
						</CvEditLayout>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Cv3;
