"use client";
import { CaretRightFilled, EditOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import classNames from "classnames";
import { useState } from "react";
import Cart from "src/components/Package/Common/Cart";
import MoreInfo from "src/components/Package/Common/MoreInfo";
import SupportInfo from "src/components/Package/Common/SupportInfo";
import CandidatePackage from "src/components/Package/TabComponent/TabCandidate/CandidatePackage";
import FeaturedCompany from "src/components/Package/TabComponent/TabFeaturedCompany/FeaturedCompany";
import PostInHome from "src/components/Package/TabComponent/TabHome/PostInHome";
import { responsiveContent } from "src/constants/css";

const PackagePage = () => {
	const [cart, setCart] = useState({});

	const items = [
		{
			key: "1",
			label: <span className="font-semibold">ĐĂNG TIN TRANG CHỦ</span>,
			children: <PostInHome setCart={setCart} />,
		},
		{
			key: "2",
			label: (
				<span className="font-semibold">
					TÌM KIẾM CV ỨNG VIÊN / KHÁCH HÀNG TIỀM NĂNG
				</span>
			),
			children: <CandidatePackage setCart={setCart} />,
		},
		{
			key: "3",
			label: (
				<span className="font-semibold">COMBO ĐĂNG TIN & LỌC CV TIẾT KIỆM</span>
			),
			children: "Content of Tab Pane 3",
		},
		{
			key: "4",
			label: <span className="font-semibold">CÔNG TY NỔI BẬT</span>,
			children: <FeaturedCompany setCart={setCart} />,
		},
	];

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
			<MoreInfo />
			<SupportInfo />
			<Cart cart={cart} setCart={setCart} />
		</div>
	);
};

export default PackagePage;
