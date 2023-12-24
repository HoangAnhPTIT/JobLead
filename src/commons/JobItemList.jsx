import { JOB_PRIORITY } from "@/src/constants/job";
import { PaidOutlined, PlaceOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";

const JobItemList = ({ item }) => {
	return (
		<div className={classNames(["pl-2 py-1"])}>
			<div className="flex gap-3">
				<Image
					src={item?.company?.avatar}
					width={45}
					height={45}
					alt={item?.companyName}
				/>
				<div className="text-sm w-[175px]">
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
					<Grid container className="text-primary">
						<Grid item xs={7}>
							<PaidOutlined fontSize="inherit" className="text-xs" />
							<span className="text-55 ml-1 mr-3 text-xs">{item?.salary}</span>
						</Grid>
						<Grid item xs={5} className="three-dot">
							<PlaceOutlined fontSize="inherit" className="text-xs" />
							<span className="text-55 ml-1 text-xs">{item?.location}</span>
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
	);
};

export default JobItemList;
