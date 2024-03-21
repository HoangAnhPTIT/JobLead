import { StarFilled } from "@ant-design/icons";
import {
	CalendarMonth,
	Check,
	Circle,
	Email,
	PhoneEnabled,
	PhotoCamera,
	Place,
	Transgender,
} from "@mui/icons-material";
import { Stack } from "@mui/system";
import { Col, Flex, Image, Rate, Row } from "antd";
import { isEmpty } from "lodash";
import { Fragment } from "react";
import ShowDescription from "src/commons/ShowDescription";
import { CV_MODAL_TYPES } from "src/constants/cv";
import CvAddLayout from "../Common/CvAddLayout";
import CvEditDeleteLayout from "../Common/CvEditDeleteLayout";
import CvEditLayout from "../Common/CvEditLayout";
import NoDataYet from "../Common/NoDataYet";

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
							{info?.generalInfo?.avatar ? (
								<Image
									src={info?.generalInfo?.avatar}
									alt=""
									width={150}
									height="auto"
									preview={false}
								/>
							) : (
								<PhotoCamera style={{ fontSize: 120, color: "#333" }} />
							)}
						</div>
					</div>
				</Col>
				<Col span={16}>
					<CvEditLayout
						itemType={CV_MODAL_TYPES.generalInfo}
						setModalType={setModalType}
					>
						<div className="text-3xl">
							{info?.generalInfo?.fullName ? (
								<span>{info?.generalInfo?.fullName}</span>
							) : (
								<span className="text-placeholder">Tên của bạn</span>
							)}
						</div>
						<div className="text-lg text-33">
							{info?.generalInfo?.workTitle ? (
								<span>{info?.generalInfo?.workTitle}</span>
							) : (
								<span className="text-placeholder">
									Vị trí công việc bạn muốn ứng tuyển
								</span>
							)}
						</div>
						<div className="mt-4 grid grid-cols-2">
							<div className="text-33 flex gap-2 mt-2">
								<Transgender fontSize="small" style={{ color }} />
								<div className="flex-1 text-sm">
									{info?.generalInfo?.gender?.name ? (
										<span>{info?.generalInfo?.gender?.name}</span>
									) : (
										<span className="text-placeholder">Giới tính</span>
									)}
								</div>
							</div>
							<div className="text-33 flex gap-2 mt-2">
								<CalendarMonth fontSize="small" style={{ color }} />
								<div className="flex-1 text-sm">
									{info?.generalInfo?.birthdayi ? (
										<span>{info?.generalInfo?.birthday}</span>
									) : (
										<span className="text-placeholder">Ngày sinh</span>
									)}
								</div>
							</div>
							<div className="text-33 flex gap-2 mt-2">
								<PhoneEnabled fontSize="small" style={{ color }} />
								<div className="flex-1 text-sm">
									{info?.generalInfo?.phone ? (
										<span>{info?.generalInfo?.phone}</span>
									) : (
										<span className="text-placeholder">Số điện thoại</span>
									)}
								</div>
							</div>
							<div className="text-33 flex gap-2 mt-2">
								<Email fontSize="small" style={{ color }} />
								<div className="flex-1 text-sm">
									{info?.generalInfo?.email ? (
										<span>{info?.generalInfo?.email}</span>
									) : (
										<span className="text-placeholder">Email</span>
									)}
								</div>
							</div>
							<div className="text-33 flex gap-2 mt-2">
								<Place fontSize="small" style={{ color }} />
								<div className="flex-1 text-sm">
									{info?.generalInfo?.location ? (
										<span>{info?.generalInfo?.location}</span>
									) : (
										<span className="text-placeholder">Địa chỉ</span>
									)}
								</div>
							</div>
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
									{!info?.career?.description && isEmpty(info?.career.items) ? (
										<NoDataYet />
									) : (
										<>
											{info?.career?.items?.map((item, i) => (
												<p key={i}>
													<Check
														className="mr-2"
														fontSize="small"
														style={{ color }}
													/>
													{item?.name}
												</p>
											))}
											<div className="mt-1">
												<ShowDescription
													description={info?.career?.description}
												/>
											</div>
										</>
									)}
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
								<Row gutter={[6, 6]} className="py-4">
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
															style={{ color }}
														/>
													</Flex>
												</Fragment>
											))}
										</>
									)}
								</Row>
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
								<Row gutter={[6, 6]} className="py-4 ">
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
															style={{ color }}
														/>
													</Flex>
												</Fragment>
											))}
										</>
									)}
								</Row>
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
											<div className="mt-1">
												<ShowDescription
													description={info?.softSkill?.description}
												/>
											</div>
										</>
									)}
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
