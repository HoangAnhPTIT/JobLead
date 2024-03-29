"use client";
import { ApartmentOutlined, SearchOutlined } from "@mui/icons-material";
import { Grid, Pagination } from "@mui/material";
import { isEmpty } from "lodash";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Category from "src/commons/Category";
import ImageFull from "src/commons/Image";
import JobItem from "src/commons/JobItem";
import Nodata from "src/commons/Nodata";
import routeMap from "src/constants/routeMap";
import { convertSearchParamsToObject, genUrlParams } from "src/helper/format";
import ItemCate from "../Home/ItemCate";

const JobList = ({ jobList, majorList }) => {
	console.log("jobList", jobList);
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const onChangePage = async (page) => {
		const searchParamsObject =
			searchParams.toString() && convertSearchParamsToObject(searchParams);
		router.push(genUrlParams(pathname, { ...searchParamsObject, page }));
	};

	const currentPage = Number(searchParams.get("page")) || 1;

	return (
		<div className="w-full sm:w-smContent md:w-mdContent lg:w-lgContent xl:w-xlContent mx-auto my-5">
			<Grid container spacing={4}>
				<Grid item xs={12} lg={9}>
					<Category
						icon={<SearchOutlined />}
						title={jobList?.title}
						contentClass="border-0"
					>
						{!isEmpty(jobList?.jobs) ? (
							jobList?.jobs?.map((item, i) => (
								<div key={i} className="border-b p-2.5">
									<JobItem item={item} showExpire />
								</div>
							))
						) : (
							<Nodata />
						)}
					</Category>
					{!isEmpty(jobList?.jobs) && (
						<Pagination
							count={Math.ceil(jobList?.count / 10)}
							page={currentPage}
							onChange={(e, page) => onChangePage(page)}
							className="flex justify-center py-5 bg-white"
						/>
					)}
				</Grid>
				<Grid item xs={12} lg={3}>
					<Category
						icon={<ApartmentOutlined />}
						title="Việc làm theo ngành"
						contentClass="pt-0 max-h-[600px] overflow-y-auto"
					>
						{majorList?.map((item, i) => (
							<div key={i} className="my-2">
								<ItemCate
									title={item?.career?.name}
									amount={item?.jobCount}
									link={`${routeMap.searchJob}/${item?.career?.slug}/0`}
								/>
							</div>
						))}
					</Category>
					<div>
						<Link href="/">
							<ImageFull
								src="https://placehold.co/170x325.png"
								alt=""
								classname="mt-7"
							/>
						</Link>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default JobList;
