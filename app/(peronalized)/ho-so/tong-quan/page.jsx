"use client";
import {
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
import Link from "next/link";
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

const columns = [
	{
		title: "Việc làm",
		dataIndex: "",
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
					<p>
						<Link href={`${routeMap.job}${routeMap.detail}/${value?.jobId}`}>
							<span className="text-[15px] text-primary font-semibold">
								{value?.jobName}
							</span>
						</Link>
					</p>
					<p>
						<Link href={`${routeMap.company}/${value?.company?.id}`}>
							<span className="text-sm text-99">{value?.company?.name}</span>
						</Link>
					</p>
				</div>
			</div>
		),
	},
	{
		title: "Địa điểm",
		dataIndex: "location",
		key: "location",
		render: (value) => (
			<div className="text-center text-99 text-sm">
				<p>
					<FmdGood fontSize="small" />
				</p>
				<p>{value}</p>
			</div>
		),
	},
	{
		title: "Mức lương",
		dataIndex: "salary",
		key: "salary",
		render: (value) => (
			<div className="text-center text-secondary text-sm">
				<p>
					<PaidOutlined fontSize="small" />
				</p>
				<p>{value}</p>
			</div>
		),
	},
	{
		title: "Ngày ứng tuyển",
		dataIndex: "viewedDate",
		key: "viewedDate",
		render: (value) => (
			<span className="text-99 text-sm">{getDate(value)}</span>
		),
	},
];

const ViewItem = ({ icon, bgIcon, amount, title }) => {
	return (
		<div className="shadow p-5 flex gap-5 bg-white">
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
			});
			const savedRes = await httpAuthGet({
				endpoint: apiCandidateSaveJobs,
			});

			console.log("savedRes", savedRes);

			if (appliedRes?.status === 200) {
				setAppliedJobs(appliedRes?.data?.jobs);
			} else {
				toast.error(errorMessage);
			}
			if (savedRes?.status === 200) {
				console.log("savedJobs", savedJobs);
				setSavedJobs(savedRes?.data?.jobs);
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
					/>
				</div>
				<div className="mt-5">
					<h1 className="text-lg mb-3">Việc làm đã ứng tuyển mới nhất</h1>
					<div className="bg-white">
						{isEmpty(appliedJobs) ? (
							<Nodata />
						) : (
							<Table
								columns={columns}
								dataSource={appliedJobs}
								showHeader={false}
							/>
						)}
					</div>
				</div>
				<div className="mt-5">
					<h1 className="text-lg mb-3">Việc làm đã lưu mới nhất</h1>
					<div className="bg-white">
						{isEmpty(savedJobs) ? (
							<Nodata />
						) : (
							<Table
								columns={columns}
								dataSource={savedJobs}
								showHeader={false}
							/>
						)}
					</div>
				</div>
			</div>
		</FileLayout>
	);
};

export default DashboardPage;
