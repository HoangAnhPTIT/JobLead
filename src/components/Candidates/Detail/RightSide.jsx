import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
	ArrowBackOutlined,
	ArrowForwardOutlined,
	Download,
	Email,
	Save,
	Visibility,
} from "@mui/icons-material";
import { Button, Modal } from "antd";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { toast } from "react-toastify";
import { httpAuthPost } from "src/apis/apiAuthCaller";
import {
	apiCompanyApplicantSave,
	apiCompanyBuyObject,
} from "src/apis/apiEndpoint";
import { BUY_OBJECT_TYPE } from "src/constants/buyObjectType";
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
		(days > 0 ? `${days} ngày ` : "") +
		(hours > 0 ? `${hours} giờ ` : "") +
		(minutes > 0 ? `${minutes} phút ` : "") +
		`${seconds} giây`
	);
};

const RightSide = ({
	info,
	getData,
	cvTemplate,
	setCvTemplate,
	originalData,
}) => {
	const dispatch = useAppDispatch();

	const indexTemplate =
		1 +
		originalData?.cvs?.findIndex((item) => item?.templateCode === cvTemplate);
	const amountCv = originalData?.cvs?.length || 0;

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
			content: `Bạn có muốn sử dụng ${originalData?.viewPoint} điểm để xem thông tin ứng viên?`,
			onOk: async () => {
				dispatch(updateLoading(true));
				try {
					const res = await httpAuthPost({
						endpoint: apiCompanyBuyObject,
						data: {
							objectId: originalData?.id,
							objectType: BUY_OBJECT_TYPE.CANDIDATE
						},
					});
					if (res.status === 200) {
						toast.success("Đổi điểm thành công");
						getData();
					} else {
						toast.error(res.message);
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
		toast.info(developingMessage);

		// Modal.info({
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
		// });
	};

	const onSaveCv = async () => {
		dispatch(updateLoading(true));
		try {
			const res = await httpAuthPost({
				endpoint: apiCompanyApplicantSave,
				data: { applicantId: originalData?.userId },
			});
			if (res.status === 200) {
				toast.success("Lưu CV thành công");
			} else {
				toast.error(res?.message || errorMessage);
			}
		} catch {
			toast.error(errorMessage);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	const onDownload = async () => {
		const printDocument = () => {
			// const input = document.getElementById("cv");
			// const inputHeight = input.offsetHeight;
			// const inputWidth = input.offsetWidth;

			// html2canvas(input, {
			// 	scale: 2,
			// 	windowWidth: inputWidth,
			// 	windowHeight: inputHeight,
			// 	scrollX: -window.scrollX,
			// 	scrollY: -window.scrollY,
			// 	x: input.offsetLeft,
			// 	y: input.offsetTop,
			// }).then((canvas) => {
			// 	const imgData = canvas.toDataURL("image/png", 1.0);
			// 	const pdf = new jsPDF({
			// 		orientation: "p",
			// 		unit: "px",
			// 		format: [inputWidth, inputHeight],
			// 	});

			// 	const imgProps = pdf.getImageProperties(imgData);
			// 	const pdfWidth = pdf.internal.pageSize.getWidth();
			// 	const pdfHeight = pdf.internal.pageSize.getHeight();
			// 	let heightLeft = imgProps.height;

			// 	let position = 0;
			// 	pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
			// 	heightLeft -= pdfHeight;

			// 	while (heightLeft >= 0) {
			// 		position = heightLeft - imgProps.height;
			// 		pdf.addPage();
			// 		pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
			// 		heightLeft -= pdfHeight;
			// 	}

			// 	pdf.save("download.pdf");
			// });
			const input = document.getElementById("cv");
			html2canvas(input, {
				useCORS: true,
				scale: 2, // Higher scale for better resolution
			}).then((canvas) => {
				const imgData = canvas.toDataURL("image/jpeg", 1.0); // High-quality JPEG
				const pdf = new jsPDF({
					orientation: "p",
					unit: "px",
					format: [canvas.width, canvas.height],
				});

				pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
				pdf.save("download.pdf");
			});
		};
		printDocument();
		// toast.info(developingMessage);
	};

	const onPrev = () => {
		indexTemplate > 1 &&
			setCvTemplate(originalData?.cvs?.[indexTemplate - 2]?.templateCode);
	};
	const onNext = () => {
		indexTemplate < amountCv &&
			indexTemplate > 0 &&
			setCvTemplate(originalData?.cvs?.[indexTemplate]?.templateCode);
	};

	return (
		<div className="bg-white p-5">
			<div className="pb-2 border-b text-center text-xl uppercase font-semibold">
				Bạn có muốn
			</div>
			{!originalData?.isViewed && (
				<div
					className="py-2 px-1 border-b cursor-pointer"
					onClick={onViewCandidate}
				>
					<Visibility fontSize="small" /> Xem thông tin liên hệ
					<span className="text-white rounded bg-yellow3 text-xs px-1 py-0.5 float-right">
						{originalData?.viewPoint || 0}đ
					</span>
				</div>
			)}
			<div className="py-2 px-1 border-b cursor-pointer" onClick={onSendEmail}>
				<Email fontSize="small" /> Email mời ứng tuyển
				<span className="text-white rounded bg-yellow3 text-xs px-1 py-0.5 float-right">
					{originalData?.emailPoint || 0}đ
				</span>
			</div>
			<div className="py-2 px-1 border-b cursor-pointer" onClick={onSaveCv}>
				<Save fontSize="small" /> Lưu lại CV
			</div>
			<div className="py-2 px-1 border-b cursor-pointer" onClick={onDownload}>
				<Download fontSize="small" /> Tải CV PDF
			</div>
			<div className="py-2 px-1 border-b text-center">
				Cập nhật lần cuối:{" "}
				<span>
					{originalData?.lastUpdatedDate
						? `${getTimeBefore(
								dayjs() - dayjs(originalData?.lastUpdatedDate)
						  )} trước`
						: "__"}
				</span>
			</div>
			<div className="flex justify-around mt-10">
				<Button
					icon={<ArrowBackOutlined />}
					className="!rounded-full !bg-ee !flex items-center"
					onClick={onPrev}
				>
					CV trước
				</Button>
				<span className="text-xl font-semibold">
					{indexTemplate || 0}/{amountCv}
				</span>
				<Button
					icon={<ArrowForwardOutlined />}
					className="!rounded-full !bg-ee !flex items-center"
					onClick={onNext}
				>
					CV sau
				</Button>
			</div>
		</div>
	);
};

export default RightSide;
