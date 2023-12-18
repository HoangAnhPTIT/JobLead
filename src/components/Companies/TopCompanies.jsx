"use client";
import { EnvironmentFilled, RiseOutlined } from "@ant-design/icons";
import { Flex, Image } from "antd";
import Link from "next/link";
import React from "react";
import Category from "@/src/commons/Category";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const TopCompanies = ({ items }) => {
	return (
		<Category
			icon={<RiseOutlined />}
			title="Các công ty hàng đầu"
			extra="/companies"
			contentClass="px-0"
		>
			<Swiper
				modules={[Pagination, Autoplay]}
				spaceBetween={20}
				slidesPerView={3}
				slidesPerGroup={3}
				pagination={{ clickable: true }}
				loop={true}
				autoplay={{ delay: 5000 }}
				className="pt-2 pb-9 px-5"
			>
				{items?.map((item, i) => (
					<SwiperSlide key={i}>
						<Link href={item?.link}>
							<div className="text-33 border">
								<Image
									src={item?.profile}
									alt={item?.name}
									width="100%"
									preview={false}
								/>
								<Flex gap={10} className="px-5">
									<div className="relative">
										<Image
											src={item?.avatar}
											alt={item.name}
											width={80}
											className="absolute -top-14 left-0"
											preview={false}
										/>
									</div>
									<div className="font-semibold">{item?.name}</div>
								</Flex>
								<div className="p-2">
									<EnvironmentFilled /> Địa chỉ: {item?.location}
								</div>
							</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</Category>
	);
};

export default TopCompanies;
