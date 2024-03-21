import { StarFilled } from "@ant-design/icons";
import {
	Adjust,
	CalendarMonthOutlined,
	EmailOutlined,
	PhotoCamera,
	PlaceOutlined,
	SmartphoneOutlined,
	TransgenderOutlined,
} from "@mui/icons-material";
import { Stack } from "@mui/system";
import { Col, Flex, Image, Rate, Row } from "antd";
import { isEmpty } from "lodash";
import { CV_MODAL_TYPES } from "src/constants/cv";
import CvEditLayout from "../Common/CvEditLayout";
import CvAddLayout from "../Common/CvAddLayout";
import CvEditDeleteLayout from "../Common/CvEditDeleteLayout";
import NoDataYet from "../Common/NoDataYet";
import Fullname from "../Components/Generalnfo/Fullname";
import WorkTitle from "../Components/Generalnfo/WorkTitle";
import { Fragment } from "react";

const color = "#B31312";

const Cv1 = ({ info, onEditSection, onDeleteSection, setModalType }) => {
	return (
		<div className="bg-white">
			<div
				className="text-white h-[290px] px-5 py-10 flex"
				style={{ background: color }}
			>
				<div
					className="border-r-2 border-white w-fit px-10 h-full cursor-pointer"
					onClick={() => setModalType(CV_MODAL_TYPES.avatar)}
				>
					{info?.generalInfo?.avatar ? (
						<Image
							src={info?.generalInfo?.avatar}
							alt=""
							width={200}
							height="auto"
							preview={false}
							className="rounded-full"
						/>
					) : (
						<div className="p-5 bg-white rounded-full w-fit">
							<PhotoCamera style={{ fontSize: 160, color: "#333" }} />
						</div>
					)}
				</div>
				<div className="px-10">
					<CvEditLayout
						itemType={CV_MODAL_TYPES.generalInfo}
						setModalType={setModalType}
					>
						<Fullname fullName={info?.generalInfo?.fullName} css="text-white" />
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
							{!info?.career?.description && isEmpty(info?.career.items) ? (
								<NoDataYet />
							) : (
								<>
									{info?.career?.items?.map((item, i) => (
										<p key={i}>
											<StarFilled className="mr-2" />
											{item?.name}
										</p>
									))}
									<p className="mt-1">{info?.career?.description}</p>
								</>
							)}
						</div>
					</CvEditLayout>
				</div>
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
								<p>
									<EmailOutlined
										fontSize="small"
										className="mr-2"
										style={{ color }}
									/>
									{info?.generalInfo?.email}
								</p>
								<p>
									<SmartphoneOutlined
										fontSize="small"
										className="mr-2"
										style={{ color }}
									/>
									{info?.generalInfo?.phone}
								</p>
								<p>
									<CalendarMonthOutlined
										fontSize="small"
										className="mr-2"
										style={{ color }}
									/>
									{info?.generalInfo?.birthday}
								</p>
								<p>
									<TransgenderOutlined
										fontSize="small"
										className="mr-2"
										style={{ color }}
									/>
									{info?.generalInfo?.gender}
								</p>
								<p>
									<PlaceOutlined
										fontSize="small"
										className="mr-2"
										style={{ color }}
									/>
									{info?.generalInfo?.location}
								</p>
							</Stack>
						</CvEditLayout>
					</Col>
					<Col span={8}>
						<CvEditLayout
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
								{isEmpty(info?.activity) ? (
									<NoDataYet />
								) : (
									<Stack gap={1}>
										{info?.activity?.map((item, i) => (
											<CvEditDeleteLayout
												key={i}
												onEdit={() =>
													onEditSection(item, CV_MODAL_TYPES.activity)
												}
												onDelete={() =>
													onDeleteSection(item?.id, CV_MODAL_TYPES.activity)
												}
											>
												<strong>{item?.title}</strong>
												<p className="mt-2">{item?.description}</p>
											</CvEditDeleteLayout>
										))}
									</Stack>
								)}
							</div>
						</CvEditLayout>
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
								{!info?.softSkill?.description &&
								isEmpty(info?.softSkill?.items) ? (
									<NoDataYet />
								) : (
									<>
										<Stack gap={1}>
											{info?.softSkill?.items?.map((item, i) => (
												<p key={i}>
													<StarFilled className="mr-2" style={{ color }} />
													{item?.name}
												</p>
											))}
										</Stack>
										<p className="mt-1">{info?.softSkill?.description}</p>
									</>
								)}
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
													<p className="mt-2">
														<strong className="uppercase">
															{item?.certification}
														</strong>
													</p>
													<p className="mt-1">
														<strong className="mr-1">
															Trường, nơi đào tạo:
														</strong>
														{item?.school}
													</p>
													<p className="mt-1">
														<strong className="mr-1">Xếp loại:</strong>
														{item?.degree}
													</p>
													<p className="mt-1">
														<strong className="mr-1">Khoa:</strong>
														{item?.class}
													</p>
													<p className="mt-1">
														<strong className="mr-1">Ngành:</strong>
														{item?.major}
													</p>
													<p className="mt-1">
														<strong className="mr-1">Mô tả:</strong>
														{item?.description}
													</p>
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
													<p>{item?.description}</p>
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
							<Row gutter={[6, 6]} className="py-4 text-white">
								{isEmpty(info?.itSkill) ? (
									<NoDataYet />
								) : (
									<>
										{info.itSkill.map((item, i) => (
											<Fragment key={i}>
												<Col span={10}>{item?.name}</Col>
												<Flex>
													<Rate
														value={item?.star}
														disabled
														style={{ color: "white" }}
													/>
												</Flex>
											</Fragment>
										))}
									</>
								)}
							</Row>
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
							<Row gutter={[6, 6]} className="py-4 text-white">
								{isEmpty(info?.languageSkill) ? (
									<NoDataYet />
								) : (
									<>
										{info.languageSkill.map((item, i) => (
											<Fragment key={i}>
												<Col span={10}>{item?.name}</Col>
												<Flex>
													<Rate
														value={item?.star}
														disabled
														style={{ color: "white" }}
													/>
												</Flex>
											</Fragment>
										))}
									</>
								)}
							</Row>
						</CvEditLayout>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Cv1;
