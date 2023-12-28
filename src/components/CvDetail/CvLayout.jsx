"use client";
import { Button, Grid, Stack } from "@mui/material";
import { useState } from "react";
import { CV_MODAL_TYPES } from "src/constants/cv";
import ModalEducation from "./CvModal/ModalEducation";
import ModalExperience from "./CvModal/ModalExperience";
import ModalSkill from "./CvModal/ModalSkill";
import ModalReference from "./CvModal/ModalReference";
import ModalCareerGoal from "./CvModal/ModalCareerGoal";
import ModalGeneralinfo from "./CvModal/ModalGeneralInfo";
import { Check, Edit, Save } from "@mui/icons-material";

const CvLayout = () => {
	const [modalUpdating, setModalUpdating] = useState(null);

	const handleClose = () => {
		setModalUpdating(null);
	};

	return (
		<>
			<ModalEducation
				open={modalUpdating === CV_MODAL_TYPES.education}
				handleClose={handleClose}
			/>
			<ModalExperience
				open={modalUpdating === CV_MODAL_TYPES.experience}
				handleClose={handleClose}
			/>
			<ModalSkill
				open={modalUpdating === CV_MODAL_TYPES.skill}
				handleClose={handleClose}
			/>
			<ModalReference
				open={modalUpdating === CV_MODAL_TYPES.reference}
				handleClose={handleClose}
			/>
			<ModalCareerGoal
				open={modalUpdating === CV_MODAL_TYPES.careerGoal}
				handleClose={handleClose}
			/>
			<ModalGeneralinfo
				open={modalUpdating === CV_MODAL_TYPES.generalInfo}
				handleClose={handleClose}
			/>
			<div className="bg-bgCv py-5">
				<div className="w-[1300px] mx-auto">
					<Grid container>
						<Grid item xs={8}></Grid>
						<Grid item xs={4}>
							<Stack gap={2}>
								<div>
									<Button
										variant="contained"
										className="flex items-center !text-33 !bg-yellow2 h-9"
										fullWidth
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
									<div></div>
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
