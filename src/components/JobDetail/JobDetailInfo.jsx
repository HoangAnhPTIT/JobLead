"use client";
import {
	CalendarMonth,
	ContentCopy,
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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
	const [currentUrl, setCurrentUrl] = useState("");

	const handleCopy = () => {
		try {
			navigator.clipboard.writeText(currentUrl);
			toast.success("Copy thành công");
		} catch (error) {
			toast.error(error?.message || error);
		}
	};

	useEffect(() => {
		setCurrentUrl(window.location.href);
	}, []);

	return (
		<div className="p-4 bg-white">
			<div className="w-full grid grid-cols-[100%] lg:grid-cols-[75%_25%]">
				<div>
					<Grid container>
						<Grid item xs={12} md={6} className="pr-5">
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
						<Grid item xs={12} md={6} className="pr-5">
							<div className="mb-4">
								<Groups className="text-primary" />
								<span className="font-semibold ml-2 mr-1">Số lượng:</span>
								{data?.numOfRecruitment}
							</div>
							<div className="mb-4">
								<MilitaryTech className="text-primary" />
								<span className="font-semibold ml-2 mr-1">Chức vụ:</span>
								{data?.level?.name}
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
					<div className="mt-5 pr-10 mb-10">
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
				</div>
				<div>
					<div className="border p-4 w-full mb-10">
						<div className="text-lg font-semibold">Chia sẻ tin tuyển dụng</div>
						<p className="text-sm my-3">Sao chép đường dẫn</p>
						<div className="flex gap-2 cursor-pointer">
							<div className="bg-bgTextCopy rounded flex-1 p-2 three-dot">
								{currentUrl}
							</div>
							<div
								className="bg-bgCopy rounded flex justify-center items-center w-8"
								onClick={handleCopy}
							>
								<ContentCopy fontSize="small" className="text-copy" />
							</div>
						</div>
					</div>
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
				</div>
			</div>
		</div>
	);
};

export default JobDetailInfo;
