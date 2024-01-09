"use client";
import {
	AccountTreeOutlined,
	PlaceOutlined,
	SchoolOutlined,
	Search,
	StarBorderOutlined,
	WorkOutline,
} from "@mui/icons-material";
import { Pagination } from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Category from "src/commons/Category";
import routeMap from "src/constants/routeMap";
import { genArrayData } from "src/helper/format";
import ModalRoleView from "./ModalRoleView";
import { useState } from "react";
import { useAppSelector } from "lib/hooks";
import { USER_ROLE } from "src/constants/common";

const color = "#f19a2c";

const Item = ({ item, handleClickItem }) => {
	return (
		<div className="rounded border px-4 py-3 my-5">
			<div className="mb-1 flex items-center">
				<div
					className="text-54 text-lg font-bold cursor-pointer"
					onClick={() => handleClickItem(item?.id)}
				>
					{item?.name}
				</div>
				<div className="text-white rounded-full bg-red1 px-3 py-[1px] font-semibold text-xs ml-2">
					Đang tìm việc
				</div>
			</div>
			<div className="grid grid-cols-[75%_25%] gap-5">
				<div className="text-54">
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
				<div xs={3} className="font-bold text-base text-555552">
					{item?.salary}
				</div>
			</div>
		</div>
	);
};

const CandidateList = ({ data }) => {
	const { userInfo } = useAppSelector((state) => state.user);
	const [openModal, setOpenModal] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);

	const currentPage = Number(searchParams.get("page") || 1);

	const handleClickItem = (id) => {
		if (userInfo?.role === USER_ROLE.employer) {
			router.push(`${routeMap.candidate}${routeMap.detail}/${id}`);
		} else {
			setOpenModal(true);
		}
	};

	const onChangePage = async (page) => {
		params.set("page", page);
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<>
			<Category
				title="Danh sách ứng viên"
				icon={<Search />}
				contentClass="px-5 py-0"
			>
				{data?.candidates?.map((item, i) => (
					<Item item={item} key={i} handleClickItem={handleClickItem} />
				))}
				{data?.count > 0 && (
					<Pagination
						count={Math.ceil(data?.count / 10)}
						page={currentPage}
						onChange={(e, page) => onChangePage(page)}
						className="flex justify-center py-5 bg-white"
					/>
				)}
			</Category>
			<ModalRoleView
				open={openModal}
				onCancel={() => setOpenModal(false)}
				onOk={() => router.push(`${routeMap.login}${routeMap.employer}`)}
			/>
		</>
	);
};

export default CandidateList;
