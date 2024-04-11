import React from "react";
import PackageDetail from "./PackageDetail";

const comboInfo = {
	COMBOHD1: {
		title: "COMBO ĐĂNG TIN HẤP DẪN & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 1,784,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hấp Dẫn tại trung tâm trang chủ, tiếp cận với 85% Ứng viên	",
			"Khách hàng được xem 100 hồ sơ ứng viên bất kỳ trong thời gian 1 tháng",
			"Đăng tin cơ bản không giới hạn",
		],
		special: [
			"Tin sẽ được bảo lưu khi đã tuyển đủ ứng viên mà chưa hết thời hạn đăng",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	COMBOHD2: {
		title: "COMBO ĐĂNG TIN HẤP DẪN & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 2,714,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hấp Dẫn tại trung tâm trang chủ, tiếp cận với 85% Ứng viên	",
			"Khách hàng được xem 200 hồ sơ ứng viên bất kỳ trong thời gian 2 tháng",
			"Đăng tin cơ bản không giới hạn",
		],
		special: [
			"Tặng ngay dịch vụ Đăng tin trên Trang Ngành 1 tuần trị giá 877.500đ",
			"Tin sẽ được bảo lưu khi đã tuyển đủ ứng viên mà chưa hết thời hạn đăng",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	COMBOHD3: {
		title: "COMBO ĐĂNG TIN HẤP DẪN & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 2,912,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hấp Dẫn tại trung tâm trang chủ, tiếp cận với 85% Ứng viên	",
			"Khách hàng được xem 300 hồ sơ ứng viên bất kỳ trong thời gian 2 tháng",
			"Đăng tin cơ bản không giới hạn",
		],
		special: [
			"Tin sẽ được bảo lưu khi đã tuyển đủ ứng viên mà chưa hết thời hạn đăng",
			"Tặng ngay dịch vụ Đăng tin trên Trang Ngành 2 tuần trị giá 1.755.000đ",
			"Chiết khấu thêm 10% và tặng 150 điểm lọc hồ sơ cho lần tái ký tiếp theo",
		],
	},
	COMBOHD4: {
		title: "COMBO ĐĂNG TIN HẤP DẪN & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 2,966,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hấp Dẫn tại trung tâm trang chủ, tiếp cận với 85% Ứng viên	",
			"Khách hàng được xem 100 hồ sơ ứng viên bất kỳ trong thời gian 2 tháng",
			"Đăng tin cơ bản không giới hạn",
		],
		special: [
			"Tặng hiệu ứng nổi bật tùy chọn trị giá 440.000đ",
			"Tin sẽ được bảo lưu khi đã tuyển đủ ứng viên mà chưa hết thời hạn đăng",
			"Chiết khấu thêm 10% và tặng 150 điểm lọc hồ sơ cho lần tái ký tiếp theo",
		],
	},
	COMBOHD5: {
		title: "COMBO ĐĂNG TIN HẤP DẪN & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 4,409,000 đ",
		description: [
			"Tặng hiệu ứng nổi bật tùy chọn trị giá 440.000đ",
			"Tin tuyển dụng nằm ở mục Việc Làm Hấp Dẫn tại trung tâm trang chủ, tiếp cận với 85% Ứng viên	",
			"Khách hàng được xem 200 hồ sơ ứng viên bất kỳ trong thời gian 2 tháng",
			"Đăng tin cơ bản không giới hạn",
		],
		special: [
			"Tặng hiệu ứng nổi bật tùy chọn trị giá 440.000đ",
			"Tặng ngay dịch vụ Đăng tin trên Trang Ngành 1 tuần trị giá 877.500đ",
			"Tin sẽ được bảo lưu khi đã tuyển đủ ứng viên mà chưa hết thời hạn đăng",
			"Chiết khấu thêm 10% và tặng 150 điểm lọc hồ sơ cho lần tái ký tiếp theo",
		],
	},
	COMBOHD6: {
		title: "COMBO ĐĂNG TIN HẤP DẪN & LỌC HỒ SƠ",
		discount: "20%",
		discounted: "* Tiết kiệm 3,645,000 đ",
		description: [
			"Tin tuyển dụng nằm ở mục Việc Làm Hấp Dẫn tại trung tâm trang chủ, tiếp cận với 85% Ứng viên	",
			"Khách hàng được xem 300 hồ sơ ứng viên bất kỳ trong thời gian 5 tháng",
			"Đăng tin cơ bản không giới hạn",
		],
		special: [
			" Tặng hiệu ứng nổi bật tùy chọn trị giá 440.000đ",
			"Tặng ngay dịch vụ Đăng tin trên Trang Ngành 2 tuần trị giá 1.755.000đ",
			"Tặng 1 tuần trải nghiệm gắn Banner tuyển dụng tại đầu trang chủ 1 tuần trị giá 2.480.000đ",
			"Tin sẽ được bảo lưu khi đã tuyển đủ ứng viên mà chưa hết thời hạn đăng",
			"Chiết khấu thêm 10% và tặng 150 điểm lọc hồ sơ cho lần tái ký tiếp theo",
		],
	},
};

const dataSource = [
	{
		key: "COMBOHD1",
		name: "COMBOHD1",
		price: "7,076,250",
		discount: "20%",
		totalPrice: "5,661,000",
		amount: "1 tin/2 tuần + 100 CV/4 tuần",
	},
	{
		key: "COMBOHD2",
		name: "COMBOHD2",
		price: "9,115,000",
		discount: "20%",
		totalPrice: "7,292,000",
		amount: "1 tin/2 tuần + 200 CV/8 tuần",
	},
	{
		key: "COMBOHD3",
		name: "COMBOHD3",
		price: "9,581,250",
		discount: "20%",
		totalPrice: "7,665,000",
		amount: "1 tin/2 tuần + 300 CV/20 tuần",
	},
	{
		key: "COMBOHD4",
		name: "COMBOHD4",
		price: "10,513,750",
		discount: "20%",
		totalPrice: "8,411,000",
		amount: "1 tin/4 tuần + 100 CV/4 tuần",
	},
	{
		key: "COMBOHD5",
		name: "COMBOHD5",
		price: "11,795,000",
		discount: "20%",
		totalPrice: "9,436,000",
		amount: "1 tin/4 tuần + 200 CV/8 tuần",
	},
	{
		key: "COMBOHD6",
		name: "COMBOHD6",
		price: "13,688,750",
		discount: "20%",
		totalPrice: "10,951,000",
		amount: "1 tin/4 tuần + 300 CV/20 tuần",
	},
];

const GoodCombo = ({ setCart }) => {
	return (
		<PackageDetail
			groupData={comboInfo}
			tableData={dataSource}
			setCart={setCart}
		/>
	);
};

export default GoodCombo;
