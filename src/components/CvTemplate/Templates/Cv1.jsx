import { StarFilled } from "@ant-design/icons";
import {
	Adjust,
	CalendarMonthOutlined,
	EmailOutlined,
	PlaceOutlined,
	SmartphoneOutlined,
	TransgenderOutlined,
} from "@mui/icons-material";
import { Stack } from "@mui/system";
import { Col, Row } from "antd";
import { isEmpty } from "lodash";
import ShowDescription from "src/commons/ShowDescription";
import { CV_MODAL_TYPES } from "src/constants/cv";
import CvAddLayout from "../Common/CvAddLayout";
import CvEditDeleteLayout from "../Common/CvEditDeleteLayout";
import CvEditLayout from "../Common/CvEditLayout";
import NoDataYet from "../Common/NoDataYet";
import AvatarImage from "../Components/Generalnfo/AvatarImage";
import Fullname from "../Components/Generalnfo/Fullname";
import PrivateInfo from "../Components/Generalnfo/PrivateInfo";
import WorkTitle from "../Components/Generalnfo/WorkTitle";
import Activity from "../Components/OtherInfo/Activity";
import Career from "../Components/OtherInfo/Career";
import Education from "../Components/OtherInfo/Education";
import RateInfo from "../Components/OtherInfo/RateInfo";
import Skill from "../Components/OtherInfo/Skill";

const color = "#B31312";

const Cv1 = ({ info, onEditSection, onDeleteSection, setModalType }) => {
	return (
		<div className="bg-white">
			<div
				className="text-white h-[290px] px-5 py-10 flex"
				style={{ background: color }}
			>
				<Row gutter={16}>
					<Col span={10}>
						<div className="flex justify-center border-r-2 border-white">
							<div
								className="w-fit px-10 h-full cursor-pointer rounded-full overflow-hidden"
								onClick={() => setModalType(CV_MODAL_TYPES.avatar)}
							>
								<AvatarImage
									avatar={info?.generalInfo?.avatar}
									size={200}
									css="rounded-full"
								/>
							</div>
						</div>
					</Col>
					<Col span={14}>
						<div className="px-10">
							<CvEditLayout
								itemType={CV_MODAL_TYPES.generalInfo}
								setModalType={setModalType}
							>
								<Fullname
									fullName={info?.generalInfo?.fullName}
									css="text-white"
								/>
								<WorkTitle
									workTitle={info?.generalInfo?.workTitle}
									css="text-white"
								/>
							</CvEditLayout>
							<CvEditLayout
								itemType={CV_MODAL_TYPES.careerGoal}
								setModalType={setModalType}
							>
								<div className="pt-5">
									<Career info={info?.career} icon={<StarFilled />} />
								</div>
							</CvEditLayout>
						</div>
					</Col>
				</Row>
			</div>
			<div className="h-2.5 bg-de"></div>
			<div className="p-4">
				<Row gutter={30}>
					<Col span={8}>
						<CvEditLayout
							itemType={CV_MODAL_TYPES.generalInfo}
							setModalType={setModalType}
						>
							<div
								className="border-b-[3px] pb-1 border-de text-xl font-bold text-center"
								style={{ color }}
							>
								LIÊN HỆ
							</div>
							<Stack gap={2} className="py-4 px-2">
								<PrivateInfo
									info={info?.generalInfo?.email}
									icon={
										<EmailOutlined
											fontSize="small"
											className="mr-2"
											style={{ color }}
										/>
									}
									label="Email"
								/>
								<PrivateInfo
									icon={
										<SmartphoneOutlined
											fontSize="small"
											className="mr-2"
											style={{ color }}
										/>
									}
									info={info?.generalInfo?.phone}
									label="Số điện thoại"
								/>
								<PrivateInfo
									info={info?.generalInfo?.birthday}
									icon={
										<CalendarMonthOutlined
											fontSize="small"
											className="mr-2"
											style={{ color }}
										/>
									}
									label="Ngày sinh"
								/>
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
									icon={
										<PlaceOutlined
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
					</Col>
					<Col span={8}>
						<CvAddLayout
							itemType={CV_MODAL_TYPES.activity}
							setModalType={setModalType}
						>
							<div
								className="border-b-[3px] pb-1 border-de text-xl font-bold text-center"
								style={{ color }}
							>
								HOẠT ĐỘNG
							</div>
							<div className="py-4 px-2">
								<Activity
									info={info?.activity}
									onEdit={onEditSection}
									onDelete={onDeleteSection}
								/>
							</div>
						</CvAddLayout>
					</Col>
					<Col span={8}>
						<CvEditLayout
							itemType={CV_MODAL_TYPES.skill}
							setModalType={setModalType}
						>
							<div
								className="border-b-[3px] pb-1 border-de text-xl font-bold text-center"
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
					</Col>
				</Row>
			</div>
			<div className="p-4">
				<Row gutter={36}>
					<Col span={12}>
						<CvAddLayout
							itemType={CV_MODAL_TYPES.education}
							setModalType={setModalType}
						>
							<div
								className="border-b-[3px] pb-1 border-de text-xl font-bold text-center"
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
												<div className="absolute -top-1 -left-[5px]">
													<Adjust fontSize="small" />
												</div>
												<div className="border-l-2 pl-4 pb-4">
													<p>{item?.period}</p>
													{<Education info={item} />}
												</div>
											</div>
										</CvEditDeleteLayout>
									))
								)}
							</div>
						</CvAddLayout>
					</Col>
					<Col span={12}>
						<CvAddLayout
							itemType={CV_MODAL_TYPES.experience}
							setModalType={setModalType}
						>
							<div
								className="border-b-[3px] pb-1 border-de text-xl font-bold text-center"
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
												<div className="absolute top-8 -left-[5px]">
													<Adjust fontSize="small" />
												</div>
												<div className="border-l-2 pl-4 pb-4">
													<p>
														<strong
															className="uppercase text-lg"
															style={{ color }}
														>
															{item?.company}
														</strong>
													</p>
													<p className="mt-1">
														<strong className="mr-1">Vị trí:</strong>
														{item?.title}
													</p>
													<p>{item?.period}</p>
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
					</Col>
				</Row>
			</div>
			<div className="h-2.5 bg-de"></div>
			<div style={{ background: color }} className="p-5">
				<Row gutter={36}>
					<Col span={12}>
						<CvEditLayout
							itemType={CV_MODAL_TYPES.itSkill}
							setModalType={setModalType}
						>
							<div className="border-b-[3px] pb-1 border-white text-white text-xl font-bold">
								TIN HỌC
							</div>
							<div className="py-4 text-white">
								<RateInfo info={info?.itSkill} iconColor="#fff" />
							</div>
						</CvEditLayout>
					</Col>
					<Col span={12}>
						<CvEditLayout
							itemType={CV_MODAL_TYPES.language}
							setModalType={setModalType}
						>
							<div className="border-b-[3px] pb-1 border-white text-white text-xl font-bold">
								NGOẠI NGỮ
							</div>
							<div className="py-4 text-white">
								<RateInfo info={info?.languageSkill} color="#fff" />
							</div>
						</CvEditLayout>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Cv1;
