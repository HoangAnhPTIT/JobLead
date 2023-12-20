import { formatNumber } from "@/src/helper/format";
import {
	Groups2Outlined,
	NoteAddOutlined,
	PersonOutline,
	WorkOutline,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import classNames from "classnames";
import styles from "./styles.module.scss";

const counts = [
	{
		title: "Ứng viên",
		amount: 1485111,
		icon: <PersonOutline fontSize="large" style={{ color: "#fff" }} />,
	},
	{
		title: "Việc làm",
		amount: 1485111,
		icon: <WorkOutline fontSize="large" style={{ color: "#fff" }} />,
	},
	{
		title: "Nhà tuyển dụng",
		amount: 1485111,
		icon: <Groups2Outlined fontSize="large" style={{ color: "#fff" }} />,
	},
	{
		title: "Lượt ứng tuyển",
		amount: 1485111,
		icon: <NoteAddOutlined fontSize="large" style={{ color: "#fff" }} />,
	},
];

const Counter = () => {
	return (
		<div className={classNames([styles.counter, "flex"])}>
			<Grid container className="w-content m-auto">
				{counts?.map((item, i) => (
					<Grid item xs={3} className="text-center" key={i}>
						<div>{item?.icon}</div>
						<div className="text-yellow1 text-5xl font-semibold my-2">
							{formatNumber(item?.amount)}
						</div>
						<div className="text-white">{item?.title}</div>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default Counter;
