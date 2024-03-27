"use client";
import {
	BorderColorOutlined,
	RemoveRedEyeOutlined,
	ScheduleOutlined,
} from "@mui/icons-material";
import { Button, Grid, Stack } from "@mui/material";
import { Col, Image, Modal, Row } from "antd";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCandidateCv } from "src/apis/apiEndpoint";
import Nodata from "src/commons/Nodata";
import FileLayout from "src/components/Files/FileLayout";
import { imageError } from "src/constants/common";
import routeMap from "src/constants/routeMap";

const templates = ["1", "2", "3"];

const CvPage = () => {
	const router = useRouter();
	const [cvList, setCvList] = useState();
	const [showTemplateList, setShowTemplateList] = useState(false);

	const onChangeShowModal = () => {
		setShowTemplateList(!showTemplateList);
	};

	useEffect(() => {
		const getCvList = async () => {
			const response = await httpAuthGet({ endpoint: apiCandidateCv });
			setCvList(response?.data);
		};
		getCvList();
	}, []);

	return (
		<FileLayout>
			<Grid container spacing={2}>
				<Grid item xs={8}>
					<div className="flex justify-between items-center 	mb-3">
						<div className="font-semibold text-lg">Danh sách CV</div>
						<Button
							variant="contained"
							className="!bg-secondary"
							onClick={() => setShowTemplateList(true)}
						>
							Thêm mới CV
						</Button>
					</div>
					<Stack gap={5} className="bg-white shadow p-5">
						{!isEmpty(cvList) ? (
							cvList?.map((item, i) => (
								<div key={i} className="flex gap-5">
									<div className="w-36 h-44 shadow">
										<Image
											src={item?.templateImage || imageError}
											width="auto"
											alt={item?.name}
											preview={false}
										/>
									</div>
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
												{dayjs(
													item?.lastUpdatedDate || item?.createdDate
												).format("DD/MM/YYYY HH:mm:ss")}
											</div>
										</div>
										<div className="flex gap-5">
											<Button
												size="small"
												variant="outlined"
												onClick={() =>
													window.open(
														`${routeMap.file}${routeMap.cv}${routeMap.detail}/${item?.templateCode}`
													)
												}
											>
												<RemoveRedEyeOutlined
													fontSize="small"
													className="mr-1"
												/>
												Xem
											</Button>
											{/* <Button size="small" variant="outlined">
												<DownloadOutlined fontSize="small" className="mr-1" />{" "}
												Tải xuống
											</Button> */}
											<Button
												size="small"
												variant="outlined"
												fontSize="small"
												className="mr-1"
												onClick={() =>
													router.push(
														`${routeMap.file}${routeMap.cv}${routeMap.edit}/${item?.templateCode}`
													)
												}
											>
												<BorderColorOutlined /> Sửa
											</Button>
										</div>
									</div>
								</div>
							))
						) : (
							<Nodata />
						)}
					</Stack>
				</Grid>
			</Grid>
			<Modal
				title="Chọn mẫu CV"
				open={showTemplateList}
				onCancel={onChangeShowModal}
				footer={false}
			>
				<Row gutter={[16]}>
					{templates.map((item, i) => (
						<Col span={8} key={i}>
							<div
								className="shadow h-[120px] cursor-pointer"
								onClick={() =>
									router.push(
										`${routeMap.file}${routeMap.cv}${routeMap.edit}/${item}`
									)
								}
							>
								Mẫu {item}
							</div>
						</Col>
					))}
				</Row>
			</Modal>
		</FileLayout>
	);
};

export default CvPage;
