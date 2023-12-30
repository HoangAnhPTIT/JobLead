import { Add } from "@mui/icons-material";
import classNames from "classnames";
import styles from "./styles.module.scss";

const color = "#009ce0";

const Section = ({ icon, title, onClick, children }) => {
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
				<Add
					fontSize="medium"
					className={classNames(
						"text-right self-center !hidden cursor-pointer text-green-500",
						styles.editIcon
					)}
					onClick={onClick}
				/>
			</div>
			{children}
		</div>
	);
};

export default Section;
