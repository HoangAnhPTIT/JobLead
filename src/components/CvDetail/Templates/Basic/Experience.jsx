import classNames from "classnames";
import { getDate } from "src/helper/format";
import Section from "../Basic/Section";
import styles from "./styles.module.scss";
import { Stack } from "@mui/material";

const color = "#009ce0";
const Experience = ({ data, icon, title, onClick }) => {
	return (
		<Section icon={icon} title={title} onClick={onClick}>
			<div className={classNames("pt-2", styles.info)}>
				{data?.map((item, i) => (
					<div key={i} className={classNames("ml-[40px]", styles.item)}>
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
