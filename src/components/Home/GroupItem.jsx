"use client";
import { Card, Carousel, Col, Flex, Row } from "antd";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import classNames from "classnames";
import { JOB_PRIORITY } from "src/constants/job";
import { DollarOutlined, EnvironmentOutlined } from "@ant-design/icons";

const SwiperItem = ({ items }) => (
	<Row gutter={[12, 12]}>
		{items?.map((item, i) => (
			<Col span={8} key={i}>
				<div className="border rounded p-1">
					<Flex gap={12}>
						<Image
							src={item?.image}
							width={60}
							height={60}
							alt={item?.companyName}
						/>
						<div className="text-sm w-[calc(100%-72px)]">
							<div
								className={classNames([
									"three-dot font-bold",
									item?.type === JOB_PRIORITY.HOT
										? "text-secondary"
										: "text-55",
								])}
							>
								{item?.type === JOB_PRIORITY.URGENT && (
									<i className="text-secondary ">(Gấp) </i>
								)}
								<span>{item?.jobName}</span>
							</div>
							<div className="uppercase text-99 three-dot">
								{item?.companyName}
							</div>
							<div className="text-primary">
								<span>
									<DollarOutlined />
									<span className="text-55 ml-1 mr-3">{item?.price}</span>
								</span>
								<span>
									<EnvironmentOutlined />
									<span className="text-55 ml-1">{item?.location}</span>
								</span>
							</div>
						</div>
					</Flex>
				</div>
			</Col>
		))}
	</Row>
);

const GroupItem = ({ items }) => {
	return (
		<Swiper
			modules={[Pagination]}
			spaceBetween={50}
			slidesPerView={1}
			pagination={{ clickable: true }}
			onSlideChange={() => console.log("slide change")}
			onSwiper={(swiper) => console.log(swiper)}
			className="pb-9"
		>
			<SwiperSlide>
				<SwiperItem items={items.slice(0, 18)} />
			</SwiperSlide>
			<SwiperSlide>
				<SwiperItem items={items.slice(18, items.length)} />
			</SwiperSlide>
		</Swiper>
	);
};

export default GroupItem;
