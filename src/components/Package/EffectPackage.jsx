import { Button, Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { posts, textEffect, weeks } from "./packageInfo";
import { formatNumber } from "src/helper/format";

const EffectPackage = ({ info, setCart, type }) => {
	const { title, detail, content } = info;
	const [post, setPost] = useState(1);
	const [week, setWeek] = useState(1);
	const [price, setPrice] = useState(0);
	const [effectIdSelected, setEffectIdSelected] = useState(null);
	console.log("effectIdSelected", effectIdSelected);

	const effectSelected = useMemo(
		() => textEffect.find((item) => item.id === effectIdSelected),
		[effectIdSelected]
	);

	const onAddEffect = () => {
		setCart((prev) => ({
			...prev,
			[`${type}${effectIdSelected}`]: {
				post,
				week,
				title: `${content} ${effectSelected.value} - ${week} tuần - ${post} tin`,
				type: `${type}${effectIdSelected}`,
				price: {
					discounted: price,
				},
			},
		}));
	};

	useEffect(() => {
		const newPrice = effectSelected ? post * week * effectSelected.price : 0;
		setPrice(newPrice);
	}, [post, effectSelected, week]);

	return (
		<div className="flex flex-col lg:flex-row justify-between">
			<div className="text-33 text-[15px]">
				<h1 className="font-semibold">{title}</h1>
				<h3 className="my-2">{detail}</h3>
			</div>
			<div className="flex gap-5 items-center flex-col md:flex-row md:justify-between">
				<div className="flex gap-5 w-full">
					<Select
						onChange={setEffectIdSelected}
						className="w-[180px]"
						allowClear
						placeholder="Chọn hiệu ứng"
					>
						{textEffect.map((item, i) => (
							<Select.Option key={i} value={item.id}>
								{item.label}
							</Select.Option>
						))}
					</Select>
					<Select
						className="flex-1 min-w-[80px]"
						value={post}
						onChange={setPost}
					>
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
				</div>
				<div className="flex gap-5 w-full justify-end">
					<div className="text-secondary font-bold min-w-[90px] text-right">
						{formatNumber(price)} đ
					</div>
					<Button
						type="primary"
						className="w-[70px]"
						disabled={!(price > 0)}
						onClick={onAddEffect}
					>
						Thêm
					</Button>
				</div>
			</div>
		</div>
	);
};

export default EffectPackage;
