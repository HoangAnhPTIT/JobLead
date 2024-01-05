"use client";
import { Grid } from "@mui/material";
import classNames from "classnames";
import JobItem from "src/commons/JobItem";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const AttractiveJob = ({ items }) => {
	const pageSize = 10;
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
					<Grid container spacing={[2, 2]}>
						{item?.map((item, i) => (
							<Grid item xs={12} sm={6} key={i}>
								<div className={classNames(["rounded border p-3"])}>
									<JobItem item={item} key={i} bordered />
								</div>
							</Grid>
						))}
					</Grid>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default AttractiveJob;
