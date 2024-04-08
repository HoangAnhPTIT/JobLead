import { CheckOutlined } from "@mui/icons-material";
import { Button, Col, Collapse, Popover, Row, Select, Table } from "antd";
import { formatNumber } from "src/helper/format.js";
import { discountInfo, packageInfo, posts, weeks } from "./packageInfo.js";
import { useState } from "react";

const text = "heelo";

const DiscountInfo = () => {
	const columns = [
		{ key: "amount", dataIndex: "amount", title: "Số lượng" },
		{ key: "percent", dataIndex: "percent", title: "Chiết khấu" },
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

const CategoryPost = ({ info, title }) => {
	const [post, setPost] = useState(1);
	const [week, setWeek] = useState(2);

	const onAdd = () => {
		console.log("value", post, week);
	};

	return (
		<Row gutter={[32, 16]}>
			<Col span={12}>
				{info?.intro?.map((item, i) => (
					<Info text={item} key={i} />
				))}
			</Col>
			<Col span={12}>
				<div className="flex gap-4 border-b pb-5">
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
					<div className="text-right min-w-[80px] md:min-w-[100px] lg:min-w-[120px]">
						<div className="text-[#e50303] font-bold">
							{formatNumber(1234)} đ
						</div>
						<div className="line-through text-99 text-xs">
							{formatNumber(12345)} đ
						</div>
						<Button type="primary" className="mt-2" onClick={onAdd}>
							Thêm
						</Button>
					</div>
				</div>
				<Popover placement="bottom" content={<DiscountInfo />} trigger="click">
					<p className="underline hover:cursor-pointer text-base hover:text-99 w-fit mt-5">
						Chương trình chiết khấu
					</p>
				</Popover>
			</Col>
		</Row>
	);
};

const Promotion = () => (
	<span className="bg-yellow4 border-yellow4 rounded-full ml-2 text-white px-2 py-[3px] text-xs">
		Khuyễn mãi 50%
	</span>
);

const PostInHome = () => {
	const itemsNest = [
		{
			key: "1",
			label: (
				<p className="font-semibold text-primary">
					VIỆC LÀM HOT
					<Promotion />
				</p>
			),
			children: <CategoryPost info={packageInfo?.home?.home} />,
		},
		{
			key: "2",
			label: (
				<span className="font-semibold text-primary">
					VIỆC LÀM HẤP DẪN
					<Promotion />
				</span>
			),
			children: <p>{text}</p>,
		},
		{
			key: "3",
			label: (
				<span className="font-semibold text-primary">
					VIỆC LÀM LƯƠNG CAO
					<Promotion />
				</span>
			),
			children: <p>{text}</p>,
		},
		{
			key: "4",
			label: (
				<span className="font-semibold text-primary">
					VIỆC LÀM TIÊU ĐIỂM
					<Promotion />
				</span>
			),
			children: <p>{text}</p>,
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
					items={itemsNest}
				/>
			),
		},
		{
			key: "2",
			label: (
				<span className="font-semibold text-primary">ĐĂNG TIN TRANG NGÀNH</span>
			),
			children: <p>{text}</p>,
		},
		{
			key: "3",
			label: (
				<span className="font-semibold text-primary">HIỆU ỨNG NỔI BẬT TIN</span>
			),
			children: <p>{text}</p>,
		},
	];

	return (
		<div className="border p-5">
			<Collapse
				defaultActiveKey={["1"]}
				expandIconPosition="end"
				items={items}
			/>
		</div>
	);
};

export default PostInHome;
