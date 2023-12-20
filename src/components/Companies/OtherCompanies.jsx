"use client";
import { Place, WorkOutline } from "@mui/icons-material";
import { Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { httpGet } from "src/apis/apiCaller";
import { apiGetCompanies } from "src/apis/apiEndpoint";
import Category from "src/commons/Category";
import { primaryColor } from "src/constants/common";

const OtherCompanies = () => {
	const [companyList, setCompanyList] = useState();

	useEffect(() => {
		const getCompanies = async () => {
			const response = await httpGet(apiGetCompanies);
			setCompanyList(response?.data);
		};
		getCompanies();
	}, []);

	return (
		<div className="mt-8">
			<Category icon={<WorkOutline />} title="Các công ty khác">
				<div className="max-h-[calc(100vh-200px)] overflow-y-auto">
					<Grid container spacing={2}>
						{companyList?.map((item, i) => (
							<Grid item xs={6} key={i}>
								<Link href={item?.id}>
									<div className="flex gap-2.5 border-b p-2">
										<Image
											src={item?.avatarUrl}
											alt={item?.name}
											width={60}
											height={60}
										/>
										<div className="max-w-[calc(100%-80px)]">
											<div className="font-semibold text-33 text-sm mb-3">
												{item?.name}
											</div>
											<div className="text-xs three-dot flex items-center">
												<Place style={{ color: primaryColor, fontSize: 16 }} />
												<span className="text-99 ml-1">{item?.address}</span>
											</div>
										</div>
									</div>
								</Link>
							</Grid>
						))}
					</Grid>
				</div>
			</Category>
		</div>
	);
};

export default OtherCompanies;
