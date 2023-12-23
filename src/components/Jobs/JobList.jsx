"use client";
import { ApartmentOutlined, SearchOutlined } from "@mui/icons-material";
import { Grid, Pagination } from "@mui/material";
import Link from "next/link";
import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { httpGet, httpPost } from "src/apis/apiCaller";
import { apiJob } from "src/apis/apiEndpoint";
import Category from "src/commons/Category";
import ImageFull from "src/commons/Image";
import JobItem from "src/commons/JobItem";
import Nodata from "src/commons/Nodata";
import { JOB_TYPE_MAP_ROUTE } from "src/constants/job";
import ItemCate from "../Home/ItemCate";

const JobList = ({ jobList, majorList }) => {
	const router = useRouter();
	const { type, career, loction } = useParams();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [currentPage, setCurrentPage] = useState(1);
	const [jobsInfo, setJobsInfo] = useState(jobList);
	const [firstLoad, setFirstLoad] = useState(true);
	const params = new URLSearchParams(searchParams);

	const onChangePage = async (page) => {
		await params.set("page", page);
		router.push(`${pathname}?${params.toString()}`);
	};

	useEffect(() => {
		if (!firstLoad) {
			const getCurrentPage = searchParams.get("page");
			setCurrentPage(getCurrentPage ? Number(getCurrentPage) : 1);
			if (career || loction) {
				let payload = {};
				for (const [key, value] of searchParams.entries()) {
					payload[key] = value;
				}
				const searchData = async () => {
					const responseData = await httpPost(`${apiJob}/filter`, {
						...payload,
						workLocation: location,
						career: career,
					});
					setJobsInfo(responseData?.data);
				};
				searchData();
			} else if (type) {
				const searchData = async () => {
					const responseData = await httpGet(
						`${apiJob}/filter/service/${JOB_TYPE_MAP_ROUTE[type]}?page=${
							searchParams?.page || 1
						}&size=10`
					);
					console.log("responseData", responseData);
					setJobsInfo(responseData?.data);
				};
				searchData();
			}
		} else {
			setFirstLoad(false);
		}
	}, [type, searchParams, career, loction]);

	return (
		<div className="w-content mx-auto my-5">
			<Grid container spacing={4}>
				<Grid item xs={9}>
					<Category
						icon={<SearchOutlined />}
						title="Việc làm hot"
						contentClass="border-b-0"
					>
						{jobsInfo?.count > 0 ? (
							jobsInfo?.jobs?.map((item, i) => (
								<div key={i} className="border-b p-2.5">
									<JobItem item={item} showExpire />
								</div>
							))
						) : (
							<Nodata />
						)}
					</Category>
					{jobsInfo?.count > 0 && (
						<Pagination
							count={Math.ceil(jobsInfo?.count / 10)}
							page={currentPage}
							onChange={(e, page) => onChangePage(page)}
							className="flex justify-center py-5 bg-white"
						/>
					)}
				</Grid>
				<Grid item xs={3}>
					<Category
						icon={<ApartmentOutlined />}
						title="Việc làm theo ngành"
						contentClass="pt-0"
					>
						{majorList?.map((item, i) => (
							<div key={i} className="my-2">
								<ItemCate
									title={item?.career?.name}
									amount={item?.jobCount}
									link="/"
								/>
							</div>
						))}
					</Category>
					<div>
						<Link href="/">
							<ImageFull src="/cv-banner-2.png" alt="" classname="mt-7" />
						</Link>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default JobList;
