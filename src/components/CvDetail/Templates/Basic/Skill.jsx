import { CheckCircle } from "@mui/icons-material";
import { Stack } from "@mui/material";
import classNames from "classnames";
import Section from "../Basic/Section";
import styles from "./styles.module.scss";

const color = "#009ce0";
const Skill = ({ data, icon, title, onClick }) => {
	return (
		<Section icon={icon} title={title} onClick={onClick}>
			<div className={classNames("pt-2", styles.info)}>
				<div className={classNames("ml-[40px]", styles.item)}>
					<div className={classNames("text-33 text-sm", styles.content)}>
						<Stack className="gap-[2px]">
							{data?.skills?.map((item, i) => (
								<div key={i}>
									<CheckCircle
										fontSize="small"
										style={{ color }}
										className="mr-1"
									/>
									{item?.skill?.name}
								</div>
							))}
							{data?.skillDescription}
						</Stack>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default Skill;
