import classNames from "classnames";
import { getDate } from "src/helper/format";
import Section from "../Basic/Section";
import styles from "./styles.module.scss";
import { Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const color = "#009ce0";
const Experience = ({
	data,
	icon,
	title,
	onClick,
	setExperienceIndex,
	deleteExperience,
	readOnly = false,
}) => {
	return (
		<Section icon={icon} title={title} onClick={onClick} readOnly={readOnly}>
			<div className={classNames("pt-2", styles.info)}>
				{data?.map((item, i) => (
					<div
						key={i}
						className={classNames("ml-[40px] relative pb-3", styles.item)}
					>
						<div
							className={classNames(
								"hidden absolute right-5 top-0 cursor-pointer",
								!readOnly && styles.editItem
							)}
						>
							<Edit
								className="text-green-500"
								onClick={() => {
									setExperienceIndex(i);
									onClick();
								}}
							/>
							<Delete
								className="text-red-500"
								onClick={() => deleteExperience(i)}
							/>
						</div>
						{item?.startDate && (
							<p
								className={classNames(
									"w-[200px] rounded-r h-5 px-1 mb-2 text-sm text-white",
									styles.time
								)}
								style={{ background: color }}
							>
								{getDate(item?.startDate)} -{" "}
								{item?.finishDate ? getDate(item?.finishDate) : "Hiện tại"}
							</p>
						)}
						<div className={classNames("text-33 text-sm", styles.content)}>
							<div className="font-semibold text-[15px]">{item?.company}</div>
							<Stack className="gap-[2px]">
								{item?.title && <div>Vị trí: {item?.title}</div>}
								{item?.description && <div>Mô tả: {item?.description}</div>}
							</Stack>
						</div>
					</div>
				))}
			</div>
		</Section>
	);
};

export default Experience;
