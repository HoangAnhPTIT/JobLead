import { Button, Select } from "antd";
import { formatNumber } from "src/helper/format.js";
import { posts, textEffect, weeks } from "./packageInfo.js";
import { useEffect, useState } from "react";

export const EffectPackage = ({ info }) => {
	const { title, detail } = info;
	const [post, setPost] = useState(1);
	const [week, setWeek] = useState(2);
	const [effectPrice, setEffectPrice] = useState(0);
	const [price, setPrice] = useState(0);

	useEffect(() => {
		const newPrice = post * week * effectPrice;
		setPrice(newPrice);
	}, [post, effectPrice, week]);

	return (
		<div className="flex flex-col md:flex-row justify-between">
			<div className="text-33 text-[15px]">
				<h1>{title}</h1>
				<h3>{detail}</h3>
			</div>
			<div className="flex gap-5">
				<Select onChange={setEffectPrice}>
					{textEffect.map((item, i) => (
						<Select.Option key={i} value={item.price}>
							{item.label}
						</Select.Option>
					))}
				</Select>
				<Select className="flex-1" value={post} onChange={setPost}>
					{posts.map((item, i) => (
						<Select.Option key={i} value={item}>
							<span>{item} tin</span>
						</Select.Option>
					))}
				</Select>
				<Select
					className="flex-1"
					defaultValue={2}
					value={week}
					onChange={setWeek}
				>
					{weeks.map((item, i) => (
						<Select.Option key={i} value={item}>
							<span>{item} tuần</span>
						</Select.Option>
					))}
				</Select>
				<div className="text-secondary font-bold">{formatNumber(price)} đ</div>
				<div>
					<Button type="primary">Thêm</Button>
				</div>
			</div>
		</div>
	);
};
