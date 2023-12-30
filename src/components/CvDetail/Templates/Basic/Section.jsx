import classNames from "classnames";
import styles from "./styles.module.scss";

const color = "#009ce0";

const Section = ({ icon, title, onClick, children }) => {
	return (
		<div
			className={classNames("cursor-pointer", styles.cvItem)}
			onClick={onClick}
		>
			<div className="pt-2" style={{ color: color }}>
				{icon}
				<span className="uppercase ml-4 text-xl">{title}</span>
			</div>
			{children}
		</div>
	);
};

export default Section;
