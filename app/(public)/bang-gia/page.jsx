"use client";

import { CaretRightFilled, EditOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import classNames from "classnames";
import Cart from "src/components/Package/Cart";
import PostInHome from "src/components/Package/PostInHome";
import { responsiveContent } from "src/constants/css";

const items = [
	{
		key: "1",
		label: <span className="font-semibold">ĐĂNG TIN TRANG CHỦ</span>,
		children: <PostInHome />,
	},
	{
		key: "2",
		label: (
			<span className="font-semibold">
				TÌM KIẾM CV ỨNG VIÊN / KHÁCH HÀNG TIỀM NĂNG
			</span>
		),
		children: "Content of Tab Pane 2",
	},
	{
		key: "3",
		label: (
			<span className="font-semibold">COMBO ĐĂN TIN & LỌC CV TIẾT KIỆM</span>
		),
		children: "Content of Tab Pane 3",
	},
	{
		key: "4",
		label: <span className="font-semibold">CÔNG TY NỔI BẬT</span>,
		children: "Content of Tab Pane 3",
	},
];

const PackagePage = () => {
	return (
		<div>
			<div className="bg-package bg-center py-[115px] text-white font-semibold">
				<div className="w-full sm:w-smContent md:w-mdContent lg:w-lgContent xl:w-xlContent mx-auto">
					<h1
						className="text-[30px] md:text-[42px] italic"
						style={{ lineHeight: "1.3", fontFamily: "sans-serif" }}
					>
						Giải pháp tiếp cận tối đa <br />
						1.000.000+ ứng viên mỗi tháng
					</h1>
					<div className="text-base mt-4">
						<p>
							<CaretRightFilled className="!text-primary mr-1" />
							4M+ Ứng viên chờ việc
						</p>
						<p>
							<CaretRightFilled className="!text-primary mr-1" />
							1M+ Người dùng truy cập
						</p>
						<p>
							<CaretRightFilled className="!text-primary mr-1" />
							700K+ user sử dụng kho CV
						</p>
					</div>
					<Button
						type="primary"
						size="large"
						icon={<EditOutlined className="text-xl" />}
						className="mt-5"
					>
						<span className="font-semibold">ĐĂNG KÝ NGAY</span>
					</Button>
				</div>
			</div>
			<div className={classNames(responsiveContent, "mt-5")}>
				<Tabs defaultActiveKey="1" items={items} />
			</div>
			<Cart />
		</div>
	);
};

export default PackagePage;
