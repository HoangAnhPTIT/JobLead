import {
	CalendarMonthOutlined,
	FmdGood,
	Groups,
	MonetizationOnOutlined,
	Place,
	PlaceOutlined,
	Public,
	QueryBuilderOutlined,
} from "@mui/icons-material";
import { Col, Row } from "antd";
import Image from "next/image";
import React from "react";
import Breadcrumb from "src/commons/Breadcrumb";
import ImageFull from "src/commons/Image";
import routeMap from "src/constants/routeMap";

const CompanyDetail = () => {
	const breadcrum = [
		{
			title: "Trang chủ",
			href: "/",
		},
		{
			title: "Công ty",
			href: routeMap.company,
		},
		{
			title: "Công ty xyz",
		},
	];

	return (
		<div className="bg-bgBody">
			<div className="w-full sm:w-smContent md:w-mdContent lg:w-lgContent xl:w-xlContent mx-auto pb-5">
				<Breadcrumb items={breadcrum} />
				<div className="relative border bg-white">
					<ImageFull src="https://placehold.co/1138x400.png" />
					<div className="ml-40 my-2">
						<h1 className="text-2xl text-primary">Coong ty co phan XYZ</h1>
						<p className="text-sm mt-2">
							<FmdGood fontSize="small" className="text-primary mr-1" />
							12, Go Vap, HCM
						</p>
						<p className="text-sm mt-1">
							<Public fontSize="small" className="text-primary mr-1" />
							http://localhost
						</p>
					</div>
					<div className="shadow p-1 absolute bottom-4 left-4 w-32 h-132 bg-white">
						<ImageFull src="https://placehold.co/116x116.png" />
					</div>
				</div>

				<h1 className="text-2xl mt-4 mb-2">GIỚI THIỆU CÔNG TY</h1>
				<Row gutter={[16, 16]}>
					<Col xs={24} lg={18}>
						<div>
							<div className="bg-white p-4 text-sm">
								Công ty Cổ Phần ATZ Life ra đời năm 2010, là công ty chuyên cung
								cấp các giải pháp chăm sóc sức khỏe – sắc đẹp – hương thơm mang
								đẳng cấp quốc tế. Với lịch sử hình thành và phát triển hơn 10
								năm qua, ATZ Life đã khẳng định tên tuổi, thương hiệu ATZ
								Organic với hệ thống gần 20 cửa hàng đặt ở Trung tâm thương mại
								nổi tiếng tại các thành phố lớn trên khắp Việt Nam như: TP HCM,
								Hà Nội, Đà Nẵng. Với sự sáng lập của nữ doanh nhân Trương Thị
								Thanh Tâm, ATZ Life vận hành với kim chỉ nam nâng cao chất lượng
								cuộc sống cho người tiêu dùng thông qua các sản phẩm chăm sóc
								sức khỏe, bồi dưỡng thể chất, nâng cao tinh thần hay các sản
								phẩm chăm sóc sắc đẹp cho bạn vẻ đẹp rạng ngời tỏa sáng. Ngoài
								ra, với dòng sản phẩm hương thơm. ATZ Life hy vọng có thể lan
								tỏa hơi thở tươi mát từ thiên nhiên cho không gian sống, không
								gian làm việc của bạn và người thân thương.
							</div>
						</div>
						<div>
							<h1 className="text-2xl my-2">TUYỂN DỤNG</h1>
							<div className="bg-white text-sm p-2">
								<Row gutter={[8, 8]}>
									<Col span={12}>
										<div className="rounded border text-sm p-2">
											<h4 className="font-semibold">Nhân viên kế toán</h4>
											<Row gutter={[8, 4]}>
												<Col span={12}>
													<CalendarMonthOutlined
														fontSize="inherit"
														className="mr-1"
													/>
													29/02/2024
												</Col>
												<Col span={12}>
													<PlaceOutlined fontSize="inherit" className="mr-1" />
													Hồ Chí Minh
												</Col>
												<Col span={12}>
													<MonetizationOnOutlined
														fontSize="inherit"
														className="mr-1"
													/>
													Thương lượng
												</Col>
												<Col span={12}>
													<QueryBuilderOutlined
														fontSize="inherit"
														className="mr-1"
													/>
													Hopjw dong
												</Col>
											</Row>
										</div>
									</Col>
								</Row>
							</div>
						</div>
					</Col>
					<Col xs={24} lg={6}>
						<div className="p-1 bg-white border">
							<ImageFull src="/images/we-need-you.jpg" />
							<div className="p-2">
								<h4 className="font-semibold mb-2">THÔNG TIN CÔNG TY</h4>
								<div className="text-[13px]">
									<p>
										<Place fontSize="inherit" className="text-primary" />
										<span className="font-semibold mx-2">Địa chỉ:</span>15
										Nguyễn Văn Dung, Phường 06, Quận Gò Vấp
									</p>
									<p>
										<Groups fontSize="inherit" className="text-primary" />
										<span className="font-semibold mx-2">Quy mô:</span>HCM
									</p>
									<p>
										<Public fontSize="inherit" className="text-primary" />
										<span className="font-semibold mx-2">Website:</span>HCM
									</p>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default CompanyDetail;
