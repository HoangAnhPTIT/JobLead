import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Download, Email, Save, Visibility } from "@mui/icons-material";
import { Modal } from "antd";
import dayjs from "dayjs";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { toast } from "react-toastify";
import { httpAuthPost } from "src/apis/apiAuthCaller";
import { apiCompanyViewCandidate } from "src/apis/apiEndpoint";
import { developingMessage, errorMessage } from "src/constants/common";

const getTimeBefore = (milisecondsBefore) => {
	const secondsBefore = Math.floor(milisecondsBefore / 1000);
	const days = Math.floor(secondsBefore / 86400);
	const hours = days
		? Math.floor((secondsBefore - days * 24 * 3600) / 3600)
		: Math.floor(secondsBefore / 3600);
	const minutes = hours
		? Math.floor((secondsBefore - days * 24 * 3600 - hours * 3600) / 60)
		: Math.floor(secondsBefore / 60);
	const seconds = minutes
		? Math.floor(secondsBefore - days * 24 * 3600 - hours * 3600 - minutes * 60)
		: secondsBefore;

	return (
		(days && `${days} ngày `) +
		(hours && `${hours} giờ `) +
		(minutes && `${minutes} phút `) +
		`${seconds} giây`
	);
};

const RightSide = ({ info, getData }) => {
	const dispatch = useAppDispatch();

	const confirm = ({ content, onOk }) => {
		Modal.confirm({
			title: "Xác nhận",
			icon: <ExclamationCircleOutlined />,
			content,
			okText: "OK",
			cancelText: "Huỷ",
			onOk,
			autoFocusButton: false,
		});
	};

	const onViewCandidate = () => {
		confirm({
			content: `Bạn có muốn sử dụng ${info?.viewPoint} điểm để xem thông tin ứng viên?`,
			onOk: async () => {
				dispatch(updateLoading(true));
				try {
					const res = await httpAuthPost({
						endpoint: apiCompanyViewCandidate,
						data: {
							candidateId: info?.id,
						},
					});
					if (res.status === 200) {
						toast.success("Đổi điểm thành công");
						getData();
					} else {
						toast.error(errorMessage);
					}
				} catch {
					toast.error(errorMessage);
				} finally {
					dispatch(updateLoading(false));
				}
			},
		});
	};

	const onSendEmail = () => {
		Modal.info({
			content: developingMessage,
			onOk: () => {},
			// content: `Bạn có muốn sử dụng ${info?.emailPoint} điểm để gửi emai cho ứng viên?`,
			// onOk: async () => {
			// 	dispatch(updateLoading(true));
			// 	try {
			// 		const res = await httpAuthPost({
			// 			endpoint: apiCompanyViewCandidate,
			// 			data: {
			// 				candidateId: info?.userId,
			// 			},
			// 		});
			// 		if (res.status === 200) {
			// 			toast.success("Đổi điểm thành công");
			// 		} else {
			// 			toast.error(errorMessage);
			// 		}
			// 	} catch {
			// 		toast.error(errorMessage);
			// 	} finally {
			// 		dispatch(updateLoading(false));
			// 	}
			// },
		});
	};

	return (
		<div className="bg-white p-5">
			<div className="pb-2 border-b text-center text-xl uppercase font-semibold">
				Bạn có muốn
			</div>
			{!info?.isViewed && (
				<div
					className="py-2 px-1 border-b cursor-pointer"
					onClick={onViewCandidate}
				>
					<Visibility fontSize="small" /> Xem thông tin liên hệ
					<span className="text-white rounded bg-yellow3 text-xs px-1 py-0.5 float-right">
						{info?.viewPoint || 0}đ
					</span>
				</div>
			)}
			<div className="py-2 px-1 border-b cursor-pointer" onClick={onSendEmail}>
				<Email fontSize="small" /> Email mời ứng tuyển
				<span className="text-white rounded bg-yellow3 text-xs px-1 py-0.5 float-right">
					{info?.emailPoint || 0}đ
				</span>
			</div>
			<div className="py-2 px-1 border-b">
				<Save fontSize="small" /> Lưu lại CV
			</div>
			<div className="py-2 px-1 border-b">
				<Download fontSize="small" /> Tải CV PDF
			</div>
			<div className="py-2 px-1 border-b text-center">
				Cập nhật lần cuối:{" "}
				{getTimeBefore(dayjs() - dayjs(info?.lastUpdatedDate))} trước
			</div>
		</div>
	);
};

export default RightSide;
