"use client";
import { EyeFilled } from "@ant-design/icons";
import {
	Business,
	FavoriteBorderOutlined,
	FavoriteOutlined,
	RememberMe,
	RemoveRedEyeRounded,
} from "@mui/icons-material";
import { Button, Modal, Radio, Space, Tooltip } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { isEmpty } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet, httpAuthPost } from "src/apis/apiAuthCaller";
import {
	apiCandidateApplyJob,
	apiCandidateCv,
	apiCandidateSaveJob,
} from "src/apis/apiEndpoint";
import { errorMessage, imageError } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { getDate } from "src/helper/format";

function JobGeneralInfo({ data }) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [showSelectCv, setShowSelectCv] = useState(false);
	const [cvList, setCvList] = useState(null);
	const [cvSelected, setCvSelected] = useState(null);

	const onSelectCv = (e) => {
		setCvSelected(e.target.value);
	};

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

	const onApply = async (e) => {
		e.preventDefault();
		setShowSelectCv(true);
		try {
			dispatch(updateLoading(true));
			const getCvList = async () => {
				const response = await httpAuthGet({ endpoint: apiCandidateCv });
				setCvList(response?.data);
			};
			getCvList();
		} catch (error) {
			console.error(error);
			toast.error(error.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	const onCreateCv = () => {
		window.open(`${routeMap.file}${routeMap.cv}/pro`);
		setShowSelectCv(false);
	};

	const onViewCv = (code) => {
		window.open(`${routeMap.file}${routeMap.cv}/${code}`);
	};

	const onConfirmApply = async () => {
		dispatch(updateLoading(true));
		try {
			const response = await httpAuthPost({
				endpoint: apiCandidateApplyJob,
				data: { jobId: data?.id || data?.jobId, cvId: cvSelected },
			});
			if (response.status === 200) {
				toast.success("Ứng tuyển thành công");
				setShowSelectCv(false);
			} else {
				toast.error(errorMessage);
				console.error(response.message);
			}
		} catch (error) {
			console.error(error);
			toast.error(error.message || error);
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
							<span className="mr-2">Lượt xem: {data?.countViewer || 0}.</span>
							<span className="mr-2">
								Hạn nộp hồ sơ: {getDate(data?.submissionDeadline)}
							</span>
							{/* <span>Ngày duyệt: {getDate(data?.approvalDate)}</span> */}
						</div>
					</div>
				</div>
				<div className="flex gap-2">
					{!data?.saved ? (
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
							onClick={onSave}
						>
							Bỏ lưu công việc
						</Button>
					)}
					<Button
						type="primary"
						size="middle"
						icon={<RememberMe fontSize="small" />}
						onClick={onApply}
					>
						Ứng tuyển ngay
					</Button>
				</div>
			</div>
			<Modal
				open={showSelectCv}
				onCancel={() => setShowSelectCv(false)}
				title="Chọn CV"
				okButtonProps={{ disabled: !cvSelected }}
				onOk={onConfirmApply}
			>
				{isEmpty(cvList) ? (
					<div className="text-center">
						<p className="text-xl my-5">Bạn chưa có CV?</p>
						<p>
							<Button type="primary" danger onClick={onCreateCv}>
								Tạo CV ngay
							</Button>
						</p>
					</div>
				) : (
					<Radio.Group
						onChange={onSelectCv}
						value={cvSelected}
						className="w-full"
					>
						<Space direction="vertical" className="w-full">
							{cvList?.map((item, i) => (
								<div
									className="flex justify-between pb-2 border-b w-full"
									key={i}
								>
									<Radio value={item?.id}>{item?.name}</Radio>
									<div className="cursor-pointer">
										<Tooltip title="Xem chi tiết" placement="right">
											<RemoveRedEyeRounded
												onClick={() => onViewCv(item?.templateCode)}
											/>
										</Tooltip>
									</div>
								</div>
							))}
						</Space>
					</Radio.Group>
				)}
			</Modal>
		</div>
	);
}

export default JobGeneralInfo;
