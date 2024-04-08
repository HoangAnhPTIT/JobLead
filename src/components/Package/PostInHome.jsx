import { ArrowForwardIos, CheckOutlined } from "@mui/icons-material";
import {
	Button,
	Col,
	Collapse,
	Popover,
	Row,
	Select,
	Table,
	Divider,
} from "antd";
import { formatNumber } from "src/helper/format.js";
import { DownOutlined } from "@ant-design/icons";
import {
	discountInfo,
	effectInfo,
	getDiscountPercent,
	packageInfo,
	packagePrice,
	posts,
	textEffect,
	weeks,
} from "./packageInfo.js";
import { useEffect, useState } from "react";
import classNames from "classnames";

const text = "heelo";

const DiscountInfo = () => {
	const columns = [
		{ key: "amount", dataIndex: "amount", title: "Số lượng" },
		{
			key: "percent",
			dataIndex: "percent",
			title: "Chiết khấu",
			render: (value) => `${value}%`,
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={discountInfo}
			pagination={false}
			size="small"
			bordered
		/>
	);
};

const Info = ({ text }) => {
	return (
		<div className="flex text-[15px]">
			<CheckOutlined className="text-yellow3 mr-2" />
			<div>{text}</div>
		</div>
	);
};

const CategoryPost = ({ info, title, type, setCart }) => {
	const [post, setPost] = useState(1);
	const [week, setWeek] = useState(2);
	const [price, setPrice] = useState({ original: 0, discounted: 0 });

	const onAdd = () => {
		setCart((prev) => ({
			...prev,
			[type]: {
				post,
				week,
				title: `${title} - ${week} tuần - ${post} tin`,
				type,
				price,
			},
		}));
	};

	useEffect(() => {
		const newPrice = {
			original: post * week * packagePrice,
			discounted: Math.round(
				post * week * packagePrice * getDiscountPercent(post)
			),
		};
		setPrice(newPrice);
	}, [post, week]);

	return (
		<Row gutter={[32, 32]}>
			<Col span={24} md={12}>
				{info?.intro?.map((item, i) => (
					<Info text={item} key={i} />
				))}
				<p className="font-semibold text-[15px] my-2">ĐẶC BIỆT</p>
				{info?.special?.map((item, i) => (
					<Info text={item} key={i} />
				))}
			</Col>
			<Col span={24} md={12}>
				<div className="flex gap-4 border-b pb-5 flex-col md:flex-row">
					<div className="flex gap-4 flex-1">
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
					</div>
					<div className="text-right min-w-[80px] md:min-w-[100px] lg:min-w-[120px]">
						<div className="text-[#e50303] font-bold">
							{formatNumber(price.discounted)} đ
						</div>
						<div className="line-through text-99 text-xs">
							{formatNumber(price.original)} đ
						</div>
						<Button type="primary" className="mt-2" onClick={onAdd}>
							Thêm
						</Button>
					</div>
				</div>
				<Popover placement="bottom" content={<DiscountInfo />} trigger="click">
					<p className="underline underline-offset-4 hover:cursor-pointer text-base hover:text-99 w-fit mt-3 md:mt-5">
						Chương trình chiết khấu
					</p>
				</Popover>
			</Col>
		</Row>
	);
};

const EffectPackage = ({ info }) => {
	const { title, detail } = info;
	const [post, setPost] = useState(1);
	const [week, setWeek] = useState(1);
	const [effectPrice, setEffectPrice] = useState(0);
	const [price, setPrice] = useState(0);

	useEffect(() => {
		const newPrice = effectPrice ? post * week * effectPrice : 0;
		setPrice(newPrice);
	}, [post, effectPrice, week]);

	return (
		<div className="flex flex-col lg:flex-row justify-between">
			<div className="text-33 text-[15px]">
				<h1 className="font-semibold">{title}</h1>
				<h3 className="my-2">{detail}</h3>
			</div>
			<div className="flex gap-5 items-center flex-col md:flex-row md:justify-between">
				<div className="flex gap-5 w-full">
					<Select
						onChange={setEffectPrice}
						className="w-[180px]"
						allowClear
						placeholder="Chọn hiệu ứng"
					>
						{textEffect.map((item, i) => (
							<Select.Option key={i} value={item.price}>
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
					<Button type="primary" className="w-[70px]" disabled={!(price > 0)}>
						Thêm
					</Button>
				</div>
			</div>
		</div>
	);
};

const Promotion = () => (
	<span className="bg-yellow4 border-yellow4 rounded-full ml-2 text-white px-2 py-[3px] text-xs">
		Khuyễn mãi 50%
	</span>
);

const PostInHome = ({ setCart }) => {
	const homeItems = [
		{
			key: "1",
			label: (
				<p className="font-semibold text-primary">
					VIỆC LÀM HOT
					<Promotion />
				</p>
			),
			children: (
				<CategoryPost
					info={packageInfo?.home?.home}
					type="home"
					title="Gói đăng tin box VIỆC LÀM HOT"
					setCart={setCart}
				/>
			),
		},
		{
			key: "2",
			label: (
				<span className="font-semibold text-primary">
					VIỆC LÀM HẤP DẪN
					<Promotion />
				</span>
			),
			children: (
				<CategoryPost
					info={packageInfo?.home?.hot}
					type="hot"
					title="Gói đăng tin box VIỆC LÀM HẤP DẪN"
					setCart={setCart}
				/>
			),
		},
		{
			key: "3",
			label: (
				<span className="font-semibold text-primary">
					VIỆC LÀM LƯƠNG CAO
					<Promotion />
				</span>
			),
			children: (
				<CategoryPost
					info={packageInfo?.home?.highSalary}
					type="highSalary"
					title="Gói đăng tin box VIỆC LÀM LƯƠNG CAO"
					setCart={setCart}
				/>
			),
		},
		{
			key: "4",
			label: (
				<span className="font-semibold text-primary">
					VIỆC LÀM TIÊU ĐIỂM
					<Promotion />
				</span>
			),
			children: (
				<CategoryPost
					info={packageInfo?.home?.trending}
					type="trending"
					title="Gói đăng tin box VIỆC LÀM TIÊU ĐIỂM"
					setCart={setCart}
				/>
			),
		},
	];

	const items = [
		{
			key: "1",
			label: (
				<span className="font-semibold text-primary">ĐĂNG TIN TRANG CHỦ</span>
			),
			children: (
				<Collapse
					defaultActiveKey="1"
					expandIconPosition="end"
					items={homeItems}
					expandIcon={({ isActive }) => (
						<ArrowForwardIos
							className={classNames(
								"!text-primary !text-lg",
								!isActive ? "rotate-90" : "-rotate-90"
							)}
						/>
					)}
				/>
			),
		},
		{
			key: "2",
			label: (
				<span className="font-semibold text-primary">
					ĐĂNG TIN TRANG NGÀNH
					<Promotion />
				</span>
			),
			children: (
				<CategoryPost
					info={packageInfo?.home?.category}
					type="category"
					title="Gói ưu tiên trang ngành"
					setCart={setCart}
				/>
			),
		},
		{
			key: "3",
			label: (
				<span className="font-semibold text-primary">HIỆU ỨNG NỔI BẬT TIN</span>
			),
			children: (
				<div>
					<EffectPackage info={effectInfo.hot} />
					<Divider className="!my-4" />
					<EffectPackage info={effectInfo.urgent} />
					<Divider className="!my-4" />
					<EffectPackage info={effectInfo.red} />
					<Divider className="!my-4" />
					<EffectPackage info={effectInfo.background} />
				</div>
			),
		},
	];

	return (
		<div className="border p-5">
			<Collapse
				defaultActiveKey={["1"]}
				expandIconPosition="end"
				items={items}
				expandIcon={({ isActive }) => (
					<ArrowForwardIos
						className={classNames(
							"!text-primary !text-lg",
							!isActive ? "rotate-90" : "-rotate-90"
						)}
					/>
				)}
			/>
		</div>
	);
};

export default PostInHome;
