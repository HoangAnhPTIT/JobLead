import classNames from "classnames";
import React, { useState } from "react";
import { responsiveContent } from "src/constants/css";
import Discount from "../../Common/Discount";
import InfoText from "../../Common/InfoText";
import { Select, Input } from "antd";
import PriceAndAction from "../../Common/PriceAndAction";

const packageInfo = {
	tvcv1: {
		point: 1000,
		week: 4,
		discount: "20%",
		price: {
			original: 3645000,
			discounted: 2916000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	tvcv2: {
		point: 2000,
		week: 8,
		discount: "20%",
		price: {
			original: 6245000,
			discounted: 4996000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Tặng ngay dịch vụ Đăng tin trên Trang Ngành 1 tuần trị giá 877.500đ",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	tvcv3: {
		point: 3000,
		week: 20,
		discount: "20%",
		price: {
			original: 6932500,
			discounted: 5546000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Tặng ngay dịch vụ Đăng tin trang chủ trong box Việc làm Hấp Dẫn trong 1 tuần trị giá 3.800.000đ",
			"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
			"Ưu tiên hiển thị trong nhóm đầu mục Việc làm phù hợp",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	tvcv4: {
		point: 4000,
		week: 24,
		discount: "20%",
		price: {
			original: 10250000,
			discounted: 8200000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Tặng ngay dịch vụ Đăng tin trang chủ trong box Việc làm Hấp Dẫn trong 1 tuần trị giá 3.800.000đ",
			"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
			"Ưu tiên hiển thị trong nhóm đầu mục Việc làm phù hợp",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	tvcv5: {
		point: 5000,
		week: 28,
		discount: "20%",
		price: {
			original: 11531250,
			discounted: 9225000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Tặng ngay dịch vụ Đăng tin trang chủ trong box Việc làm Hấp Dẫn trong 1 tuần trị giá 3.800.000đ",
			"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
			"Ưu tiên hiển thị trong nhóm đầu mục Việc làm phù hợp",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	tvcv6: {
		point: 6000,
		week: 40,
		discount: "30%",
		price: {
			original: 13860000,
			discounted: 9702000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Tặng ngay dịch vụ Đăng tin trang chủ trong box Việc làm Hấp Dẫn trong 1 tuần trị giá 4.600.000đ",
			"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
			"Ưu tiên hiển thị trong nhóm đầu mục Việc làm phù hợp",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	tvcv7: {
		point: 7000,
		week: 44,
		discount: "30%",
		price: {
			original: 17285714,
			discounted: 12100000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Tặng ngay dịch vụ Đăng tin trang chủ trong box Việc làm Hấp Dẫn trong 1 tuần trị giá 4.600.000đ",
			"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
			"Ưu tiên hiển thị trong nhóm đầu mục Việc làm phù hợp",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	tvcv8: {
		point: 8000,
		week: 48,
		discount: "30%",
		price: {
			original: 19714286,
			discounted: 13800000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Tặng ngay dịch vụ Đăng tin trang chủ trong box Việc làm Hấp Dẫn trong 1 tuần trị giá 4.600.000đ",
			"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
			"Ưu tiên hiển thị trong nhóm đầu mục Việc làm phù hợp",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	tvcv9: {
		point: 9000,
		week: 60,
		discount: "30%",
		price: {
			original: 20797143,
			discounted: 14558000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Tặng ngay dịch vụ Đăng tin trang chủ trong box Việc làm Hấp Dẫn trong 1 tuần trị giá 4.600.000đ",
			"Tặng dịch vụ hiển thị Từ khóa độc quyền tại trang chủ trong 2 tuần trị giá 3.780.000đ",
			"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
			"Ưu tiên hiển thị trong nhóm đầu mục Việc làm phù hợp",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	tvcv10: {
		point: 10000,
		week: 64,
		discount: "30%",
		price: {
			original: 24142857,
			discounted: 16900000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Tặng ngay dịch vụ Đăng tin trang chủ trong box Việc làm Hấp Dẫn trong 1 tuần trị giá 4.600.000đ",
			"Tặng dịch vụ hiển thị Từ khóa độc quyền tại trang chủ trong 2 tuần trị giá 3.780.000đ",
			"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
			"Ưu tiên hiển thị trong nhóm đầu mục Việc làm phù hợp",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	tvcv11: {
		point: 11000,
		week: 68,
		discount: "35%",
		price: {
			original: 26357143,
			discounted: 18450000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Tặng ngay dịch vụ Đăng tin trang chủ trong box Việc làm Hấp Dẫn trong 1 tuần trị giá 4.600.000đ",
			"Tặng dịch vụ hiển thị Từ khóa độc quyền tại trang chủ trong 2 tuần trị giá 3.780.000đ",
			"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
			"Ưu tiên hiển thị trong nhóm đầu mục Việc làm phù hợp",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	tvcv12: {
		point: 12000,
		week: 80,
		discount: "35%",
		price: {
			original: 27714286,
			discounted: 19400000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Tặng ngay dịch vụ Đăng tin trang chủ trong box Việc làm HOT trong 4 tuần trị giá 9.200.000đ",
			"Tặng dịch vụ hiển thị Từ khóa độc quyền tại trang chủ trong 4 tuần trị giá 7.560.000đ",
			"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
			"Ưu tiên hiển thị trong nhóm đầu mục Việc làm phù hợp",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	tvcv13: {
		point: 13000,
		week: 84,
		discount: "35%",
		price: {
			original: 30923077,
			discounted: 20100000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Tặng ngay dịch vụ Đăng tin trang chủ trong box Việc làm HOT trong 4 tuần trị giá 9.200.000đ",
			"Tặng dịch vụ hiển thị Từ khóa độc quyền tại trang chủ trong 4 tuần trị giá 7.560.000đ",
			"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
			"Ưu tiên hiển thị trong nhóm đầu mục Việc làm phù hợp",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	tvcv14: {
		point: 14000,
		week: 88,
		discount: "35%",
		price: {
			original: 33607692,
			discounted: 21845000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Tặng ngay dịch vụ Đăng tin trang chủ trong box Việc làm HOT trong 4 tuần trị giá 9.200.000đ",
			"Tặng dịch vụ hiển thị Từ khóa độc quyền tại trang chủ trong 4 tuần trị giá 7.560.000đ",
			"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
			"Ưu tiên hiển thị trong nhóm đầu mục Việc làm phù hợp",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
	tvcv15: {
		point: 15000,
		week: 100,
		discount: "35%",
		price: {
			original: 34661538,
			discounted: 22530000,
		},
		intro: [
			"Hoàn 100% điểm đã dùng với hồ sơ bị sai thông tin liên hệ",
			"Tặng ngay dịch vụ Đăng tin trang chủ trong box Việc làm HOT trong 4 tuần trị giá 9.200.000đ",
			"Tặng dịch vụ hiển thị Banner độc quyền tại trang chủ trong 3 tuần trị giá 10.320.000đ",
			"Tin được tự động đẩy lên đầu trang 1 lần/ngày",
			"Ưu tiên hiển thị trong nhóm đầu mục Việc làm phù hợp",
			"Chiết khấu thêm 10% cho lần tái ký tiếp theo",
		],
	},
};

const packages = [
	"tvcv1",
	"tvcv2",
	"tvcv3",
	"tvcv4",
	"tvcv5",
	"tvcv6",
	"tvcv7",
	"tvcv8",
	"tvcv9",
	"tvcv10",
	"tvcv11",
	"tvcv12",
	"tvcv13",
	"tvcv14",
	"tvcv15",
];

const defaultValue = "tvcv1";

const CandidatePackage = ({ setCart }) => {
	const [packageIdSelected, setPackageIdSelected] = useState(defaultValue);
	const packageSelected = packageInfo[packageIdSelected];

	const onAdd = () => {
		setCart((prev) => ({
			...prev,
			[packageIdSelected]: {
				title: `Dịch vụ xem hồ sơ - ${packageSelected.point} điểm - ${packageSelected.week} tuần`,
				type: packageIdSelected,
				price: packageSelected.price,
			},
		}));
	};

	return (
		<div className={classNames(responsiveContent, "border p-5")}>
			<div className="border p-5">
				<h1 className="text-[15px] font-semibold">
					GÓI LỌC HỒ SƠ <Discount amount={packageSelected.discount} />
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
					<div className="pr-5 mt-2">
						{packageSelected?.intro?.map((item, i) => (
							<InfoText key={i} text={item} />
						))}
					</div>
					<div className="flex gap-5 pl-5">
						<Select defaultValue={defaultValue} onChange={setPackageIdSelected}>
							{packages.map((item, i) => (
								<Select.Option key={i} value={item}>
									Gói <span className="uppercase">{item}</span>
								</Select.Option>
							))}
						</Select>
						<div>
							<Input value={`${packageSelected.point} điểm`} disabled />
						</div>
						<div>
							<Input value={`${packageSelected.week} tuần`} disabled />
						</div>
						<PriceAndAction
							originalPrice={packageSelected.price.original}
							discountedPrice={packageSelected.price.discounted}
							onAdd={onAdd}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CandidatePackage;
