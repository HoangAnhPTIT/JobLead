import { Add, Edit } from "@mui/icons-material";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { ACTION_TYPES } from "src/constants/common";

const color = "#009ce0";

const Section = ({
	icon,
	title,
	onClick,
	typeParent = ACTION_TYPES.add,
	children,
}) => {
	return (
		<div className={classNames("", styles.cvItem)}>
			<div
				className={classNames("pt-2 flex justify-between pr-10")}
				style={{ color: color }}
			>
				<div>
					{icon}
					<span className="uppercase ml-4 text-xl">{title}</span>
				</div>
				{typeParent === ACTION_TYPES.add ? (
					<Add
						fontSize="medium"
						className={classNames(
							"text-right self-center !hidden cursor-pointer text-green-500",
							styles.editIcon
						)}
						onClick={onClick}
					/>
				) : (
					<Edit
						fontSize="medium"
						className={classNames(
							"text-right self-center !hidden cursor-pointer text-green-500",
							styles.editIcon
						)}
						onClick={onClick}
					/>
				)}
			</div>
			{children}
		</div>
	);
};

export default Section;
