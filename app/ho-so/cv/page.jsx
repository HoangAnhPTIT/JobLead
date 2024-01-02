"use client";
import {
	BorderColorOutlined,
	Download,
	DownloadOutlined,
	EditOutlined,
	RemoveRedEyeOutlined,
	ScheduleOutlined,
} from "@mui/icons-material";
import { Button, Divider, Grid, Stack } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCandidateCv, apiCv } from "src/apis/apiEndpoint";
import FileLayout from "src/components/Files/FileLayout";
import routeMap from "src/constants/routeMap";

const CvPage = () => {
	const router = useRouter();
	const [cvList, setCvList] = useState();

	useEffect(() => {
		const getCvList = async () => {
			const response = await httpAuthGet({ endpoint: apiCandidateCv });
			setCvList(response?.cvs);
		};
		getCvList();
	}, []);

	return (
		<FileLayout>
			<Grid container spacing={2}>
				<Grid item xs={8}>
					<div className="font-semibold text-lg mb-3">Danh sách CV</div>
					<Stack gap={5} className="bg-white shadow p-5">
						{cvList?.map((item, i) => (
							<div key={i} className="flex gap-5">
								<div className="w-36 h-44 shadow">{item?.name}</div>
								<div className="flex-1">
									<div className="mb-3 flex justify-between">
										<div className="text-lg text-primary font-semibold ">
											{item?.name}
										</div>
										<div className="text-sm text-99 flex items-center">
											<ScheduleOutlined
												fontSize="inherit"
												className="text-primary mr-1"
											/>
											{moment(item?.lastUpdatedDate).format(
												"DD/MM/YYYY HH:mm:ss"
											)}
										</div>
									</div>
									<div className="flex gap-5">
										<Button size="small" variant="outlined">
											<RemoveRedEyeOutlined fontSize="small" className="mr-1" />{" "}
											Xem
										</Button>
										<Button size="small" variant="outlined">
											<DownloadOutlined fontSize="small" className="mr-1" /> Tải
											xuống
										</Button>
										<Button
											size="small"
											variant="outlined"
											fontSize="small"
											className="mr-1"
											onClick={() =>
												router.push(`${routeMap.file}${routeMap.cv}/1`)
											}
										>
											<BorderColorOutlined /> Sửa
										</Button>
									</div>
								</div>
							</div>
						))}
					</Stack>
				</Grid>
			</Grid>
		</FileLayout>
	);
};

export default CvPage;
