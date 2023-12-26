import { Business } from "@mui/icons-material";
import React from "react";
import ImageFull from "src/commons/Image";

function JobGeneralInfo() {
	return (
		<div className="shadow-ccc p-5 bg-white">
			<div className="flex gap-8">
				<div>
					<ImageFull src={"https://placehold.co/160.png"} alt={""} />
				</div>
				<div className="flex-1">
					<h1 className="text-33 text-xl font-semibold ">Cộng tác viên</h1>
					<div className="text-hlBlue">
						<Business /> Công ty xzo
					</div>
					<div className="text-sm">
						<span className="font-semibold text-33 mr-1">
							Khu vực tuyển dụng:
						</span>
						<span className="text-hlBlue">Hà nội</span>
					</div>
					<div className="text-sm">
						<span className="font-semibold text-33 mr-1">Mức lương:</span>
						<span className="text-hlRed">15 - 20 trẹo</span>
					</div>
					<div className="font-light text-sm">
						Lượt xem: 80 . Hạn nộp hồ sơ: 01/01/2024 . Ngày duyệt: 18/12/2023{" "}
					</div>
				</div>
			</div>
		</div>
	);
}

export default JobGeneralInfo;
