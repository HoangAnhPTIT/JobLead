"use client";
import {
	AccountTreeOutlined,
	LocationOnOutlined,
	SchoolOutlined,
	Search,
	StarBorderOutlined,
	WorkOutline,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import Category from "src/commons/Category";

const color = "#f19a2c";

const Item = () => {
	return (
		<div className="rounded border px-4 py-3 my-5">
			<div className="mb-1">
				<span className="text-54 text-lg font-bold">Phan Thị Mỹ Vân</span>
				<span className="text-white rounded-full bg-red1 px-3 pb-0.5 font-semibold text-xs ml-2">
					Đang tìm việc
				</span>
			</div>
			<Grid container spacing={3}>
				<Grid item xs={9} className="text-54">
					<div className="text-[15px]">
						<span>Nhân viên quản lý</span>
						<span className="dot-ce"></span>
						<span>24 tuổi</span>
						<span className="dot-ce"></span>
						<span>Kinh nghiệm: Chưa có</span>
					</div>
					<div className="text-sm">
						<p className="my-1">
							<span className="mr-5">
								<LocationOnOutlined
									fontSize="small"
									style={{ color }}
									className="mr-1"
								/>
								Địa điểm: Hà Nội
							</span>
							<span>
								<AccountTreeOutlined
									fontSize="small"
									style={{ color }}
									className="mr-1"
								/>
								Nhân viên
							</span>
						</p>
						<p className="my-1">
							<StarBorderOutlined
								fontSize="small"
								style={{ color }}
								className="mr-1"
							/>
							Ngành nghề: Sinh viên / Mới tốt nghiệp / Thực tập
						</p>
						<p className="my-1">
							<WorkOutline
								fontSize="small"
								style={{ color }}
								className="mr-1"
							/>
							Nhân viên thủ khoa
						</p>
						<p className="my-1">
							<SchoolOutlined
								fontSize="small"
								style={{ color }}
								className="mr-1"
							/>
							Cử nhân bách hóa xanh
						</p>
					</div>
				</Grid>
				<Grid item xs={3} className="font-bold text-base text-555552">
					12 - 15 triệu
				</Grid>
			</Grid>
		</div>
	);
};

const CandidateList = () => {
	return (
		<Category
			title="Danh sách ứng viên"
			icon={<Search />}
			contentClass="p-5 !py-5"
		>
			<Item />
			<Item />
			<Item />
			<Item />
		</Category>
	);
};

export default CandidateList;
