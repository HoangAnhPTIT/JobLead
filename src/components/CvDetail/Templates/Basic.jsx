import { FolderShared, School } from "@mui/icons-material";
import { Grid, TextField } from "@mui/material";
import classNames from "classnames";
import styles from "./styles.module.scss";

const color = "#009ce0";

const CvItem = ({ icon, title, content }) => {
	console.log("content", content);
	return (
		<div className={styles.cvItem}>
			<div className="pt-2" style={{ color: color }}>
				{icon}
				<span className="uppercase ml-8 text-xl">{title}</span>
			</div>
			<div className={classNames("pt-2", styles.info)}>
				{content?.map((item, i) => (
					<div key={i} className={classNames("ml-[50px]", styles.item)}>
						<p
							className={classNames(
								"w-[200px] rounded-r h-5 px-1 mb-2",
								styles.time
							)}
							style={{ background: color }}
						>
							{item?.time}
						</p>
						<div className={classNames("text-99 text-sm", styles.content)}>
							{item?.content}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const Basic = () => {
	return (
		<div className={classNames("bg-white p-5", styles.basic)}>
			<Grid container spacing={0}>
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
							className={styles.position}
						/>
					</div>
					<div>
						<CvItem
							icon={<School fontSize="large" style={{ color }} />}
							title="Học vấn"
							content={[
								{ time: "1-2", content: "sdb" },
								{ time: "1-2", content: "sdb" },
							]}
						/>
						<CvItem
							icon={<FolderShared fontSize="large" style={{ color }} />}
							title="Kinh nghiệm làm việc"
							content={[
								{ time: "1-2", content: "sdb" },
								{ time: "1-2", content: "sdb" },
							]}
						/>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default Basic;
