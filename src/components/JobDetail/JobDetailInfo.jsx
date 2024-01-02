import {
	CalendarMonth,
	Engineering,
	FolderShared,
	Groups,
	MilitaryTech,
	Paid,
	PinDrop,
	School,
	Transgender,
	Translate,
	WorkHistory,
} from "@mui/icons-material";
import { Grid, TextareaAutosize } from "@mui/material";
import { getDate } from "src/helper/format";

const Description = ({ title, content }) => {
	return (
		<div className="pr-5">
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

const SecondaryInfomation = ({ icon, title, content }) => {
	return (
		<div className="flex gap-3 py-4 border-b">
			{icon}
			<div className="text-sm">
				<div className="font-bold uppercase">{title}</div>
				<div>{content}</div>
			</div>
		</div>
	);
};

const JobDetailInfo = ({ data }) => {
	return (
		<div className="p-4 bg-white">
			<Grid container className="">
				<Grid item xs={9}>
					<Grid container>
						<Grid item xs={6} className="pr-5">
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
								{data?.contactInfo?.workLocation}
							</div>
						</Grid>
						<Grid item xs={6} className="pr-5">
							<div className="mb-4">
								<Groups className="text-primary" />
								<span className="font-semibold ml-2 mr-1">Số lượng:</span>
								{data?.numOfRecruitment}
							</div>
							<div className="mb-4">
								<MilitaryTech className="text-primary" />
								<span className="font-semibold ml-2 mr-1">Chức vụ:</span>
								{data?.position}
							</div>
							<div className="mb-4">
								<CalendarMonth className="text-primary" />
								<span className="font-semibold ml-2 mr-1">
									Ngày đăng tuyển:
								</span>
								{getDate(data?.createdDate)}
							</div>
						</Grid>
						<Grid item xs={12}>
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
				<Grid item={3} flex={1}>
					<div className="rounded border border-secondInfoBorder bg-secondInfoBg px-5 py-1 w-full [&>*:last-child]:border-0">
						<SecondaryInfomation
							icon={<Transgender fontSize="large" />}
							title="Giới tính"
							content={data?.jobRequirement?.gender?.name}
						/>
						<SecondaryInfomation
							icon={<School fontSize="large" />}
							title="Bằng cấp"
							content={data?.jobRequirement?.degree?.name}
						/>
						<SecondaryInfomation
							icon={<FolderShared fontSize="large" />}
							title="Kinh nghiệm"
							content={data?.jobRequirement?.experience?.name}
						/>
						<SecondaryInfomation
							icon={<Translate fontSize="large" />}
							title="Ngôn ngữ"
							content={data?.jobRequirement?.language?.name}
						/>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default JobDetailInfo;
