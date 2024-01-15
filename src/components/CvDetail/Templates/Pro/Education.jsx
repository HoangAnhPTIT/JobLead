import { Delete, Edit } from "@mui/icons-material";
import { Stack } from "@mui/material";
import classNames from "classnames";
import { getDate } from "src/helper/format";
import Section from "./Section";
import styles from "./styles.module.scss";

const color = "#009ce0";
const Education = ({
	data,
	title,
	onClick,
	setEducationIndex,
	deleteEducation,
	readOnly,
}) => {
	return (
		<Section
			title={title}
			onClick={() => {
				onClick();
				setEducationIndex(null);
			}}
			readOnly={readOnly}
		>
			<div className={styles.info}>
				{data?.map((item, i) => (
					<div key={i} className={styles.item}>
						<div
							className={classNames(
								"hidden absolute right-5 top-0 cursor-pointer",
								!readOnly && styles.editItem
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
								className={
									"rounded-r h-5 mb-2 text-base font-semibold text-primary"
								}
							>
								{getDate(item?.startDate)} - {getDate(item?.finishDate)}
							</p>
						)}

						<div className={styles.content}>
							<div className="font-semibold text-base mb-1">
								{item?.certification}
							</div>
							<Stack className="gap-[2px]">
								{item?.school && (
									<div>
										<strong>Trường/nơi đào tạo:</strong> {item?.school}
									</div>
								)}
								{item?.learningClassification?.name && (
									<div>
										<strong>Xếp loại:</strong>{" "}
										{item?.learningClassification?.name}
									</div>
								)}
								{item?.class && (
									<div>
										<strong>Khoa:</strong> {item?.class}
									</div>
								)}
								{item?.major && (
									<div>
										<strong>Ngành:</strong> {item?.major}
									</div>
								)}
								{item?.description && (
									<div>
										<strong>Mô tả:</strong> {item?.description}
									</div>
								)}
							</Stack>
						</div>
					</div>
				))}
			</div>
		</Section>
	);
};

export default Education;
