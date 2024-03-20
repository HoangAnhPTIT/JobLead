"use client";
import { Check, Edit, Info, Save } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { Col, Row, Tooltip } from "antd";
import ModalGeneralInfo from "../Modal/ModalGeneralInfo";
import ModalSkill from "../Modal/ModalSkills";
import ModalEducation from "../Modal/ModalEducation";
import ModalExperience from "../Modal/ModalExperience";

const CvTemplateLayout = ({
	info,
	dataSelected,
	modalType,
	closeModal,
	children,
}) => {
	return (
		<>
			<div className="bg-bgCv p-5 min-h-[calc(100vh-64px)]">
				<div className="w-[1300px] mx-auto">
					<Row gutter={20}>
						<Col span={16} className="max-w-[794px]">
							{children}
						</Col>
						<Col span={8}>
							<div>
								<div className="mb-5">
									<Button
										variant="contained"
										className="flex items-center !text-33 !bg-yellow2 h-9"
										fullWidth
										// onClick={() =>
										// 	setModalUpdating(
										// 		expectationData?.id
										// 			? CV_MODAL_TYPES.save
										// 			: CV_MODAL_TYPES.expectation
										// 	)
										// }
									>
										<Save fontSize="small" />
										<div className="ml-1 h-5">Lưu hồ sơ</div>
									</Button>
								</div>
								<div className="rounded border border-55 text-bd py-3 px-5 mb-5">
									<div className="text-white mb-4">Tips:</div>
									<div className="text-sm">
										<div>
											<Edit fontSize="inherit" className="mr-4" />
											<span className="bg-note rounded px-1 mr-1 text-white">
												Lưu ý
											</span>
											<span
												className="underline text-[#eee] cursor-pointer"
												// onClick={() =>
												// 	setModalUpdating(CV_MODAL_TYPES.expectation)
												// }
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
									</div>
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
							</div>
						</Col>
					</Row>
				</div>
			</div>
			<ModalGeneralInfo
				data={info?.generalInfo}
				modalType={modalType}
				closeModal={closeModal}
			/>
			<ModalSkill
				data={info?.softSkill}
				modalType={modalType}
				closeModal={closeModal}
			/>
			<ModalEducation
				data={dataSelected}
				modalType={modalType}
				closeModal={closeModal}
			/>
			<ModalExperience
				data={dataSelected}
				modalType={modalType}
				closeModal={closeModal}
			/>
		</>
	);
};

export default CvTemplateLayout;
