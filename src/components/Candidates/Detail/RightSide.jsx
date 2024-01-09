import { Download, Email, Save, Visibility } from "@mui/icons-material";
import React from "react";

const RightSide = () => {
	return (
		<div className="bg-white p-5">
			<div className="pb-2 border-b text-center text-xl uppercase font-semibold">
				Bạn có muốn
			</div>
			<div className="py-2 px-1 border-b">
				<Visibility fontSize="small" /> Xem thông tin liên hệ
				<span className="text-white rounded bg-yellow3 text-xs px-1 py-0.5 float-right">
					10đ
				</span>
			</div>
			<div className="py-2 px-1 border-b">
				<Email fontSize="small" /> Email mời ứng tuyển
				<span className="text-white rounded bg-yellow3 text-xs px-1 py-0.5 float-right">
					5đ
				</span>
			</div>
			<div className="py-2 px-1 border-b">
				<Save fontSize="small" /> Lưu lại CV
			</div>
			<div className="py-2 px-1 border-b">
				<Download fontSize="small" /> Tải CV PDF
			</div>
			<div className="py-2 px-1 border-b text-center">
				Cập nhật lần cuối: 56 giây trước
			</div>
		</div>
	);
};

export default RightSide;
