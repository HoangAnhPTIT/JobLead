"use client";
import {
	AccountTreeOutlined,
	PlaceOutlined,
	SchoolOutlined,
	Search,
	StarBorderOutlined,
	WorkOutline,
} from "@mui/icons-material";
import { Grid, Pagination } from "@mui/material";
import moment from "moment";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Category from "src/commons/Category";

const color = "#f19a2c";

const Item = ({ item }) => {
	return (
		<div className="rounded border px-4 py-3 my-5">
			<div className="mb-1">
				<span className="text-54 text-lg font-bold">{item?.name}</span>
				<span className="text-white rounded-full bg-red1 px-3 pb-0.5 font-semibold text-xs ml-2">
					{/* Đang tìm việc */}
				</span>
			</div>
			<Grid container spacing={3}>
				<Grid item xs={9} className="text-54">
					<div className="text-[15px]">
						<span>{item?.workTitle}</span>
						<span className="dot-ce"></span>
						<span>
							{moment().get("year") - moment(item?.dob).get("year")} tuổi
						</span>
						<span className="dot-ce"></span>
						<span>Kinh nghiệm: {item?.experience}</span>
					</div>
					<div className="text-sm">
						<p className="my-1">
							<span className="mr-5">
								<PlaceOutlined
									fontSize="small"
									style={{ color }}
									className="mr-1"
								/>
								Địa điểm:{" "}
								{item?.locations?.map((item, i) =>
									i === 0 ? item : `, ${item}`
								)}
							</span>
							<span>
								<AccountTreeOutlined
									fontSize="small"
									style={{ color }}
									className="mr-1"
								/>
								Cấp bậc: {item?.level}
							</span>
						</p>
						<p className="my-1">
							<StarBorderOutlined
								fontSize="small"
								style={{ color }}
								className="mr-1"
							/>
							Ngành nghề:
						</p>
						<p className="my-1">
							<WorkOutline
								fontSize="small"
								style={{ color }}
								className="mr-1"
							/>
							{item?.workHistories?.map((item, i) =>
								i === 0 ? item : `, ${item}`
							)}
						</p>
						<p className="my-1">
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
				</Grid>
				<Grid item xs={3} className="font-bold text-base text-555552">
					12 - 15 triệu
				</Grid>
			</Grid>
		</div>
	);
};

const CandidateList = ({ data }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);

	const currentPage = Number(searchParams.get("page") || 1);

	const onChangePage = async (page) => {
		params.set("page", page);
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<Category
			title="Danh sách ứng viên"
			icon={<Search />}
			contentClass="px-5 py-0"
		>
			{data?.candidates?.map((item, i) => (
				<Item item={item} key={i} />
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
	);
};

export default CandidateList;
