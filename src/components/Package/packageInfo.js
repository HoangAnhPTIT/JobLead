export const posts = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
export const weeks = [2, 3, 4, 8];
export const packagePrice = 4_600_000;

export const discountInfo = [
	{
		amount: 1,
		percent: 50,
	},
	{
		amount: 2,
		percent: 55,
	},
	{
		amount: "3-5",
		percent: 60,
	},
	{
		amount: "6-10",
		percent: 65,
	},
	{
		amount: "Trên 10",
		percent: 70,
	},
];

export const getDiscountPercent = (amount) => {
	const discount = discountInfo.find((info) => {
		if (typeof info.amount === "number") {
			return amount === info.amount;
		} else if (typeof info.amount === "string") {
			const range = info.amount.split("-");
			const lowerBound = parseInt(range[0]);
			const upperBound = parseInt(range[1]);
			if (range.length === 1) {
				return amount >= lowerBound;
			} else {
				return amount >= lowerBound && amount <= upperBound;
			}
		}
	});

	return discount ? 1 - discount.percent / 100 : 0;
};
export const packageInfo = {
	home: {
		home: {
			intro: [
				"Tin tuyển dụng hiển thị ở đầu trang chủ, tiếp cận với 100% Ứng viên",
				"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
				"AI ưu tiên gợi ý việc làm hiển thị cho ứng viên",
				"Hiển thị trong Top đề xuất việc làm liên quan",
				"Ưu tiên hiển thị Top đầu Trang ngành",
				"Ưu tiên gửi Tin tuyển dụng qua Email Marketing đến Ứng viên phù hợp",
			],
			special: [
				"Tặng hiệu ứng nổi bật tùy chọn trị giá 440.000đ",
				"Tin sẽ được bảo lưu 6 tháng",
				"Chiết khấu thêm 10% cho lần tái ký",
			],
		},
		hot: {
			intro: [
				"Tin tuyển dụng hiển thị ở Top đầu trang chủ, tiếp cận với 85% Ứng viên",
				"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
				"Hiển thị trong Top đề xuất việc làm liên quan",
				"Ưu tiên hiển thị Top đầu Trang ngành",
				"Ưu tiên gửi Tin tuyển dụng qua Email Marketing đến Ứng viên phù hợp",
			],
			special: [
				"Tin sẽ được bảo lưu 6 tháng",
				"Chiết khấu thêm 10% cho lần tái ký",
			],
		},
		highSalary: {
			intro: [
				"Tin tuyển dụng hiển thị ở trung tâm trang chủ, tiếp cận với 70% Ứng viên",
				"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
				"Ưu tiên hiển thị Top đầu Trang ngành",
			],
			special: [
				"Tin sẽ được bảo lưu 6 tháng",
				"Chiết khấu thêm 10% cho lần tái ký",
			],
		},
		trending: {
			intro: [
				"Tin tuyển dụng hiển thị ở trung tâm trang chủ, tiếp cận với 65% Ứng viên",
				"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
				"Hiển thị trong TOP đề xuất việc làm liên quan",
			],
			special: [
				"Tin sẽ được bảo lưu 6 tháng",
				"Chiết khấu thêm 10% cho lần tái ký",
			],
		},
		category: {
			intro: [
				"Tin tuyển dụng nằm ở Top đầu tại “Trang Ngành”, tiếp cận với 100% Ứng viên tìm kiếm công việc theo ngành nghề",
				"Hiển thị trong TOP đề xuất việc làm liên quan",
				"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
			],
			special: [
				"Tin sẽ được bảo lưu 6 tháng",
				"Chiết khấu thêm 10% cho lần tái ký",
			],
		},
	},
};
