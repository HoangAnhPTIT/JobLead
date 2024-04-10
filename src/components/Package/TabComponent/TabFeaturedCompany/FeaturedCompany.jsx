import classNames from "classnames";
import React, { useState } from "react";
import { responsiveContent } from "src/constants/css";
import Discount from "../../Common/Discount";
import InfoText from "../../Common/InfoText";
import { Select, Row, Col } from "antd";
import PriceAndAction from "../../Common/PriceAndAction";

const values = {
	logo: "1 logo",
	week: "4 tuần",
	price: {
		original: 3650000,
		discounted: 2920000,
	},
	intro:
		"Logo Công ty/Doanh nghiệp được hiển thị nổi bật tại Trung Tâm Trang Chủ",
};

const FeaturedCompany = ({ setCart }) => {
	const onAdd = () => {
		setCart((prev) => ({
			...prev,
			logo: {
				title: `LOGO HIỂN THỊ NỔI BẬT TẠI TRUNG TÂM TRANG CHỦ - 4 tuần - 1 tin `,
				type: "logo",
				price: values.price,
			},
		}));
	};

	return (
		<div className={classNames(responsiveContent, "border p-5")}>
			<div className="border p-5">
				<h1 className="text-[15px] font-semibold">
					GÓI LỌC HỒ SƠ <Discount amount="20%" />
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
					<div className="pr-5 mt-2">
						<InfoText text={values.intro} />
					</div>
					<Row gutter={16}>
						<Col span={8}>
							<Select defaultValue={values.logo} className="w-full">
								<Select.Option value={values.logo}>{values.logo}</Select.Option>
							</Select>
						</Col>
						<Col span={8}>
							<Select defaultValue={values.week} className="w-full">
								<Select.Option value={values.week}>{values.week}</Select.Option>
							</Select>
						</Col>
						<Col span={8}>
							<PriceAndAction
								originalPrice={values.price.original}
								discountedPrice={values.price.discounted}
								onAdd={onAdd}
							/>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
};

export default FeaturedCompany;
