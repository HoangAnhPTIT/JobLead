import { StarFilled } from "@ant-design/icons";
import {
	CalendarMonth,
	Check,
	Circle,
	Email,
	PhoneEnabled,
	Place,
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

const color = "#009ce0";

const Cv2 = ({ info, onEditSection, onDeleteSection, setModalType }) => {
	return (
		<div className="bg-white">
			<Row className="bg-[#d3f2ff] border-b border-b-[10px] border-b-primary p-5">
				<Col span={8}>
					<div className="flex justify-center">
						<div
							className="w-fit cursor-pointer p-5 bg-white border-[6px] border-[#9bd6f0] rounded-full overflow-hidden"
							onClick={() => setModalType(CV_MODAL_TYPES.avatar)}
						>
							<AvatarImage avatar={info?.generalInfo?.avatar} />
						</div>
					</div>
				</Col>
				<Col span={16}>
					<CvEditLayout
						itemType={CV_MODAL_TYPES.generalInfo}
						setModalType={setModalType}
					>
						<Fullname fullName={info?.generalInfo?.fullName} css="text-white" />
						<WorkTitle workTitle={info?.generalInfo?.workTitle} css="text-33" />
						<div className="mt-4 grid grid-cols-2 gap-1">
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
									<Email fontSize="small" className="mr-2" style={{ color }} />
								}
								label="Email"
							/>
							<PrivateInfo
								icon={
									<Place fontSize="small" className="mr-2" style={{ color }} />
								}
								info={info?.generalInfo?.location}
								label="Địa chỉ"
							/>
						</div>
					</CvEditLayout>
				</Col>
			</Row>
			<div className="px-8 py-10 bg-[#eaeaea]">
				<Row gutter={[60]}>
					<Col span={12}>
						<div>
							<CvEditLayout
								itemType={CV_MODAL_TYPES.careerGoal}
								setModalType={setModalType}
							>
								<div
									className="text-xl font-semibold underline underline-offset-8"
									style={{ color }}
								>
									MỤC TIÊU NGHỀ NGHIỆP
								</div>
								<div className="pt-5">
									<Career
										info={info?.career}
										icon={<Check fontSize="small" style={{ color }} />}
									/>
								</div>
							</CvEditLayout>
						</div>
						<div className="mt-5">
							<CvAddLayout
								itemType={CV_MODAL_TYPES.education}
								setModalType={setModalType}
							>
								<div
									className="text-xl font-semibold underline underline-offset-8"
									style={{ color }}
								>
									HỌC VẤN
								</div>
								<div className="py-4">
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
													<div className="absolute -top-2 -left-[5px]">
														<Circle fontSize="small" style={{ color }} />
													</div>
													<div
														className="border-l-2 pl-4 pb-4"
														style={{ borderColor: color }}
													>
														<p
															style={{ color }}
															className="font-semibold text-base"
														>
															{item?.period}
														</p>
														{<Education info={item} />}
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
								<div
									className="text-xl font-semibold underline underline-offset-8"
									style={{ color }}
								>
									KINH NGHIỆM LÀM VIỆC
								</div>
								<div className="py-4">
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
													<div className="absolute -top-2 -left-[5px]">
														<Circle fontSize="small" style={{ color }} />
													</div>
													<div
														className="border-l-2 pl-4 pb-4"
														style={{ borderColor: color }}
													>
														<p className="mb-3">
															<strong style={{ color }}>{item?.period}</strong>
														</p>
														<p className="font-semibold text-base">
															{item?.company}
														</p>
														<p className="text-lg" style={{ color }}>
															{item?.title}
														</p>
														<p className="mt-1">
															<strong className="mr-1">Mô tả:</strong>
														</p>
														<ShowDescription description={item?.description} />
													</div>
												</div>
											</CvEditDeleteLayout>
										))
									)}
								</div>
							</CvAddLayout>
						</div>
					</Col>
					<Col span={12}>
						<div>
							<CvEditLayout
								itemType={CV_MODAL_TYPES.itSkill}
								setModalType={setModalType}
							>
								<div
									className="text-xl font-semibold underline underline-offset-8"
									style={{ color }}
								>
									TIN HỌC
								</div>
								<div className="py-4">
									<RateInfo info={info?.itSkill} iconColor={color} />
								</div>
							</CvEditLayout>
						</div>
						<div className="mt-2">
							<CvEditLayout
								itemType={CV_MODAL_TYPES.language}
								setModalType={setModalType}
							>
								<div
									className="text-xl font-semibold underline underline-offset-8"
									style={{ color }}
								>
									NGOẠI NGỮ
								</div>
								<div className="py-4">
									<RateInfo info={info?.languageSkill} iconColor={color} />
								</div>
							</CvEditLayout>
						</div>
						<div className="mt-2">
							<CvEditLayout
								itemType={CV_MODAL_TYPES.skill}
								setModalType={setModalType}
							>
								<div
									className="text-xl font-semibold underline underline-offset-8"
									style={{ color }}
								>
									KỸ NĂNG
								</div>
								<div className="py-4 px-2">
									<Skill
										info={info?.softSkill}
										icon={<StarFilled style={{ color }} />}
									/>
								</div>
							</CvEditLayout>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Cv2;
