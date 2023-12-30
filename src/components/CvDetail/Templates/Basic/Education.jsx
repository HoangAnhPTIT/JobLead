import classNames from "classnames";
import React from "react";
import Section from "../Basic/Section";
import { CheckCircle } from "@mui/icons-material";
import styles from "./styles.module.scss";
import { getDate } from "src/helper/format";

const color = "#009ce0";
const Education = ({ data, icon, title, onClick }) => {
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
							<div className="font-semibold text-[15px]">
								{item?.certification}
							</div>
							{item?.school && <div>Trường/nơi đào tạo: {item?.school}</div>}
							{item?.learningClassification?.name && (
								<div>Xếp loại: {item?.learningClassification?.name}</div>
							)}
							{item?.class && <div>Khoa: {item?.class}</div>}
							{item?.major && <div>Ngành: {item?.major}</div>}
							{item?.description && <div>Mô tả: {item?.description}</div>}
						</div>
					</div>
				))}
			</div>
		</Section>
	);
};

export default Education;
