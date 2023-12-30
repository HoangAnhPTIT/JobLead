import {
	CalendarMonth,
	Engineering,
	Groups,
	MilitaryTech,
	Paid,
	PinDrop,
	WorkHistory,
} from "@mui/icons-material";
import { Grid, TextareaAutosize } from "@mui/material";
import { getDate } from "src/helper/format";

const Description = ({ title, content }) => {
	return (
		<div className="px-5">
			<div className="border-b border-dd">
				<span className="text-hlBlue text-lg uppercase font-semibold border-b-2 border-hlBlue pb-0.5">
					{title}
				</span>
			</div>
			<div className="px-2 pt-4">
				<TextareaAutosize className="w-full resize-none outline-none" readOnly>
					{content}
				</TextareaAutosize>
			</div>
		</div>
	);
};

const JobDetailInfo = ({ data }) => {
	return (
		<div className="py-5 bg-white">
			<Grid container className="">
				<Grid item xs={9}>
					<Grid container>
						<Grid item xs={6} className="px-4">
							<div className="mb-4">
								<Paid className="text-primary" />
								<span className="font-semibold ml-2 mr-1">Mức lương:</span>
								{data?.salary?.name}
							</div>
							<div className="mb-4">
								<WorkHistory className="text-primary" />
								<span className="font-semibold ml-2 mr-1">
									Hình thức làm việc:
								</span>
								{data?.typeOfWork?.name}
							</div>
							<div className="mb-4">
								<PinDrop className="text-primary" />
								<span className="font-semibold ml-2 mr-1">
									Địa điểm làm việc:
								</span>
								{data?.workLocation}
							</div>
						</Grid>
						<Grid item xs={6} className="px-4">
							<div className="mb-4">
								<Groups className="text-primary" />
								<span className="font-semibold ml-2 mr-1">Số lượng:</span>{" "}
								{data?.numberOfRecruitment}
							</div>
							<div className="mb-4">
								<MilitaryTech className="text-primary" />
								<span className="font-semibold ml-2 mr-1">Chức vụ:</span>{" "}
								{data?.position}
							</div>
							<div className="mb-4">
								<CalendarMonth className="text-primary" />
								<span className="font-semibold ml-2 mr-1">
									Ngày đăng tuyển:
								</span>
								{getDate(data?.approvalDate)}
							</div>
						</Grid>
						<Grid item xs={12} className="px-4">
							<div className="mb-4">
								<Engineering className="text-primary" />
								<span className="font-semibold ml-2 mr-1">Ngành nghề:</span>
								{data?.career?.name}
							</div>
						</Grid>
					</Grid>
					<div className="mt-5 pr-10">
						<Description
							title={"Mô tả công việc"}
							content={data?.description}
						/>
						<Description
							title={"Quyền lợi được hưởng"}
							content={data?.benifitDescription}
						/>
						<Description
							title={"Yêu cầu công việc"}
							content={data?.jobRequirement?.requestDescription}
						/>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default JobDetailInfo;
