import {
	CalendarOutlined,
	DollarOutlined,
	EnvironmentOutlined,
} from "@ant-design/icons";
import { Grid } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";
import { JOB_PRIORITY } from "src/constants/job";

const JobItem = ({ item, showExpire = false }) => {
	return (
		<div className="flex gap-3">
			<Image
				src={item?.company?.avatarUrl || "/thumb-80x80.png"}
				width={60}
				height={60}
				alt={item?.company?.name || ""}
			/>
			<div className="text-sm w-[calc(100%-72px)]">
				<div
					className={classNames([
						"three-dot font-bold",
						item?.type === JOB_PRIORITY.HOT ? "text-secondary" : "text-55",
					])}
				>
					{item?.type === JOB_PRIORITY.URGENT && (
						<i className="text-secondary ">(Gấp) </i>
					)}
					<span>{item?.name}</span>
				</div>
				<div className="uppercase text-99 three-dot">{item?.company?.name}</div>
				<Grid container className="text-primary">
					<Grid item xs={!showExpire ? 7 : 4}>
						<DollarOutlined />
						<span className="text-55 ml-1 mr-3">{item?.salary?.name}</span>
					</Grid>
					<Grid item xs={!showExpire ? 5 : 4}>
						<EnvironmentOutlined />
						<span className="text-55 ml-1">{item?.workLocation?.name}</span>
					</Grid>
					{showExpire && (
						<Grid item xs={4}>
							<CalendarOutlined />
							<span className="text-55 ml-1">{item?.expireDate}</span>
						</Grid>
					)}
				</Grid>
			</div>
		</div>
	);
};

export default JobItem;
