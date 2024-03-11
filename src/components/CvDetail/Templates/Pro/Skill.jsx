import { Edit, Star } from "@mui/icons-material";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { isEmpty } from "lodash";
import NoDataYet from "../../NoDataYet";

const color = "#009ce0";
const Skill = ({ data, onClick, readOnly }) => {
	return (
		<div className="mt-5">
			<div
				className={classNames(
					"text-xl flex justify-between pr-5 mb-2 underline underline-offset-8 font-semibold uppercase mb-5 text-primary",
					styles.cvItem
				)}
			>
				<div>Kỹ năng</div>
				<Edit
					fontSize="medium"
					className={classNames(
						"text-right self-center !hidden cursor-pointer text-green-500",
						!readOnly && styles.editIcon
					)}
					onClick={() => !readOnly && onClick()}
				/>
			</div>
			{isEmpty(data?.skillDescription) && isEmpty(data?.skills) ? (
				<NoDataYet />
			) : (
				<div className="text-33 text-sm">
					{data?.skills.map((item, i) => (
						<div key={i}>
							<Star fontSize="small" style={{ color }} className="mr-1" />
							{item?.skill?.name}
						</div>
					))}
					<div>{data?.skillDescription}</div>
				</div>
			)}
		</div>
	);
};

export default Skill;
