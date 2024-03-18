import {
	CalendarMonth,
	Check,
	Edit,
	Email,
	PhoneEnabled,
	PhotoCamera,
	Place,
	Star,
	StarOutline,
	Transgender,
} from "@mui/icons-material";
import { Grid, Rating } from "@mui/material";
import { Image } from "antd";
import classNames from "classnames";
import { isEmpty } from "lodash";
import { CV_MODAL_TYPES } from "src/constants/cv";
import { getDate } from "src/helper/format";
import NoDataYet from "../../NoDataYet";
import Education from "./Education";
import Experience from "./Experience";
import Skill from "./Skill";
import styles from "./styles.module.scss";

const color = "#009ce0";

const Pro = ({
	data,
	readOnly = false,
	setEducationIndex,
	setExperienceIndex,
	setModalUpdating,
	deleteEducation,
	deleteExperience,
}) => {
	return (
		<div className={classNames("bg-white", styles.pro)}>
			<div>
				<div
					className={classNames(
						"text-xl flex justify-between text-xl relative",
						styles.cvItem
					)}
					style={{ color }}
				>
					<Edit
						fontSize="medium"
						className={classNames(
							"text-right self-center !hidden cursor-pointer absolute right-5 top-5 text-green-500",
							!readOnly && styles.editIcon
						)}
						onClick={() =>
							!readOnly && setModalUpdating(CV_MODAL_TYPES.generalInfo)
						}
					/>
					<Grid
						container
						className="bg-[#d3f2ff] border-b border-b-[10px] border-b-primary p-5"
					>
						<Grid item xs={4} className="flex justify-center">
							<div
								className="w-fit cursor-pointer p-5 bg-white border-[6px] border-[#9bd6f0] rounded-full overflow-hidden"
								onClick={() =>
									!readOnly && setModalUpdating(CV_MODAL_TYPES.avatar)
								}
							>
								{data?.avatar ? (
									<Image
										src={data?.avatar}
										alt=""
										width={150}
										height="auto"
										preview={false}
									/>
								) : (
									<PhotoCamera style={{ fontSize: 120, color: "#333" }} />
								)}
							</div>
						</Grid>
						<Grid item xs={8}>
							<div className="text-3xl">
								{data?.fullName ? (
									<span>{data?.fullName}</span>
								) : (
									<span className="text-placeholder">Tên của bạn</span>
								)}
							</div>
							<div className="text-lg text-33">
								{data?.workTitle ? (
									<span>{data?.workTitle}</span>
								) : (
									<span className="text-placeholder">
										Vị trí công việc bạn muốn ứng tuyển
									</span>
								)}
							</div>

							<div className="grid grid-cols-2">
								<div className="text-33 flex gap-2 mt-2">
									<Transgender fontSize="inherit" style={{ color }} />
									<div className="flex-1 text-sm">
										{data?.gender?.name ? (
											<span>{data?.gender?.name}</span>
										) : (
											<span className="text-placeholder">Giới tính</span>
										)}
									</div>
								</div>
								<div className="text-33 flex gap-2 mt-2">
									<CalendarMonth fontSize="inherit" style={{ color }} />
									<div className="flex-1 text-sm">
										{data?.dob ? (
											<span>{getDate(data?.dob)}</span>
										) : (
											<span className="text-placeholder">Ngày sinh</span>
										)}
									</div>
								</div>
								<div className="text-33 flex gap-2 mt-2">
									<PhoneEnabled fontSize="inherit" style={{ color }} />
									<div className="flex-1 text-sm">
										{data?.phone ? (
											<span>{data?.phone}</span>
										) : (
											<span className="text-placeholder">Số điện thoại</span>
										)}
									</div>
								</div>
								<div className="text-33 flex gap-2 mt-2">
									<Email fontSize="inherit" style={{ color }} />
									<div className="flex-1 text-sm">
										{data?.email ? (
											<span>{data?.email}</span>
										) : (
											<span className="text-placeholder">Email</span>
										)}
									</div>
								</div>
								<div className="text-33 flex gap-2 mt-2">
									<Place fontSize="inherit" style={{ color }} />
									<div className="flex-1 text-sm">
										{data?.location ? (
											<span>{data?.location}</span>
										) : (
											<span className="text-placeholder">Địa chỉ</span>
										)}
									</div>
								</div>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
			<Grid container className="px-8 py-10 bg-[#eaeaea]">
				<Grid item xs={7} className="pr-5">
					<div>
						<div>
							<div
								className={classNames(
									"text-xl flex justify-between pr-5 underline underline-offset-8 font-semibold uppercase mb-5",
									styles.cvItem
								)}
								style={{ color }}
							>
								<div>Mục tiêu nghề nghiệp</div>
								<Edit
									fontSize="medium"
									className={classNames(
										"text-right self-center !hidden cursor-pointer text-green-500",
										!readOnly && styles.editIcon
									)}
									onClick={() =>
										!readOnly && setModalUpdating(CV_MODAL_TYPES.careerGoal)
									}
								/>
							</div>
							{isEmpty(data?.candidateCareerGoals) &&
							isEmpty(data?.careerGoalDescription) ? (
								<NoDataYet />
							) : (
								<div className="text-33 text-sm">
									{data?.candidateCareerGoals.map((item, i) => (
										<div key={i}>
											<Check
												fontSize="small"
												style={{ color }}
												className="mr-1"
											/>
											{item?.careerGoal?.name}
										</div>
									))}
									<div>{data?.careerGoalDescription}</div>
								</div>
							)}
						</div>
						<div className="mt-5">
							<Education
								title="Học vấn"
								data={data?.educations}
								onClick={() =>
									!readOnly && setModalUpdating(CV_MODAL_TYPES.education)
								}
								setEducationIndex={setEducationIndex}
								deleteEducation={deleteEducation}
								readOnly={readOnly}
							/>
						</div>
						<div className="mt-5">
							<Experience
								title="Kinh nghiệm làm việc"
								data={data?.experiences}
								onClick={() =>
									!readOnly && setModalUpdating(CV_MODAL_TYPES.experience)
								}
								setExperienceIndex={setExperienceIndex}
								deleteExperience={deleteExperience}
								readOnly={readOnly}
							/>
						</div>

						{/* <CvItem
							title="Người tham chiếu"
							content={[{ content: "sdb" }]}
							onClick={() => setModalUpdating(CV_MODAL_TYPES.reference)}
						/> */}
					</div>
				</Grid>
				<Grid item xs={5}>
					{data?.itSkills && (
						<div className="">
							<div
								className={classNames(
									"text-xl flex justify-between pr-5 mb-2 text-xl",
									styles.cvItem
								)}
								style={{ color }}
							>
								<div className="uppercase text-primary font-semibold underline underline-offset-8">
									Tin học
								</div>
								<Edit
									fontSize="medium"
									className={classNames(
										"text-right self-center !hidden cursor-pointer text-green-500",
										!readOnly && styles.editIcon
									)}
									onClick={() =>
										!readOnly && setModalUpdating(CV_MODAL_TYPES.itSkill)
									}
								/>
							</div>
							{isEmpty(data?.itSkills) ? (
								<div className="mt-5">
									<NoDataYet />
								</div>
							) : (
								data?.itSkills?.map((item, i) => (
									<Grid container key={i}>
										<Grid item xs={6} className="text-sm">
											{item?.name}
										</Grid>
										<Grid item xs={6}>
											<Rating
												readOnly
												value={item?.star}
												icon={<Star style={{ color }} />}
												emptyIcon={<StarOutline style={{ color }} />}
											/>
										</Grid>
									</Grid>
								))
							)}
						</div>
					)}
					{data?.languageSkills && (
						<div className="mt-3">
							<div
								className={classNames(
									"text-xl flex justify-between pr-5 mb-2 text-xl",
									styles.cvItem
								)}
								style={{ color }}
							>
								<div className="uppercase text-primary font-semibold underline underline-offset-8">
									Ngoại ngữ
								</div>
								<Edit
									fontSize="medium"
									className={classNames(
										"text-right self-center !hidden cursor-pointer text-green-500",
										!readOnly && styles.editIcon
									)}
									onClick={() =>
										!readOnly && setModalUpdating(CV_MODAL_TYPES.language)
									}
								/>
							</div>
							{isEmpty(data?.languageSkills) ? (
								<div className="mt-5">
									<NoDataYet />
								</div>
							) : (
								data?.languageSkills?.map((item, i) => (
									<Grid container key={i}>
										<Grid item xs={6} className="text-sm">
											{item?.name}
										</Grid>
										<Grid item xs={6}>
											<Rating
												readOnly
												value={item?.star}
												icon={<Star style={{ color }} />}
												emptyIcon={<StarOutline style={{ color }} />}
											/>
										</Grid>
									</Grid>
								))
							)}
						</div>
					)}
					<Skill
						title="Kỹ năng"
						data={data}
						onClick={() => !readOnly && setModalUpdating(CV_MODAL_TYPES.skill)}
						readOnly={readOnly}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

export default Pro;
