"use client";
import {
	AccountTreeOutlined,
	PlaceOutlined,
	SchoolOutlined,
	StarBorderOutlined,
	WorkOutline,
} from "@mui/icons-material";
import { Image } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { imageDefault } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { genArrayData } from "src/helper/format";

const color = "#f19a2c";

const CandidateItem = ({ item }) => {
	return (
		<div className="rounded shadow px-4 py-3 my-5 flex gap-5 bg-white">
			<div>
				<Image
					src={item?.avatar || imageDefault}
					alt={item?.name}
					width={78}
					height={78}
					className="rounded-full"
				/>
			</div>
			<div className="flex-1">
				<div className="mb-1 flex items-center">
					<Link href={`${routeMap.candidate}${routeMap.detail}/${item?.id}`}>
						<div className="text-54 text-lg font-bold cursor-pointer">
							{item?.name}
						</div>
					</Link>
					<div className="text-white rounded-full bg-red1 px-3 py-[1px] font-semibold text-xs ml-2">
						Đang tìm việc
					</div>
				</div>
				<div className="flex gap-5">
					<div className="text-54 flex-1">
						<div className="text-[15px]">
							<span>{item?.workTitle}</span>
							<span className="dot-ce"></span>
							<span>
								{dayjs().get("year") - dayjs(item?.dob).get("year")} tuổi
							</span>
							<span className="dot-ce"></span>
							<span>Kinh nghiệm: {item?.experience}</span>
						</div>
						<div className="text-sm">
							<div className="my-1 grid grid-cols-2">
								<div className="mr-5 three-dot">
									<PlaceOutlined
										fontSize="small"
										style={{ color }}
										className="mr-1"
									/>
									Địa điểm: {genArrayData(item?.locations)}
								</div>
								<div className="three-dot">
									<AccountTreeOutlined
										fontSize="small"
										style={{ color }}
										className="mr-1"
									/>
									Cấp bậc: {item?.level}
								</div>
							</div>
							<p className="my-1 three-dot">
								<StarBorderOutlined
									fontSize="small"
									style={{ color }}
									className="mr-1"
								/>
								Ngành nghề: {genArrayData(item?.careers)}
							</p>
							<p className="my-1 three-dot">
								<WorkOutline
									fontSize="small"
									style={{ color }}
									className="mr-1"
								/>
								{genArrayData(item?.workHistories)}
							</p>
							<p className="my-1 three-dot">
								<SchoolOutlined
									fontSize="small"
									style={{ color }}
									className="mr-1"
								/>
								{item?.educations?.map((item, i) =>
									i === 0
										? `${item?.certification} tại ${item?.school}`
										: `, ${item?.certification} tại ${item?.school}`
								)}
							</p>
						</div>
					</div>
					<div xs={3} className="font-bold text-right text-lg text-555552 w-48">
						{item?.salary}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CandidateItem;
