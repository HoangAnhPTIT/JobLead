import { Business } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { apiCompany } from "src/apis/apiEndpoint";
import { imageError } from "src/constants/common";
import { getDate } from "src/helper/format";

function JobGeneralInfo({ data }) {
	console.log("data", data);
	return (
		<div className="shadow-ccc p-5 bg-white">
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
					<Link href={`${apiCompany}/${data?.company?.id}`}>
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
					<div className="font-light text-sm">
						{/* Lượt xem: 0 .  */}
						Hạn nộp hồ sơ: {getDate(data?.submissionDeadline)} . Ngày duyệt:{" "}
						{getDate(data?.approvalDate)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default JobGeneralInfo;
