"use client";
import { Place, WorkOutline } from "@mui/icons-material";
import { Grid, Pagination } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { httpGet } from "src/apis/apiCaller";
import { apiCompanyFilter } from "src/apis/apiEndpoint";
import Category from "src/commons/Category";
import Nodata from "src/commons/Nodata";
import { imageError, primaryColor } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { genUrlParams } from "src/helper/format";

const OtherCompanies = () => {
	const pathname = usePathname();
	const router = useRouter();
	const [companyList, setCompanyList] = useState();
	const [count, setCount] = useState(0);
	const searchParams = useSearchParams();
	const q = searchParams.get("q") || "";
	const page = Number(searchParams.get("page")) || 1;

	const onChangePage = async (page) => {
		router.push(genUrlParams(pathname, { page }));
	};

	useEffect(() => {
		const getCompanies = async () => {
			const response = await httpGet(apiCompanyFilter, {
				type: "other",
				q,
				page,
				size: 20,
			});
			setCompanyList(response?.data?.companies);
			setCount(response?.data?.count);
		};
		getCompanies();
	}, [page, q]);

	return (
		<div className="mt-8">
			<Category
				icon={<WorkOutline />}
				title="Các công ty khác"
				extra={`${routeMap.company}/cong-ty-khac`}
			>
				{companyList?.length > 0 ? (
					<div className="">
						<Grid container>
							{companyList?.map((item, i) => (
								<Grid item xs={6} key={i} className="px-2">
									<Link href={`/companyies/${item?.id}`}>
										<div className="flex gap-2.5 border-b p-2">
											<Image
												src={item?.avatar || imageError}
												alt={item?.name}
												width={60}
												height={60}
											/>
											<div className="max-w-[calc(100%-80px)]">
												<div className="font-semibold text-33 text-sm mb-3 three-dot">
													{item?.name}
												</div>
												<div className="text-xs three-dot flex items-center">
													<Place
														style={{ color: primaryColor, fontSize: 16 }}
													/>
													<span className="text-99 ml-1">
														Địa chỉ: {item?.address}
													</span>
												</div>
											</div>
										</div>
									</Link>
								</Grid>
							))}
						</Grid>
						{count > 0 && (
							<Pagination
								count={Math.ceil(count / 20)}
								page={page}
								onChange={(e, page) => onChangePage(page)}
								className="flex justify-center py-5 bg-white"
							/>
						)}
					</div>
				) : (
					<Nodata />
				)}
			</Category>
		</div>
	);
};

export default OtherCompanies;
