import {
	BorderColor,
	CalendarMonth,
	Check,
	CheckCircle,
	Email,
	FolderShared,
	PhoneEnabled,
	PhotoCamera,
	Place,
	RecentActors,
	School,
	Star,
	StarOutline,
	Transgender,
} from "@mui/icons-material";
import { Grid, Rating, TextField } from "@mui/material";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { CV_MODAL_TYPES } from "src/constants/cv";

const color = "#009ce0";

const CvItem = ({ icon, title, content, onClick }) => {
	return (
		<div
			className={classNames("cursor-pointer", styles.cvItem)}
			onClick={onClick}
		>
			<div className="pt-2" style={{ color: color }}>
				{icon}
				<span className="uppercase ml-4 text-xl">{title}</span>
			</div>
			<div className={classNames("pt-2", styles.info)}>
				{content?.map((item, i) => (
					<div key={i} className={classNames("ml-[40px]", styles.item)}>
						{item?.time && (
							<p
								className={classNames(
									"w-[200px] rounded-r h-5 px-1 mb-2 text-white",
									styles.time
								)}
								style={{ background: color }}
							>
								{item?.time}
							</p>
						)}
						{item?.detail && (
							<div>
								{item?.detail?.map((item, i) => (
									<div key={i} className="text-33 text-sm my-1">
										<CheckCircle fontSize="small" style={{ color }} /> {item}
									</div>
								))}
							</div>
						)}
						<div className={classNames("text-33 text-sm", styles.content)}>
							{item?.content}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const goals = {
	description: "nghi huu som",
	detail: ["lau dai, on dinh", "thang tien tot"],
};

const info = {
	gender: "Nam",
	dob: "12/12/2014",
	phone: "1213 343",
	email: "dx@example",
	address: "NCT",
};

const itSkills = [
	{
		name: "Excel",
		star: 3,
	},
	{
		name: "Word",
		star: 4,
	},
];

const Basic = ({ setModalUpdating }) => {
	return (
		<div className={classNames("bg-white p-5", styles.basic)}>
			<Grid container>
				<Grid item xs={7} className="pr-5">
					<div>
						<TextField
							fullWidth
							name="name"
							size="medium"
							placeholder="Tên của bạn"
							autoComplete="off"
							className={styles.yourName}
						/>
						<TextField
							fullWidth
							name="position"
							size="small"
							placeholder="Vị trí công việc bạn muốn ứng tuyển"
							autoComplete="off"
							className={styles.position}
						/>
					</div>
					<div>
						<CvItem
							icon={<School style={{ color, fontSize: 50 }} />}
							title="Học vấn"
							content={[
								{ time: "1-2", content: "sdb" },
								{ time: "1-2", content: "sdb" },
							]}
							onClick={() => setModalUpdating(CV_MODAL_TYPES.education)}
						/>
						<CvItem
							icon={<FolderShared style={{ color, fontSize: 50 }} />}
							title="Kinh nghiệm làm việc"
							content={[
								{ time: "1-2", content: "sdb" },
								{ time: "1-2", content: "sdb" },
							]}
							onClick={() => setModalUpdating(CV_MODAL_TYPES.experience)}
						/>
						<CvItem
							icon={<BorderColor style={{ color, fontSize: 50 }} />}
							title="Kỹ năng"
							content={[{ content: "sdb", detail: [123, 345, 567] }]}
							onClick={() => setModalUpdating(CV_MODAL_TYPES.skill)}
						/>
						<CvItem
							icon={<RecentActors style={{ color, fontSize: 50 }} />}
							title="Người tham chiếu"
							content={[{ content: "sdb" }]}
							onClick={() => setModalUpdating(CV_MODAL_TYPES.reference)}
						/>
					</div>
				</Grid>
				<Grid item xs={5}>
					<PhotoCamera style={{ fontSize: 150, color: "#333" }} />
					<div
						className="cursor-pointer"
						onClick={() => setModalUpdating(CV_MODAL_TYPES.careerGoal)}
					>
						<div className="text-xl" style={{ color }}>
							Mục tiêu nghề nghiệp
						</div>
						<div className="text-33 text-sm">
							{goals?.detail.map((item, i) => (
								<div key={i}>
									<Check fontSize="small" style={{ color }} /> {item}
								</div>
							))}
							<div>{goals?.description}</div>
						</div>
					</div>
					<div className="mt-5">
						<div className="text-xl" style={{ color }}>
							Thông tin cá nhân
						</div>
						<div className="text-33 flex gap-5 pr-5 mt-3">
							<Transgender fontSize="inherit" style={{ color }} />
							<div className="flex-1 border-b">{info.gender}</div>
						</div>
						<div className="text-33 flex gap-5 pr-5 mt-3">
							<CalendarMonth fontSize="inherit" style={{ color }} />
							<div className="flex-1 border-b">{info.dob}</div>
						</div>
						<div className="text-33 flex gap-5 pr-5 mt-3">
							<PhoneEnabled fontSize="inherit" style={{ color }} />
							<div className="flex-1 border-b">{info.phone}</div>
						</div>
						<div className="text-33 flex gap-5 pr-5 mt-3">
							<Email fontSize="inherit" style={{ color }} />
							<div className="flex-1 border-b">{info.email}</div>
						</div>
						<div className="text-33 flex gap-5 pr-5 mt-3">
							<Place fontSize="inherit" style={{ color }} />
							<div className="flex-1 border-b">{info.address}</div>
						</div>
					</div>
					<div className="mt-5">
						<div className="text-xl mb-2" style={{ color }}>
							Tin học
						</div>
						{itSkills?.map((item, i) => (
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
				</Grid>
			</Grid>
		</div>
	);
};

export default Basic;
