"use client";
import { Col, Row } from "antd";
import classNames from "classnames";
import JobItem from "src/commons/JobItem";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SwiperItem = ({ items, col, size }) => (
	<Row gutter={[12, 12]}>
		{items?.map((item, i) => (
			<JobItem item={item} col={col} key={i} bordered size={size} />
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
			onSlideChange={() => console.log("slide change")}
			onSwiper={(swiper) => console.log(swiper)}
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
