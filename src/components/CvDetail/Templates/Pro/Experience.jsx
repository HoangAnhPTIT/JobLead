import classNames from "classnames";
import { getDate } from "src/helper/format";
import Section from "./Section";
import styles from "./styles.module.scss";
import { Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { isEmpty } from "lodash";
import NoDataYet from "../../NoDataYet";

const color = "#009ce0";
const Experience = ({
	data,
	title,
	onClick,
	setExperienceIndex,
	deleteExperience,
	readOnly = false,
}) => {
	return (
		<Section title={title} onClick={onClick} readOnly={readOnly}>
			{isEmpty(data) ? (
				<div className="mt-5">
					<NoDataYet />
				</div>
			) : (
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
									className={"mb-2 text-sm text-primary text-lg font-semibold"}
								>
									{getDate(item?.startDate)} -{" "}
									{item?.finishDate ? getDate(item?.finishDate) : "Hiện tại"}
								</p>
							)}
							<div className={styles.content}>
								<div className="text-base font-semibold">{item?.company}</div>
								<Stack className="gap-[2px]">
									{item?.title && (
										<div className="text-lg text-primary">{item?.title}</div>
									)}
									{item?.description && (
										<div>
											<strong>Mô tả:</strong> <p>{item?.description}</p>
										</div>
									)}
								</Stack>
							</div>
						</div>
					))}
				</div>
			)}
		</Section>
	);
};

export default Experience;
