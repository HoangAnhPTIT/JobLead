import {
	BorderColor,
	CalendarMonth,
	Check,
	Edit,
	Email,
	FolderShared,
	PhoneEnabled,
	PhotoCamera,
	Place,
	School,
	Star,
	StarOutline,
	Transgender,
} from "@mui/icons-material";
import { Grid, Rating, TextField } from "@mui/material";
import { Image } from "antd";
import classNames from "classnames";
import { CV_MODAL_TYPES } from "src/constants/cv";
import { getDate } from "src/helper/format";
import Education from "./Education";
import Experience from "./Experience";
import Skill from "./Skill";
import styles from "./styles.module.scss";

const color = "#009ce0";

// const CvItem = ({ icon, title, content, onClick }) => {
// 	return (
// 		<div
// 			className={classNames("cursor-pointer", styles.cvItem)}
// 			onClick={onClick}
// 		>
// 			<div className="pt-2" style={{ color: color }}>
// 				{icon}
// 				<span className="uppercase ml-4 text-xl">{title}</span>
// 			</div>
// 			<div className={classNames("pt-2", styles.info)}>
// 				{content?.map((item, i) => (
// 					<div key={i} className={styles.item}>
// 						{item?.startDate && (
// 							<p
// 								className={classNames(
// 									"w-[200px] rounded-r h-5 px-1 mb-2 text-sm text-white",
// 									styles.time
// 								)}
// 								style={{ background: color }}
// 							>
// 								{getDate(item?.startDate)} - {getDate(item?.finishDate)}
// 							</p>
// 						)}
// 						{item?.detail && (
// 							<div>
// 								{item?.detail?.map((item, i) => (
// 									<div key={i} className="text-33 text-sm my-1">
// 										<CheckCircle fontSize="small" style={{ color }} /> {item}
// 									</div>
// 								))}
// 							</div>
// 						)}
// 						<div className={classNames("text-33 text-sm", styles.content)}>
// 							{item?.content}
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

const Basic = ({
	data,
	readOnly = false,
	setEducationIndex,
	setExperienceIndex,
	setModalUpdating,
	deleteEducation,
	deleteExperience,
}) => {
	return (
		<div className={classNames("bg-white p-5", styles.basic)}>
			<Grid container>
				<Grid item xs={7} className="pr-5">
					<div
						className={classNames(
							"ml-[40px] relative pb-3",
							styles.item,
							styles.cvItem
						)}
					>
						<Edit
							fontSize="medium"
							className={classNames(
								"text-right self-center !hidden cursor-pointer text-green-500 absolute right-10 top-0 z-10 cursor-pointer",
								styles.editIcon
							)}
							onClick={() =>
								!readOnly && setModalUpdating(CV_MODAL_TYPES.generalInfo)
							}
						/>

						<TextField
							fullWidth
							name="fullName"
							size="medium"
							defaultValue={data?.fullName}
							placeholder="Tên của bạn"
							autoComplete="off"
							className={styles.yourName}
							disabled
						/>
						<TextField
							fullWidth
							name="workTitle"
							size="small"
							defaultValue={data?.workTitle}
							placeholder="Vị trí công việc bạn muốn ứng tuyển"
							autoComplete="off"
							className={styles.position}
							disabled
						/>
					</div>
					<div>
						<Education
							icon={<School style={{ color, fontSize: 50 }} />}
							title="Học vấn"
							data={data?.educations}
							onClick={() =>
								!readOnly && setModalUpdating(CV_MODAL_TYPES.education)
							}
							setEducationIndex={setEducationIndex}
							deleteEducation={deleteEducation}
							readOnly={readOnly}
						/>
						<Experience
							icon={<FolderShared style={{ color, fontSize: 50 }} />}
							title="Kinh nghiệm làm việc"
							data={data?.experiences}
							onClick={() =>
								!readOnly && setModalUpdating(CV_MODAL_TYPES.experience)
							}
							setExperienceIndex={setExperienceIndex}
							deleteExperience={deleteExperience}
							readOnly={readOnly}
						/>
						<Skill
							icon={<BorderColor style={{ color, fontSize: 50 }} />}
							title="Kỹ năng"
							data={data}
							onClick={() =>
								!readOnly && setModalUpdating(CV_MODAL_TYPES.skill)
							}
							readOnly={readOnly}
						/>
						{/* <CvItem
							icon={<RecentActors style={{ color, fontSize: 50 }} />}
							title="Người tham chiếu"
							content={[{ content: "sdb" }]}
							onClick={() => setModalUpdating(CV_MODAL_TYPES.reference)}
						/> */}
					</div>
				</Grid>
				<Grid item xs={5}>
					<div
						className="cursor-pointer"
						onClick={() => !readOnly && setModalUpdating(CV_MODAL_TYPES.avatar)}
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
							<PhotoCamera style={{ fontSize: 150, color: "#333" }} />
						)}
					</div>
					<div>
						<div
							className={classNames(
								"text-xl flex justify-between pr-5 mb-2",
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
						<div className="text-33 text-sm">
							{data?.candidateCareerGoals.map((item, i) => (
								<div key={i}>
									<Check fontSize="small" style={{ color }} className="mr-1" />
									{item?.careerGoal?.name}
								</div>
							))}
							<div>{data?.careerGoalDescription}</div>
						</div>
					</div>
					<div className="mt-5">
						<div
							className={classNames(
								"text-xl flex justify-between pr-5 mb-2 mt-5 text-xl",
								styles.cvItem
							)}
							style={{ color }}
						>
							<div>Thông tin cá nhân</div>
							<Edit
								fontSize="medium"
								className={classNames(
									"text-right self-center !hidden cursor-pointer text-green-500",
									!readOnly && styles.editIcon
								)}
								onClick={() =>
									!readOnly && setModalUpdating(CV_MODAL_TYPES.generalInfo)
								}
							/>
						</div>
						<div className="text-33 flex gap-5 pr-5 mt-3">
							<Transgender fontSize="inherit" style={{ color }} />
							<div className="flex-1 border-b">{data?.gender?.name}</div>
						</div>
						<div className="text-33 flex gap-5 pr-5 mt-3">
							<CalendarMonth fontSize="inherit" style={{ color }} />
							<div className="flex-1 border-b">{getDate(data?.dob)}</div>
						</div>
						<div className="text-33 flex gap-5 pr-5 mt-3">
							<PhoneEnabled fontSize="inherit" style={{ color }} />
							<div className="flex-1 border-b">{data?.phone}</div>
						</div>
						<div className="text-33 flex gap-5 pr-5 mt-3">
							<Email fontSize="inherit" style={{ color }} />
							<div className="flex-1 border-b">{data?.email}</div>
						</div>
						<div className="text-33 flex gap-5 pr-5 mt-3">
							<Place fontSize="inherit" style={{ color }} />
							<div className="flex-1 border-b">{data?.location}</div>
						</div>
					</div>
					{data?.itSkills && (
						<div className="mt-5">
							<div
								className={classNames(
									"text-xl flex justify-between pr-5 mb-2 mt-5 text-xl",
									styles.cvItem
								)}
								style={{ color }}
							>
								<div>Tin học</div>
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
							{data?.itSkills?.map((item, i) => (
								<Grid container key={i} className="border-b mt-2">
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
							))}
						</div>
					)}
					{data?.languageSkills && (
						<div className="mt-5">
							<div
								className={classNames(
									"text-xl flex justify-between pr-5 mb-2 mt-5 text-xl",
									styles.cvItem
								)}
								style={{ color }}
							>
								<div>Ngoại ngữ</div>
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
							{data?.languageSkills?.map((item, i) => (
								<Grid container key={i} className="border-b mt-2">
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
							))}
						</div>
					)}
				</Grid>
			</Grid>
		</div>
	);
};

export default Basic;
