import React from "react";
import { imageDefault } from "src/constants/common";
import { responsiveContent } from "src/constants/css";
import { Image } from "antd";

const bankColor = "#e02329";

const LineDivider = () => <div className="bg-primary w-36 h-1 my-4 mx-auto" />;
const domain_name = process.env.DOMAIN_NAME;

const MoreInfo = () => {
	return (
		<div>
			<div className="bg-[#f8f9fa] text-33 py-10 mt-10">
				<div className="text-center">
					<h1 className="text-2xl font-semibold">Hướng dẫn thanh toán</h1>
					<LineDivider />
					<h3 className="text-[15px]">
						Chúng tôi sẽ liên hệ với bạn để xác nhận thông tin kích hoạt dịch vụ
						<br />
						ngay sau khi nhận được thông báo chuyển khoản
					</h3>
				</div>
				<div className="rounded border border-dotted border-secondary bg-[#fff8ed] p-6 w-[555px] mx-auto flex gap-6 text-base mt-6 mb-4">
					<div>
						<Image
							src={imageDefault}
							width={100}
							height={100}
							preview={false}
							alt=""
						/>
					</div>
					<div style={{ color: bankColor }}>
						<h2 className="font-semibold">Ngân hàng ACB</h2>
						<h3 className="font-semibold mb-1">Chi nhánh: Đống Đa</h3>
						<h3>
							<span className="text-33">Chủ tài khoản:</span> Công ty TNHH
							{domain_name}
						</h3>
						<h3>
							<span className="text-33">Số tài khoản:</span> 123 456 789
						</h3>
						<h3>
							<span className="text-33">Nội dụng:</span> 4 So Cuoi Cua
							SĐT_Thanh-toan-goi-dich-vu
						</h3>
					</div>
				</div>
				<div className="text-center">
					<span className="font-semibold">Lưu ý</span>: Nội dung có thể bỏ qua
					ký tự đặc biệt như: @ . ,
					<br />
					Ví dụ: 5678_Thanh Toan_TVCV1
				</div>
			</div>
			<div>
				<div className="text-center py-10">
					<h1 className="text-2xl font-semibold">
						Khách hàng của {domain_name}
					</h1>
					<LineDivider />
					<h3>
						Được tin dùng bởi hơn 100,000 khách hàng cá nhân và doanh nghiệp tại
						Việt Nam, Timviec không ngừng thay đổi
						<br />
						nhằm đáp ứng nhu cầu ngày càng cao của khách hàng trong các hoạt
						động tuyển dụng.
					</h3>
				</div>
			</div>
		</div>
	);
};

export default MoreInfo;
