import {
	CalendarMonth,
	Engineering,
	Groups,
	MilitaryTech,
	Paid,
	PinDrop,
	WorkHistory,
} from "@mui/icons-material";
import { Grid } from "@mui/material";

const Description = ({ title, content }) => {
	return (
		<div className="p-5">
			<div className="border-b border-dd">
				<span className="text-hlBlue text-lg uppercase font-semibold border-b-2 border-hlBlue pb-0.5">
					{title}
				</span>
			</div>
			<div className="px-2 py-4">{content}</div>
		</div>
	);
};

const JobDetailInfo = ({ data }) => {
	return (
		<div className="py-5 bg-white">
			<Grid container className="">
				<Grid item xs={9}>
					<Grid container>
						<Grid item xs={6} className="px-4">
							<div className="mb-4">
								<Paid className="text-primary" />
								<span className="font-semibold ml-2 mr-1">Mức lương:</span>
								Thương lượng
							</div>
							<div className="mb-4">
								<WorkHistory className="text-primary" />
								<span className="font-semibold ml-2 mr-1">
									Hình thức làm việc:
								</span>
								Dài hạn
							</div>
							<div className="mb-4">
								<PinDrop className="text-primary" />
								<span className="font-semibold ml-2 mr-1">
									Địa điểm làm việc:
								</span>
								Lô B1.4, đường Đ2, khu công nghiệp Đồng An 2, Phường Hoà Phú,
								Thành phố Thủ Dầu Một, Tỉnh Bình Dương, Việt Nam
							</div>
						</Grid>
						<Grid item xs={6} className="px-4">
							<div className="mb-4">
								<Groups className="text-primary" />
								<span className="font-semibold ml-2 mr-1">Số lượng:</span> 10
							</div>
							<div className="mb-4">
								<MilitaryTech className="text-primary" />
								<span className="font-semibold ml-2 mr-1">Chức vụ:</span> Nhân
								viên
							</div>
							<div className="mb-4">
								<CalendarMonth className="text-primary" />
								<span className="font-semibold ml-2 mr-1">
									Ngày đăng tuyển:
								</span>
								13/12/2023
							</div>
						</Grid>
						<Grid item xs={12} className="px-4">
							<div className="mb-4">
								<Engineering className="text-primary" />
								<span className="font-semibold ml-2 mr-1">Ngành nghề:</span>
								Cơ khí chế tạo
							</div>
						</Grid>
					</Grid>
					<div>
						<Description
							title={"Mô tả công việc"}
							content={data?.description}
						/>
					</div>
					<div>
						<Description
							title={"Quyền lợi được hưởng"}
							content={data?.benifitDescription}
						/>
					</div>
					<div>
						<Description
							title={"Yêu cầu công việc"}
							content={data?.jobRequirement?.requestDescription}
						/>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default JobDetailInfo;
