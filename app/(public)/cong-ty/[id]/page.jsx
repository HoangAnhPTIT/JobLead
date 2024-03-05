"use client";
import {
	CalendarMonthOutlined,
	FmdGood,
	Groups,
	MonetizationOnOutlined,
	Place,
	PlaceOutlined,
	Public,
	QueryBuilderOutlined,
} from "@mui/icons-material";
import { Col, Image, Row } from "antd";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { httpGet } from "src/apis/apiCaller";
import { apiCompany } from "src/apis/apiEndpoint";
import Breadcrumb from "src/commons/Breadcrumb";
import ImageFull from "src/commons/Image";
import routeMap from "src/constants/routeMap";
import { getDate } from "src/helper/format";

const CompanyDetail = () => {
	const { id } = useParams();
	const [companyInfo, setCompanyInfo] = useState();
	const [jobList, setJobList] = useState();

	const breadcrum = [
		{
			title: "Trang chủ",
			href: "/",
		},
		{
			title: "Công ty",
			href: routeMap.company,
		},
		{
			title: "Công ty xyz",
		},
	];

	useEffect(() => {
		const getData = async () => {
			const infoRes = await httpGet(`${apiCompany}/${id}`);
			const jobsRes = await httpGet(`${apiCompany}/${id}/jobs`, {
				page: 1,
				size: 1000,
			});
			setCompanyInfo(infoRes?.data);
			setJobList(jobsRes?.data);
		};
		getData();
	}, [id]);

	return (
		<div className="bg-bgBody">
			<div className="w-full sm:w-smContent md:w-mdContent lg:w-lgContent xl:w-xlContent mx-auto pb-5">
				<Breadcrumb items={breadcrum} />
				<div className="relative border bg-white">
					<Image
						src={companyInfo?.profile}
						alt=""
						width="auto"
						preview={false}
						className="min-h-[345px]"
					/>
					<div className="ml-40 my-2">
						<h1 className="text-2xl text-primary">{companyInfo?.name}</h1>
						<p className="text-sm mt-2">
							<FmdGood fontSize="small" className="text-primary mr-1" />
							{companyInfo?.address}
						</p>
						<p className="text-sm mt-1">
							<Public fontSize="small" className="text-primary mr-1" />
							{companyInfo?.website}
						</p>
					</div>
					<div className="shadow p-1 absolute bottom-4 left-4 w-32 h-32 bg-white">
						<Image
							alt=""
							src={companyInfo?.avatar}
							width={120}
							height={120}
							preview={false}
						/>
					</div>
				</div>

				<h1 className="text-2xl mt-4 mb-2">GIỚI THIỆU CÔNG TY</h1>
				<Row gutter={[16, 16]}>
					<Col xs={24} lg={18}>
						<div>
							<div className="bg-white p-4 text-sm">
								{companyInfo?.description}
							</div>
						</div>
						<div>
							<h1 className="text-2xl my-2">TUYỂN DỤNG</h1>
							<div className="bg-white text-sm p-2 max-h-[500px] overflow-y-auto">
								<Row gutter={[8, 8]}>
									{jobList?.map((item, i) => (
										<Col span={12} key={i}>
											<div className="rounded border text-sm p-2">
												<h4 className="font-semibold">{item?.name}</h4>
												<Row gutter={[8, 4]}>
													<Col span={12}>
														<CalendarMonthOutlined
															fontSize="inherit"
															className="mr-1"
														/>
														{getDate(item?.createdDate)}
													</Col>
													<Col span={12}>
														<PlaceOutlined
															fontSize="inherit"
															className="mr-1"
														/>
														{item?.workLocation}
													</Col>
													<Col span={12}>
														<MonetizationOnOutlined
															fontSize="inherit"
															className="mr-1"
														/>
														{item?.salary}
													</Col>
													<Col span={12}>
														<QueryBuilderOutlined
															fontSize="inherit"
															className="mr-1"
														/>
														{item?.typeOfWork}
													</Col>
												</Row>
											</div>
										</Col>
									))}
								</Row>
							</div>
						</div>
					</Col>
					<Col xs={24} lg={6}>
						<div className="p-1 bg-white border">
							<ImageFull src="/images/we-need-you.jpg" />
							<div className="p-2">
								<h4 className="font-semibold mb-2">THÔNG TIN CÔNG TY</h4>
								<div className="text-[13px]">
									<p>
										<Place fontSize="inherit" className="text-primary" />
										<span className="font-semibold mx-2">Địa chỉ:</span>
										{companyInfo?.address}
									</p>
									<p>
										<Groups fontSize="inherit" className="text-primary" />
										<span className="font-semibold mx-2">Quy mô:</span>
										{companyInfo?.sizeDescription}
									</p>
									<p>
										<Public fontSize="inherit" className="text-primary" />
										<span className="font-semibold mx-2">Website:</span>
										{companyInfo?.website}
									</p>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default CompanyDetail;
