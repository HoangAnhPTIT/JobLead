import {
	PaidOutlined,
	PlaceOutlined,
	TodayOutlined,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import classNames from "classnames";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { imageError } from "src/constants/common";
import { JOB_PRIORITY } from "src/constants/job";
import routeMap from "src/constants/routeMap";

const JobItem = ({ item, showExpire = false }) => {
	return (
		<Link href={`${routeMap.job}${routeMap.detail}/${item?.id || item?.jobId}`}>
			<div className="flex gap-3">
				<Image
					src={item?.company?.avatar || imageError}
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
						<span>{item?.jobName}</span>
					</div>
					<div className="uppercase text-99 three-dot">
						{item?.company?.name}
					</div>
					<Grid container className="text-primary">
						<Grid item xs={!showExpire ? 7 : 4} className="flex items-center">
							<PaidOutlined style={{ fontSize: 16 }} />
							<span className="text-55 ml-1 mr-3">{item?.salary}</span>
						</Grid>
						<Grid item xs={!showExpire ? 5 : 4} className="flex items-center">
							<PlaceOutlined style={{ fontSize: 16 }} />
							<span className="text-55 ml-1">{item?.location}</span>
						</Grid>
						{showExpire && (
							<Grid item xs={4} className="flex items-center">
								<TodayOutlined style={{ fontSize: 16 }} />
								<span className="text-55 ml-1">
									{moment(item?.submissionDeadline).format("DD-MM-YYYY")}
								</span>
							</Grid>
						)}
					</Grid>
				</div>
			</div>
		</Link>
	);
};

export default JobItem;
