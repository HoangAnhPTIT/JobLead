"use client";
import {
	Business,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	RememberMe,
} from "@mui/icons-material";
import { Button } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { httpAuthDelete, httpAuthPost } from "src/apis/apiAuthCaller";
import {
	apiCandidateSaveJob,
	apiCandidateSaveJobs,
} from "src/apis/apiEndpoint";
import Expired from "src/commons/Expired";
import { USER_ROLE, errorMessage, imageError } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { getDate } from "src/helper/format";
import ModalApplyJob from "./ModalApplyJob";

function JobGeneralInfo({ data }) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { userInfo } = useAppSelector((state) => state.user);
	const [showModal, setShowModal] = useState(false);

	const onSave = async (e) => {
		e.preventDefault();
		dispatch(updateLoading(true));
		try {
			const res = await httpAuthPost({
				endpoint: `${apiCandidateSaveJob}/${data?.id || data?.jobId}`,
			});
			if (res?.status === 200) {
				toast.success("Lưu việc làm thành công");
				router.refresh();
			} else {
				toast.error(errorMessage);
			}
		} catch {
			/* empty */
		} finally {
			dispatch(updateLoading(false));
		}
	};

	const onUnsave = async (e) => {
		e.preventDefault();
		dispatch(updateLoading(true));
		try {
			const res = await httpAuthDelete({
				endpoint: `${apiCandidateSaveJobs}/${data?.id}`,
			});
			if (res?.status === 200) {
				toast.success("Bỏ lưu việc làm thành công");
				router.refresh();
			} else {
				toast.error(errorMessage);
			}
		} catch {
			/* empty */
		} finally {
			dispatch(updateLoading(false));
		}
	};

	return (
		<div className="shadow-ccc p-5 bg-white">
			<div className="flex flex-col lg:flex-row gap-5 justify-between">
				<div className="flex gap-8">
					<div>
						<Image
							width={160}
							height={160}
							src={data?.company?.avatar || imageError}
							alt={data?.company?.name}
						/>
					</div>
					<div className="flex-1 flex flex-col gap-1">
						<h1 className="text-33 text-xl font-semibold ">{data?.name}</h1>
						<Link href={`${routeMap.company}/${data?.company?.id}`}>
							<div className="text-hlBlue">
								<Business /> {data?.company?.name}
							</div>
						</Link>
						<div className="text-sm">
							<span className="font-semibold text-33 mr-1">
								Khu vực tuyển dụng:
							</span>
							<span className="text-hlBlue">{data?.workLocation?.name}</span>
						</div>
						<div className="text-sm">
							<span className="font-semibold text-33 mr-1">Mức lương:</span>
							<span className="text-hlRed">
								{data?.salary?.name || data?.salary}
							</span>
						</div>
						<div className="text-sm">
							<div className="mr-2">Lượt xem: {data?.countViewer || 0}</div>
							<div className="mr-2">
								Hạn nộp hồ sơ: {getDate(data?.submissionDeadline)}
								<Expired time={data?.submissionDeadline} />
							</div>
							{/* <span>Ngày duyệt: {getDate(data?.approvalDate)}</span> */}
						</div>
					</div>
				</div>
				{userInfo?.role !== USER_ROLE.employer && (
					<div className="flex gap-2">
						{!data?.isSaved ? (
							<Button
								type="primary"
								ghost
								size="middle"
								icon={<FavoriteBorderOutlined fontSize="small" />}
								onClick={onSave}
							>
								Lưu công việc
							</Button>
						) : (
							<Button
								type="primary"
								size="middle"
								icon={<FavoriteOutlined fontSize="small" />}
								onClick={onUnsave}
							>
								Bỏ lưu công việc
							</Button>
						)}
						<Button
							type="primary"
							size="middle"
							icon={<RememberMe fontSize="small" />}
							onClick={() => setShowModal(true)}
						>
							Ứng tuyển ngay
						</Button>
					</div>
				)}
			</div>
			<ModalApplyJob
				showModal={showModal}
				setShowModal={setShowModal}
				data={data}
			/>
		</div>
	);
}

export default JobGeneralInfo;
