import { JOB_PRIORITY } from "@/src/constants/job";
import { DollarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Grid } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";

const JobItemList = ({ item }) => {
	return (
		<div className={classNames(["pl-2 py-1"])}>
			<div className="flex gap-3">
				<Image
					src={item?.company?.avatarUrl}
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
						<span>{item?.name}</span>
					</div>
					<Grid container className="text-primary">
						<Grid item xs={7}>
							<DollarOutlined className="text-xs" />
							<span className="text-55 ml-1 mr-3 text-xs">
								{item?.salary?.name}
							</span>
						</Grid>
						<Grid item xs={5}>
							<EnvironmentOutlined className="text-xs" />
							<span className="text-55 ml-1 text-xs">
								{item?.workLocation?.name}
							</span>
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
	);
};

export default JobItemList;
