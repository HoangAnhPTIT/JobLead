import { Adjust, ArrowForwardIos, HeadsetMic } from "@mui/icons-material";
import { Collapse } from "antd";
import classNames from "classnames";
import { useState } from "react";
import { responsiveContent } from "src/constants/css";

const domain_name = process.env.DOMAIN_NAME;

const advantage = [
	"Ứng viên đông đảo",
	"Kết nối dễ dàng",
	"Công cụ tìm kiếm và gợi ý thông minh",
	"Hiệu quả chi phí tối ưu",
];

const suportInfo = [
	{
		phone: "0234 345 545",
		name: "Ms Hoang Anh",
	},
	{
		phone: "0234 345 545",
		name: "Ms Hoang Anh",
	},
	{
		phone: "0234 345 545",
		name: "Ms Hoang Anh",
	},
	{
		phone: "0234 345 545",
		name: "Ms Hoang Anh",
	},
	{
		phone: "0234 345 545",
		name: "Ms Hoang Anh",
	},
	{
		phone: "0234 345 545",
		name: "Ms Hoang Anh",
	},
	{
		phone: "0234 345 545",
		name: "Ms Hoang Anh",
	},
];

const questions = [
	{
		key: "1",
		label: "Làm cách nào để đăng ký gói lọc ứng viên hiệu quả?",
		children: (
			<div>
				Để chọn lọc được ứng viên hiệu quả, Timviec.com.vn đang triển khai 3 gói
				lọc ứng viên chất lượng, hỗ trợ tối đa nhà tuyển dụng tìm được ứng viên
				phù hợp
			</div>
		),
	},
	{
		key: "2",
		label: "Gói lọc hồ sơ ứng viên là gì?",
		children: (
			<div>
				Gói lọc hồ sơ ứng viên là quá trình xác định xem liệu một ứng viên có đủ
				điều kiện cho một vị trí tuyển dụng hay không, dựa trên thành tích học
				tập, kinh nghiệm làm việc và các thông tin khác (được ghi trong hồ sơ
				của họ).
			</div>
		),
	},
	{
		key: "3",
		label: "Sự khác nhau giữa nhà tuyển dụng có điểm và không có điểm?",
		children: (
			<div>
				Nhà tuyển dụng có điểm sẽ xem được thông tin như email và số điện thoại
				khi hồ sơ của ứng viên đó phù hợp với vị trí đăng tuyển. Nhà tuyển dụng
				không có điểm sẽ không xem được phần thông tin quan trọng đấy.
			</div>
		),
	},
	{
		key: "4",
		label: "Hình thức thanh toán khi mua các gói lọc hồ sơ như thế nào?",
		children: (
			<div>
				{domain_name} nhận thanh toán online qua hình thức chuyển khoản ngân
				hàng.
				<br />
				<strong>Ngân hàng TMCP Kỹ Thương Việt Nam - Techcombank</strong> <br />
				Chi nhánh: <strong>Đông Đô</strong>
				<br />
				Chủ tài khoản: <strong>CÔNG TY TNHH TD24</strong> <br />
				Số tài khoản: <strong>1893 501 762</strong>
				7017 <br /> Nội dung:{" "}
				<strong>So Dien Thoai_Thanh Toan_Goi Dich Vu</strong>
			</div>
		),
	},
	{
		key: "5",
		label: "Có hình thức bảo hành/đảm bảo không?",
		children: (
			<div>
				{domain_name} có hỗ trợ bảo hành với tất cả các gói lọc hồ sơ. Cụ thể
				là, nếu thông tin liên hệ của ứng viên không chính xác, chúng tôi sẽ bảo
				hành 1 đổi 1 trong những trường hợp đấy.
			</div>
		),
	},
];

const SupportInfo = () => {
	const [activeKey, setActiveKey] = useState(null);

	const onChangeExpanded = (key) => {
		setActiveKey(key === activeKey ? null : key);
	};

	return (
		<div className={classNames(responsiveContent, "py-10  text-33")}>
			<h1 className="text-2xl font-semibold text-center">
				Bạn cần tư vấn thêm?
			</h1>
			<div className="bg-primary w-36 h-1 my-4 mx-auto" />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				<div>
					<h1 className="text-base">
						Thay vì đau đầu với quá nhiều sự lựa chọn không hiệu quả, hãy tập
						trung vào một con đường duy nhất có thể đảm bảo cho bạn các tính
						năng nổi bật:
					</h1>
					<div className="my-2.5 text-[15px]">
						{advantage.map((item, i) => (
							<p key={i} className="mb-1 flex items-center">
								<Adjust fontSize="16px" className="mr-2 text-primary" />
								{item}
							</p>
						))}
					</div>
					<div className="bg-bgPhone p-3 mt-5">
						<h1 className="text-lg font-semibold">
							<HeadsetMic /> Hotline hỗ trợ nhà tuyển dụng
						</h1>
						<div className="grid grid-cols-2 p-1">
							{suportInfo.map((item, i) => (
								<p key={i}>
									<span className="text-[#d00] mr-1 font-semibold">
										{item?.phone}
									</span>
									{item?.name}
								</p>
							))}
						</div>
					</div>
					<div>
						<div className="bg-primary text-center py-2 text-white text-lg mt-5 font-semibold">
							THÔNG TIN LIÊN HỆ
						</div>
						<div className="grid grid-cols-2">
							<div className="text-center py-2">
								<h3 className="font-semibold text-base">
									Thông tin hỗ trợ cho ứng viên:
								</h3>
								<p className="text-[15px]">
									Hotline:
									<span className="text-primary font-semibold ml-1">
										0123 456 789
									</span>
								</p>
								<p className="text-[15px]">Email: supporttd@gmail.com</p>
							</div>
							<div className="text-center py-2">
								<h3 className="font-semibold text-base">
									Thông tin hỗ trợ cho doanh nghiệp:
								</h3>
								<p className="text-[15px]">
									Hotline:
									<span className="text-primary font-semibold ml-1">
										0123 456 789
									</span>
								</p>
								<p className="text-[15px]">Email: supporttd@gmail.com</p>
							</div>
						</div>
					</div>
				</div>
				<div>
					{questions.map((question) => (
						<Collapse
							items={[question]}
							activeKey={activeKey}
							onChange={() => onChangeExpanded(question.key)}
							key={question.key}
							className="!mb-3"
							expandIcon={({ isActive }) => (
								<ArrowForwardIos
									className={classNames(
										"!text-primary !text-lg",
										isActive ? "rotate-90" : "	rotate-0"
									)}
								/>
							)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default SupportInfo;
