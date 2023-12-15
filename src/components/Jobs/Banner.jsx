"use client";
import { Image } from "antd";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss/autoplay";
import "swiper/scss/navigation";

const items = [
	{ avatar: "/banner-1.jpg", link: "/more" },
	{ avatar: "/banner-2.jpg", link: "/more" },
	{ avatar: "/banner-3.jpg", link: "/more" },
];

const Banner = () => {
	return (
		<Swiper
			loop={true}
			navigation={true}
			cssMode={true}
			modules={[Autoplay, Navigation]}
			slidesPerView={1}
			slidesPerGroup={1}
			autoplay={{ delay: 5000 }}
			className="w-content h-[220px]"
		>
			{items?.map((item, i) => (
				<SwiperSlide key={i}>
					<Link href={item?.link}>
						<div className="image-shadow">
							<Image
								src={item?.avatar}
								width="100%"
								alt={item?.companyName}
								preview={false}
							/>
						</div>
					</Link>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default Banner;
