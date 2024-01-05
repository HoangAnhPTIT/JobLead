"use client";
import Image from "next/image";
import Link from "next/link";
import { imageError } from "src/constants/common";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CompanyList = ({ items }) => {
	return (
		<Swiper
			modules={[Pagination]}
			slidesPerView={5}
			slidesPerGroup={5}
			breakpoints={{
				640: {
					spaceBetween: 20,
				},
				768: {
					spaceBetween: 40,
				},
				1024: {
					spaceBetween: 50,
				},
			}}
			pagination={{ clickable: true }}
			className="pt-2 pb-9 px-5"
		>
			{items?.map((item, i) => (
				<SwiperSlide key={i}>
					<Link href={item?.id}>
						<div className="image-shadow p-2 shadow rounded">
							{item?.avatar && (
								<Image
									src={item?.avatar || imageError}
									width={200}
									height={200}
									alt={item?.name || ""}
								/>
							)}
						</div>
						<div className="text-center text-sm mt-2 text-primary max-two-line">
							{item?.name}
						</div>
					</Link>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default CompanyList;
