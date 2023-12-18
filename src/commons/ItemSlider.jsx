"use client";
import { Col, Row } from "antd";
import classNames from "classnames";
import JobItem from "src/commons/JobItem";
import { COMPONENT_SIZE } from "src/constants/common";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const padding = {
	[COMPONENT_SIZE.SMALL]: "p-1",
	[COMPONENT_SIZE.NORMAL]: "p-2",
	[COMPONENT_SIZE.LARGE]: "p-3",
};

const SwiperItem = ({ items, col, size }) => (
	<Row gutter={[12, 12]}>
		{items?.map((item, i) => (
			<Col span={24 / col} key={i}>
				<div className={classNames(["rounded border", padding[size]])}>
					<JobItem item={item} col={col} key={i} bordered size={size} />
				</div>
			</Col>
		))}
	</Row>
);

const ItemSlider = ({ items, col = 2, size, pageSize = 18 }) => {
	const page = items?.length / pageSize;
	let data = [];
	for (let i = 0; i < page; i++) {
		data[i] = items?.slice(i * pageSize, (i + 1) * pageSize);
	}

	return (
		<Swiper
			modules={[Pagination]}
			spaceBetween={50}
			slidesPerView={1}
			pagination={{ clickable: true }}
			className="pb-9"
		>
			{data?.map((item, i) => (
				<SwiperSlide key={i}>
					<SwiperItem items={item} col={col} size={size} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default ItemSlider;
