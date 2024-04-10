import React from "react";
import { formatNumber } from "src/helper/format";
import { Button } from "antd";

const PriceAndAction = ({ originalPrice, discountedPrice, onAdd }) => {
	return (
		<div className="text-right min-w-[80px] md:min-w-[100px] lg:min-w-[120px]">
			<p className="text-[#e50303] font-bold">
				{formatNumber(discountedPrice)} đ
			</p>
			<p className="line-through text-99 text-xs">
				{formatNumber(originalPrice)} đ
			</p>
			<Button type="primary" className="mt-2" onClick={onAdd}>
				Thêm
			</Button>
		</div>
	);
};

export default PriceAndAction;
