import classNames from "classnames";
import { getDate } from "src/helper/format";
import Section from "../Basic/Section";
import styles from "./styles.module.scss";
import { Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const color = "#009ce0";
const Education = ({
	data,
	icon,
	title,
	onClick,
	setEducationIndex,
	deleteEducation,
}) => {
	return (
		<Section
			icon={icon}
			title={title}
			onClick={() => {
				onClick();
				setEducationIndex(null);
			}}
		>
			<div className={classNames("pt-2", styles.info)}>
				{data?.map((item, i) => (
					<div
						key={i}
						className={classNames("ml-[40px] relative pb-3", styles.item)}
					>
						<div
							className={classNames(
								"hidden absolute right-5 top-0 cursor-pointer",
								styles.editItem
							)}
						>
							<Edit
								className="text-green-500"
								onClick={() => {
									setEducationIndex(i);
									onClick();
								}}
							/>
							<Delete
								className="text-red-500"
								onClick={() => deleteEducation(i)}
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
								{getDate(item?.startDate)} - {getDate(item?.finishDate)}
							</p>
						)}

						<div className={classNames("text-33 text-sm", styles.content)}>
							<div className="font-semibold text-[15px]">
								{item?.certification}
							</div>
							<Stack className="gap-[2px]">
								{item?.school && <div>Trường/nơi đào tạo: {item?.school}</div>}
								{item?.learningClassification?.name && (
									<div>Xếp loại: {item?.learningClassification?.name}</div>
								)}
								{item?.class && <div>Khoa: {item?.class}</div>}
								{item?.major && <div>Ngành: {item?.major}</div>}
								{item?.description && <div>Mô tả: {item?.description}</div>}
							</Stack>
						</div>
					</div>
				))}
			</div>
		</Section>
	);
};

export default Education;
