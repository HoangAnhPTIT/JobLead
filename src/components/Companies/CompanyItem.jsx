import { PlaceOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ImageFull from "src/commons/Image";
import { imageError } from "src/constants/common";

const CompanyItem = ({ item }) => {
	return (
		<Link href={`/companyies/${item?.id}`}>
			<div className="text-33 border">
				<ImageFull
					src={item?.profile}
					alt={item?.name}
					classname="min-h-[132px] max-h-[132px] object-contain"
				/>
				<div className="flex gap-2.5 px-5">
					<div className="relative w-20 h-10">
						<Image
							src={item?.avatar || imageError}
							alt={item.name || ""}
							width={80}
							height={80}
							className="absolute -top-7 left-0"
						/>
					</div>
					<div className={"flex-1 font-semibold max-two-line !h-12"}>
						{item?.name}
					</div>
				</div>
				<div className="p-2 !h-14 overflow-hidden">
					<PlaceOutlined
						fontSize="small"
						style={{ fontSize: 18 }}
						className="mr-1 -mt-0.5"
					/>
					Địa chỉ: {item?.address}
				</div>
			</div>
		</Link>
	);
};

export default CompanyItem;
