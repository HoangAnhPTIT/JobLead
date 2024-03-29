"use client";
import { ContactPage, HistoryEdu, Visibility, Work } from "@mui/icons-material";
import { Table } from "antd";
import classNames from "classnames";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import {
	apiCompanyApplication,
	apiCompanyGeneralInfo,
} from "src/apis/apiEndpoint";
import EmployerBanner from "src/components/Employer/EmployerBanner";
import EmployerLayout from "src/components/Employer/EmployerLayout";
import { errorMessage } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { getDate } from "src/helper/format";

const columns = [
	{
		title: "Họ tên",
		key: "name",
		dataIndex: "candidate",
		render: (value) => value?.name,
	},
	{
		title: "Vị trí ứng tuyển",
		dataIndex: "job",
		render: (value) => value?.title,
	},
	{
		title: "Ngày nộp",
		dataIndex: "applyDate",
		key: "applyDate",
		render: (value) => getDate(value),
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
	const [data, setData] = useState();
	const [generalInfo, setGeneralInfo] = useState();

	useEffect(() => {
		const getData = async () => {
			dispatch(updateLoading(true));
			const res = await httpAuthGet({
				endpoint: apiCompanyApplication,
			});
			const generalData = await httpAuthGet({
				endpoint: apiCompanyGeneralInfo,
			});
			if (res?.status === 200) {
				setData(res?.data?.application);
			} else {
				toast.error(errorMessage);
			}
			if (generalData?.status === 200) {
				setGeneralInfo(generalData?.data);
			} else {
				toast.error(errorMessage);
			}
			dispatch(updateLoading(false));
		};
		getData();
	}, []);

	return (
		<EmployerLayout>
			<div>
				<EmployerBanner />
				<div className="grid grid-cols-3 gap-5 mt-5">
					<ViewItem
						title="Viêc làm đã đăng"
						amount={generalInfo?.postedCount || 0}
						icon={<Work style={{ color: "#feaa2f" }} />}
						bgIcon="bg-[#ffedd2]"
						link={`${routeMap.employer}${routeMap.postList}`}
					/>
					<ViewItem
						title="Hồ sơ ứng tuyển"
						amount={generalInfo?.applicationCount || 0}
						icon={<HistoryEdu style={{ color: "#01c0c8" }} />}
						bgIcon="bg-[#ccf2f4]"
						link={`${routeMap.employer}${routeMap.appliedUser}`}
					/>
					<ViewItem
						title="Hồ sơ đã lưu"
						amount={generalInfo?.saveApplicantCount || 0}
						icon={<ContactPage style={{ color: "#00c292" }} />}
						bgIcon="bg-[#ccf3e9]"
						link={`${routeMap.employer}${routeMap.savedUser}`}
					/>
					<ViewItem
						title="Lượt xem hồ sơ"
						amount={generalInfo?.viewedCount || 0}
						icon={<Visibility style={{ color: "#ab8ce4" }} />}
						bgIcon="bg-[#eee8fa]"
					/>
				</div>
				<div className="mt-5">
					<h1 className="text-lg mb-3">Hồ sơ ứng tuyển mới nhất</h1>
					<Table bordered size="small" columns={columns} dataSource={data} />
				</div>
			</div>
		</EmployerLayout>
	);
};

export default DashboardPage;
