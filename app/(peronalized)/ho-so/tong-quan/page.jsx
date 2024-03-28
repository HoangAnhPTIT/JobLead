"use client";
import {
	ArrowForwardIos,
	Download,
	FmdGood,
	HowToReg,
	PaidOutlined,
	Person,
	TextSnippet,
	Visibility,
	Work,
} from "@mui/icons-material";
import { Image, Table } from "antd";
import classNames from "classnames";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import {
	apiCandidateApplication,
	apiCandidateGeneralInfo,
	apiCandidateSaveJobs,
} from "src/apis/apiEndpoint";
import Nodata from "src/commons/Nodata";
import EmployerBanner from "src/components/Employer/EmployerBanner";
import FileLayout from "src/components/Files/FileLayout";
import { errorMessage } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { getDate } from "src/helper/format";

const jobAppliedColumns = [
	{
		title: "Việc làm",
		dataIndex: "jobInfo",
		key: "info",
		render: (value) => (
			<div className="flex gap-4">
				<Image
					src={value?.company?.avatar}
					alt={value?.company?.name}
					width={40}
					height={40}
					preview={false}
				/>
				<div>
					<p
						className="text-[15px] link font-semibold"
						onClick={() =>
							window.open(`${routeMap.job}${routeMap.detail}/${value?.jobId}`)
						}
					>
						{value?.jobName}
					</p>
					<p
						className="text-sm text-99 link"
						onClick={() =>
							window.open(`${routeMap.company}/${value?.company?.id}`)
						}
					>
						{value?.company?.name}
					</p>
				</div>
			</div>
		),
	},
	{
		title: "Địa điểm",
		dataIndex: "jobInfo",
		key: "location",
		render: (value) => (
			<div className="text-center text-99 text-sm">
				<p>
					<FmdGood fontSize="small" />
				</p>
				<p>{value?.location}</p>
			</div>
		),
	},
	{
		title: "Mức lương",
		dataIndex: "jobInfo",
		key: "salary",
		render: (value) => (
			<div className="text-center text-secondary text-sm">
				<p>
					<PaidOutlined fontSize="small" />
				</p>
				<p>{value?.salary}</p>
			</div>
		),
	},
	{
		title: "Ngày ứng tuyển",
		dataIndex: "applyDate",
		key: "applyDate",
		render: (value) => (
			<div className="text-99 text-sm text-center">{getDate(value)}</div>
		),
	},
];

const jobSavedColumns = [
	{
		title: "Việc làm",
		dataIndex: "",
		key: "info",
		render: (value) => (
			<div className="flex gap-4">
				<Image
					src={value?.companyInfo?.avatar}
					alt={value?.companyInfo?.name}
					width={40}
					height={40}
					preview={false}
				/>
				<div>
					<p
						className="text-[15px] link font-semibold"
						onClick={() =>
							window.open(
								`${routeMap.job}${routeMap.detail}/${value?.jobInfo?.slug}`
							)
						}
					>
						{value?.jobInfo?.jobName}
					</p>
					<p
						className="text-sm text-99 link"
						onClick={() =>
							window.open(`${routeMap.company}/${value?.companyInfo?.id}`)
						}
					>
						{value?.companyInfo?.name}
					</p>
				</div>
			</div>
		),
	},
	{
		title: "Địa điểm",
		dataIndex: "jobInfo",
		key: "location",
		render: (value) => (
			<div className="text-center text-99 text-sm">
				<p>
					<FmdGood fontSize="small" />
				</p>
				<p>{value?.location}</p>
			</div>
		),
	},
	{
		title: "Mức lương",
		dataIndex: "jobInfo",
		key: "salary",
		render: (value) => (
			<div className="text-center text-secondary text-sm">
				<p>
					<PaidOutlined fontSize="small" />
				</p>
				<p>{value?.salary}</p>
			</div>
		),
	},
	{
		title: "Ngày lưu",
		dataIndex: "createdDate",
		key: "createdDate",
		render: (value) => (
			<div className="text-99 text-sm text-center">{getDate(value)}</div>
		),
	},
];

const ViewItem = ({ icon, bgIcon, amount, title, link }) => {
	const router = useRouter();
	return (
		<div
			className={classNames(
				"shadow p-5 flex gap-5 bg-white",
				link && "cursor-pointer"
			)}
			onClick={() => link && router.push(link)}
		>
			<div
				className={classNames(
					"rounded-full w-[50px] h-[50px] flex justify-center items-center",
					bgIcon
				)}
			>
				{icon}
			</div>
			<div>
				<p className="text-33 text-2xl font-semibold">{amount}</p>
				<p className="text-33 text-sm">{title}</p>
			</div>
		</div>
	);
};

const DashboardPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [appliedJobs, setAppliedJobs] = useState();
	const [savedJobs, setSavedJobs] = useState();
	const [generalInfo, setGeneralInfo] = useState();

	useEffect(() => {
		const getData = async () => {
			dispatch(updateLoading(true));
			const infoRes = await httpAuthGet({
				endpoint: apiCandidateGeneralInfo,
			});
			const appliedRes = await httpAuthGet({
				endpoint: apiCandidateApplication,
				params: {
					page: 1,
					size: 4,
				},
			});
			const savedRes = await httpAuthGet({
				endpoint: apiCandidateSaveJobs,
				params: {
					page: 1,
					size: 4,
				},
			});

			if (appliedRes?.status === 200) {
				setAppliedJobs(appliedRes?.data);
			} else {
				toast.error(errorMessage);
			}
			if (savedRes?.status === 200) {
				setSavedJobs(savedRes?.data?.savedJob);
			} else {
				toast.error(errorMessage);
			}
			if (infoRes?.status === 200) {
				setGeneralInfo(infoRes?.data);
			} else {
				toast.error(errorMessage);
			}

			dispatch(updateLoading(false));
		};
		getData();
	}, []);

	return (
		<FileLayout>
			<div>
				<EmployerBanner />
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
					<ViewItem
						title="Viêc làm phù hợp"
						amount={generalInfo?.numOfMatchJob || 0}
						icon={<Work style={{ color: "#feaa2f" }} />}
						bgIcon="bg-[#ffedd2]"
					/>
					<ViewItem
						title="Lượt xem hồ sơ"
						amount={generalInfo?.numOfViewProfile || 0}
						icon={<Visibility style={{ color: "#ab8ce4" }} />}
						bgIcon="bg-[#eee8fa]"
						link={`${routeMap.file}${routeMap.viewedByEmployer}`}
					/>
					<ViewItem
						title="NTD gửi email mời ứng tuyển"
						amount={generalInfo?.numOfCompanySendedEmail || 0}
						icon={<HowToReg style={{ color: "#00c292" }} />}
						bgIcon="bg-[#ccf2f4]"
					/>
					<ViewItem
						title="Lượt xem thông tin liên hệ"
						amount={generalInfo?.numOfViewContactInfo || 0}
						icon={<Person style={{ color: "#ab8ce4" }} />}
						bgIcon="bg-[#eee8fa]"
					/>
					<ViewItem
						title="Lượt lưu hồ sơ"
						amount={generalInfo?.numOfCompanySavedProfile || 0}
						icon={<Download style={{ color: "#afbc58" }} />}
						bgIcon="bg-[#e7ebcc]"
					/>
					<ViewItem
						title="Tổng CV đang có"
						amount={generalInfo?.numOfCv || 0}
						icon={<TextSnippet style={{ color: "#fc225e" }} />}
						bgIcon="bg-[#fed2de]"
						link={`${routeMap.file}${routeMap.cv}`}
					/>
				</div>
				<div className="mt-5">
					<div className="mb-3 flex justify-between">
						<div className="font-semibold text-lg">
							Việc làm đã ứng tuyển mới nhất
						</div>
						<div
							className="text-primary cursor-pointer font-semibold"
							onClick={() =>
								router.push(`${routeMap.file}${routeMap.appliedJob}`)
							}
						>
							Xem thêm
							<ArrowForwardIos fontSize="inherit" />
						</div>
					</div>
					<div className="bg-white">
						{isEmpty(appliedJobs) ? (
							<Nodata />
						) : (
							<Table
								columns={jobAppliedColumns}
								dataSource={appliedJobs}
								showHeader={false}
								pagination={false}
							/>
						)}
					</div>
				</div>
				<div className="mt-5">
					<div className="mb-3 flex justify-between">
						<div className="font-semibold text-lg">
							Việc làm đã lưu mới nhất
						</div>
						<div
							className="text-primary cursor-pointer font-semibold"
							onClick={() =>
								router.push(`${routeMap.file}${routeMap.savedJob}`)
							}
						>
							Xem thêm
							<ArrowForwardIos fontSize="inherit" />
						</div>
					</div>{" "}
					<div className="bg-white">
						{isEmpty(savedJobs) ? (
							<Nodata />
						) : (
							<Table
								columns={jobSavedColumns}
								dataSource={savedJobs}
								showHeader={false}
								pagination={false}
							/>
						)}
					</div>
				</div>
			</div>
		</FileLayout>
	);
};

export default DashboardPage;
