import { JOB_PRIORITY } from "@/src/constants/job";
import { PaidOutlined, PlaceOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { imageError } from "src/constants/common";
import routeMap from "src/constants/routeMap";

const JobItemList = ({ item }) => {
	return (
		<div className={"pt-3 pb-2 border-b md:py-1"}>
			<div className="flex gap-3 lg:gap-2">
				<Image
					src={item?.company?.avatar || imageError}
					width={45}
					height={45}
					alt={item?.companyName || ""}
					className="object-cover !h-[45px]"
				/>
				<div className="text-sm lg:w-[140px] xl:w-[175px] flex-1">
					<Link
						href={`${routeMap.job}${routeMap.detail}/${
							item?.slug || item?.jobId
						}`}
					>
						<div
							className={classNames([
								"three-dot font-bold mt-1 lg:mt-0",
								item?.type === JOB_PRIORITY.HOT ? "text-secondary" : "text-55",
							])}
						>
							{item?.type === JOB_PRIORITY.URGENT && (
								<i className="text-secondary ">(Gấp) </i>
							)}
							<span className="three-dot">{item?.jobName}</span>
						</div>
					</Link>
					<Grid container className="text-primary">
						<Grid item xs={6} lg={7} className="three-dot py-2 lg:py-0">
							<PaidOutlined fontSize="inherit" className="text-xs" />
							<span className="text-55 ml-1 mr-3 text-xs">{item?.salary}</span>
						</Grid>
						<Grid item xs={6} lg={5} className="three-dot py-2 lg:py-0">
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
