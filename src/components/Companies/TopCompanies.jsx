"use client";
import Category from "@/src/commons/Category";
import { ApartmentOutlined, PlaceOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import ImageFull from "src/commons/Image";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const TopCompanies = ({ items }) => {
	return (
		<Category
			icon={<ApartmentOutlined />}
			title="Các công ty hàng đầu"
			extra="/companies"
			contentClass="px-0"
		>
			<Swiper
				modules={[Pagination]}
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
						<Link href={`/companyies/${item?.id}`}>
							<div className="text-33 border">
								<ImageFull src={item?.profile} alt={item?.name} />
								<div className="flex gap-2.5 px-5">
									<div className="relative w-20 h-10">
										<Image
											src={item?.avatar}
											alt={item.name}
											width={80}
											height={80}
											className="absolute -top-7 left-0"
										/>
									</div>
									<div className={"flex-1 font-semibold max-two-line"}>
										{item?.name}
									</div>
								</div>
								<div className="p-2">
									<PlaceOutlined
										fontSize="small"
										style={{ fontSize: 18 }}
										className="mr-1 -mt-0.5"
									/>
									Địa chỉ: {item?.address}
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
