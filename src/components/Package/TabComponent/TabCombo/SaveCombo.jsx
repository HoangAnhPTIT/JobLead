import React from "react";
import PackageDetail from "./PackageDetail";

const comboInfo = {
	COMBOTK1: {
		title: "COMBO ĐĂNG TIN TIÊU ĐIỂM & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 976,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Tiêu Điểm",
			"Khách hàng được xem 100 hồ sơ ứng viên bất kỳ trong thời gian 1 tháng",
		],
		special: [
			"Tin sẽ được bảo lưu 6 tháng",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	COMBOTK2: {
		title: "COMBO ĐĂNG TIN TIÊU ĐIỂM & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 2,015,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hot tại đầu trang chủ, tiếp cận với 100% Ứng viên",
			"Khách hàng được xem 200 hồ sơ ứng viên bất kỳ trong thời gian 2 tháng",
		],
		special: [
			"Tặng ngay dịch vụ Đăng tin trên Trang Ngành 1 tuần trị giá 877.500đ",
			"Tin sẽ được bảo lưu 6 tháng",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	COMBOTK3: {
		title: "COMBO ĐĂNG TIN TIÊU ĐIỂM & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 2,353,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hot tại đầu trang chủ, tiếp cận với 100% Ứng viên",
			"Khách hàng được xem 300 hồ sơ ứng viên bất kỳ trong thời gian 5 tháng",
		],
		special: [
			"Tặng hiệu ứng nổi bật tùy chọn trị giá 440.000đ",
			"Tin sẽ được bảo lưu 6 tháng",
			"Tặng ngay dịch vụ Đăng tin trên Trang Ngành 2 tuần trị giá 1.755.000đ",
			"Chiết khấu thêm 10% và tặng 400 điểm lọc hồ sơ cho lần tái ký tiếp theo",
		],
	},
	COMBOTK4: {
		title: "COMBO ĐĂNG TIN TIÊU ĐIỂM & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 427,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hot tại đầu trang chủ, tiếp cận với 100% Ứng viên",
			"Khách hàng được xem 100 hồ sơ ứng viên bất kỳ trong thời gian 2 tháng",
		],
		special: [
			"Tặng hiệu ứng nổi bật tùy chọn trị giá 440.000đ",
			"Tin sẽ được bảo lưu 6 tháng",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	COMBOTK5: {
		title: "COMBO ĐĂNG TIN TIÊU ĐIỂM & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 2,305,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hot tại đầu trang chủ, tiếp cận với 100% Ứng viên",
			"Khách hàng được xem 200 hồ sơ ứng viên bất kỳ trong thời gian 2 tháng",
		],
		special: [
			"Tặng hiệu ứng nổi bật tùy chọn trị giá 440.000đ",
			"Tặng ngay dịch vụ Đăng tin trên Trang Ngành 1 tuần trị giá 877.500đ",
			"Tin sẽ được bảo lưu 6 tháng",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	COMBOTK6: {
		title: "COMBO ĐĂNG TIN TIÊU ĐIỂM & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 1,268,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hot tại đầu trang chủ, tiếp cận với 100% Ứng viên",
			"Khách hàng được xem 300 hồ sơ ứng viên bất kỳ trong thời gian 5 tháng",
		],
		special: [
			"Tặng hiệu ứng nổi bật tùy chọn trị giá 440.000đ",
			"Tặng ngay dịch vụ Đăng tin trên Trang Ngành 2 tuần trị giá 1.755.000đ",
			"Tin sẽ được bảo lưu 6 tháng",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
};

const dataSource = [
	{
		key: "COMBOTK1",
		name: "COMBOTK1",
		price: "5,766,250",
		discount: "20%",
		totalPrice: "4,613,000",
		amount: "1 tin/2 tuần + 100 CV/4 tuần",
	},
	{
		key: "COMBOTK2",
		name: "COMBOTK2",
		price: "7,717,500",
		discount: "20%",
		totalPrice: "6,174,000",
		amount: "1 tin/2 tuần + 200 CV/8 tuần",
	},
	{
		key: "COMBOTK3",
		name: "COMBOTK3",
		price: "8,155,000",
		discount: "20%",
		totalPrice: "6,524,000",
		amount: "1 tin/2 tuần + 300 CV/20 tuần",
	},
	{
		key: "COMBOTK4",
		name: "COMBOTK4",
		price: "8,882,500",
		discount: "20%",
		totalPrice: "7,106,000",
		amount: "1 tin/4 tuần + 100 CV/4 tuần",
	},
	{
		key: "COMBOTK5",
		name: "COMBOTK5",
		price: "9,785,000",
		discount: "20%",
		totalPrice: "7,828,000",
		amount: "1 tin/4 tuần + 200 CV/8 tuần",
	},
	{
		key: "COMBOTK6",
		name: "COMBOTK6",
		price: "11,941,250",
		discount: "20%",
		totalPrice: "9,553,000",
		amount: "1 tin/4 tuần + 300 CV/20 tuần",
	},
];

const SaveCombo = ({ setCart }) => {
	return (
		<PackageDetail
			groupData={comboInfo}
			tableData={dataSource}
			setCart={setCart}
		/>
	);
};

export default SaveCombo;
