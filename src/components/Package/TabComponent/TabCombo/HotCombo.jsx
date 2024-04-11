import React from "react";
import PackageDetail from "./PackageDetail";

const hotInfo = {
	COMBOH1: {
		title: "COMBO ĐĂNG TIN HOT & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 1,485,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hot tại đầu trang chủ, tiếp cận với 100% Ứng viên",
			"Khách hàng được xem 100 hồ sơ ứng viên bất kỳ trong thời gian 1 tháng",
			"Đăng tin cơ bản không giới hạn",
		],
		special: [
			"Tin sẽ được bảo lưu khi đã tuyển đủ ứng viên mà chưa hết thời hạn đăng",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	COMBOH2: {
		title: "COMBO ĐĂNG TIN HOT & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 2,714,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hot tại đầu trang chủ, tiếp cận với 100% Ứng viên",
			"Khách hàng được xem 200 hồ sơ ứng viên bất kỳ trong thời gian 2 tháng",
			"Đăng tin cơ bản không giới hạn",
		],
		special: [
			"Tặng hiệu ứng nổi bật tùy chọn trị giá 440.000đ",
			"Tặng ngay dịch vụ Đăng tin trên Trang Ngành 1 tuần trị giá 877.500đ",
			"Tin sẽ được bảo lưu khi đã tuyển đủ ứng viên mà chưa hết thời hạn đăng",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	COMBOH3: {
		title: "COMBO ĐĂNG TIN HOT & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 2,912,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hot tại đầu trang chủ, tiếp cận với 100% Ứng viên",
			"Khách hàng được xem 300 hồ sơ ứng viên bất kỳ trong thời gian 2 tháng",
			"Đăng tin cơ bản không giới hạn",
		],
		special: [
			"Tặng hiệu ứng nổi bật tùy chọn trị giá 440.000đ",
			"Tin sẽ được bảo lưu khi đã tuyển đủ ứng viên mà chưa hết thời hạn đăng",
			"Tặng ngay dịch vụ Đăng tin trên Trang Ngành 2 tuần trị giá 1.755.000đ",
			"Chiết khấu thêm 10% và tặng 400 điểm lọc hồ sơ cho lần tái ký tiếp theo",
		],
	},
	COMBOH4: {
		title: "COMBO ĐĂNG TIN HOT & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 2,966,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hot tại đầu trang chủ, tiếp cận với 100% Ứng viên",
			"Khách hàng được xem 100 hồ sơ ứng viên bất kỳ trong thời gian 2 tháng",
			"Đăng tin cơ bản không giới hạn",
		],
		special: [
			"Tặng hiệu ứng nổi bật tùy chọn trị giá 440.000đ",
			"Tin sẽ được bảo lưu khi đã tuyển đủ ứng viên mà chưa hết thời hạn đăng",
			"Tặng ngay dịch vụ Đăng tin trên Trang Ngành 2 tuần trị giá 1.755.000đ",
			"Chiết khấu thêm 10% và tặng 400 điểm lọc hồ sơ cho lần tái ký tiếp theo",
		],
	},
	COMBOH5: {
		title: "COMBO ĐĂNG TIN HOT & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 4,145,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hot tại đầu trang chủ, tiếp cận với 100% Ứng viên",
			"Khách hàng được xem 200 hồ sơ ứng viên bất kỳ trong thời gian 2 tháng",
			"Đăng tin cơ bản không giới hạn",
		],
		special: [
			"Tặng hiệu ứng nổi bật tùy chọn trị giá 440.000đ",
			"Tặng ngay dịch vụ Đăng tin trên Trang Ngành 1 tuần trị giá 877.500đ",
			"Tin sẽ được bảo lưu khi đã tuyển đủ ứng viên mà chưa hết thời hạn đăng",
			"Chiết khấu thêm 10% và tặng 400 điểm lọc hồ sơ cho lần tái ký tiếp theo",
		],
	},
	COMBOH6: {
		title: "COMBO ĐĂNG TIN HOT & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 3,645,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hot tại đầu trang chủ, tiếp cận với 100% Ứng viên",
			"Khách hàng được xem 300 hồ sơ ứng viên bất kỳ trong thời gian 5 tháng",
			"Đăng tin cơ bản không giới hạn",
		],
		special: [
			"Tặng ngay dịch vụ Đăng tin trên Trang Ngành 2 tuần trị giá 1.755.000đ",
			"Tặng 1 tuần trải nghiệm gắn Banner tuyển dụng tại đầu trang chủ 1 tuần trị giá 2.360.000đ",
			"Tin sẽ được bảo lưu khi đã tuyển đủ ứng viên mà chưa hết thời hạn đăng",
			"Chiết khấu thêm 10% và tặng 400 điểm lọc hồ sơ cho lần tái ký tiếp theo",
		],
	},
};

const dataSource = [
	{
		key: "COMBOH1",
		name: "COMBOH1",
		title: "Combo Hot 1",
		price: "8,450,000",
		discount: "20%",
		totalPrice: "6,760,000",
		amount: "1 tin/2 tuần + 100 CV/4 tuần",
	},
	{
		key: "COMBOH2",
		name: "COMBOH2",
		title: "Combo Hot 2",
		price: "10,163,750",
		discount: "20%",
		totalPrice: "8,131,000",
		amount: "1 tin/2 tuần + 200 CV/8 tuần",
	},
	{
		key: "COMBOH3",
		name: "COMBOH3",
		title: "Combo Hot 3",
		price: "10,776,250",
		discount: "20%",
		totalPrice: "8,621,000",
		amount: "1 tin/2 tuần + 300 CV/20 tuần",
	},
	{
		key: "COMBOH4",
		name: "COMBOH4",
		title: "Combo Hot 4",
		price: "12,348,750",
		discount: "20%",
		totalPrice: "9,879,000",
		amount: "1 tin/4 tuần + 100 CV/4 tuần",
	},
	{
		key: "COMBOH5",
		name: "COMBOH5",
		title: "Combo Hot 5",
		price: "14,125,000",
		discount: "20%",
		totalPrice: "11,300,000",
		amount: "1 tin/4 tuần + 200 CV/8 tuần",
	},
	{
		key: "COMBOH6",
		name: "COMBOH6",
		title: "Combo Hot 6",
		price: "15,610,000",
		discount: "20%",
		totalPrice: "12,488,000",
		amount: "1 tin/4 tuần + 300 CV/20 tuần",
	},
];

const HotCombo = ({ setCart }) => {
	return (
		<PackageDetail
			groupData={hotInfo}
			tableData={dataSource}
			setCart={setCart}
		/>
	);
};

export default HotCombo;
