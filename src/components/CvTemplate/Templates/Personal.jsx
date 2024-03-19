import React from "react";
import CvItemLayout from "../CvItemLayout";
import { CV_MODAL_TYPES } from "src/constants/cv";
import useCandidateInfo from "src/hooks/useCandidateInfo";
import { Col, Image, Row } from "antd";
import {
	CalendarMonthOutlined,
	Email,
	EmailOutlined,
	PhoneAndroid,
	PhotoCamera,
	PlaceOutlined,
	SmartphoneOutlined,
	Star,
	TransgenderOutlined,
} from "@mui/icons-material";
import Fullname from "../Components/Generalnfo/Fullname";
import WorkTitle from "../Components/Generalnfo/WorkTitle";
import { Stack } from "@mui/system";
import { StarFilled } from "@ant-design/icons";

const color = "#B31312";

const PersonalTemplate = ({ info, modalType, setModalType, data }) => {
	console.log("info", info);

	return (
		<div className="bg-white">
			<div
				className="text-white h-[290px] px-5 py-10 flex"
				style={{ background: color }}
			>
				<div className="border-r-2 border-white w-fit px-10 h-full">
					{data?.avatar ? (
						<Image
							src={data?.avatar}
							alt=""
							width={150}
							height="auto"
							preview={false}
						/>
					) : (
						<div className="p-5 bg-white rounded-full w-fit">
							<PhotoCamera style={{ fontSize: 160, color: "#333" }} />
						</div>
					)}
				</div>
				<div className="px-10">
					<CvItemLayout
						itemType={CV_MODAL_TYPES.generalInfo}
						setModalType={setModalType}
					>
						<Fullname fullName={info?.generalInfo?.fullName} css="text-white" />
						<WorkTitle
							workTitle={info?.generalInfo?.workTitle}
							css="text-white"
						/>
					</CvItemLayout>
					<CvItemLayout
						itemType={CV_MODAL_TYPES.careerGoal}
						setModalType={setModalType}
					>
						<div className="pt-5">
							{info?.career?.items?.map((item, i) => (
								<p key={i}>
									<StarFilled className="mr-2" />
									{item?.name}
								</p>
							))}
							<p className="mt-1">{info?.career?.description}</p>
						</div>
					</CvItemLayout>
				</div>
			</div>
			<div className="h-2 bg-de"></div>
			<div className="p-4">
				<Row gutter={16}>
					<Col span={12}>
						<CvItemLayout
							itemType={CV_MODAL_TYPES.generalInfo}
							setModalType={setModalType}
						>
							<div
								className="border-b-[3px] pb-1 border-de text-xl font-bold text-center"
								style={{ color }}
							>
								LIÊN HỆ
							</div>
							<Stack gap={2} className="py-4 px-2">
								<p>
									<EmailOutlined
										fontSize="small"
										className="mr-2"
										style={{ color }}
									/>
									{info?.generalInfo?.email}
								</p>
								<p>
									<SmartphoneOutlined
										fontSize="small"
										className="mr-2"
										style={{ color }}
									/>
									{info?.generalInfo?.phone}
								</p>
								<p>
									<CalendarMonthOutlined
										fontSize="small"
										className="mr-2"
										style={{ color }}
									/>
									{info?.generalInfo?.birthday}
								</p>
								<p>
									<TransgenderOutlined
										fontSize="small"
										className="mr-2"
										style={{ color }}
									/>
									{info?.generalInfo?.gender}
								</p>
								<p>
									<PlaceOutlined
										fontSize="small"
										className="mr-2"
										style={{ color }}
									/>
									{info?.generalInfo?.location}
								</p>
							</Stack>
						</CvItemLayout>
					</Col>
					<Col span={12}>
						<CvItemLayout
							itemType={CV_MODAL_TYPES.skill}
							setModalType={setModalType}
						>
							<div
								className="border-b-[3px] pb-1 border-de text-xl font-bold text-center"
								style={{ color }}
							>
								KỸ NĂNG
							</div>
							<div className="py-4 px-2">
								<Stack gap={1}>
									{info?.softSkill?.items?.map((item, i) => (
										<p key={i}>
											<StarFilled className="mr-2" style={{ color }} />
											{item?.name}
										</p>
									))}
								</Stack>
								<p className="mt-1">{info?.softSkill?.description}</p>
							</div>
						</CvItemLayout>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default PersonalTemplate;
