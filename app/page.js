import {
	ApartmentOutlined,
	EditFilled,
	EnvironmentOutlined,
	FireFilled,
	StarFilled,
	UserOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import Image from "next/image";
import { httpGet } from "src/apis/apiCaller";
import {
	apiGetCompanies,
	apiHome,
	apiJobByCareer,
	apiJobByLocation,
} from "src/apis/apiEndpoint";
import EnhanceSearch from "src/commons/Candidate/EnhanceSearch";
import Category from "src/commons/Category";
import ItemList from "src/commons/ItemList";
import ItemSlider from "src/commons/ItemSlider";
import CompanyList from "src/components/Home/CompanyList";
import ContactInfo from "src/components/Home/ContactInfo";
import HomeSearch from "src/components/Home/HomeSearch";
import ListCate from "src/components/Home/ListCate";
import RecruitmentSupport from "src/components/Home/RecruitmentSupport";
import { COMPONENT_LAYOUT, COMPONENT_SIZE } from "src/constants/common";
import { JOB_PRIORITY } from "src/constants/job";
import { WIDTH_CONTENT } from "src/constants/screen";

const jobInfo = {
	jobName: "NHÂN VIÊN KẾ TOÁN TỔNG HỢP - THU NHẬP TỪ 12 TRIỆU",
	avatar: "/thumb-80x80.png",
	companyName: "Công ty TNHH South Sea Leatherwares Việt Nam",
	price: "12 triệu - 15 triệu",
	location: "Hà Nội",
	type: JOB_PRIORITY.HOT,
	expireDate: "31/12/2023",
};

const HomePage = async () => {
	const jobResponse = await httpGet(apiHome);
	const jobByLocationResponse = await httpGet(apiJobByLocation);
	const jobByCareerResponse = await httpGet(apiJobByCareer);
	const companiesResponse = await httpGet(apiGetCompanies);

	const jobData = jobResponse?.data || [];
	const jobByLocationData = jobByLocationResponse?.data || [];
	const jobByCareerData = jobByCareerResponse?.data || [];
	const companiesData = companiesResponse?.data || [];

	return (
		<div className="Home">
			<div className="introduce bg-bgBody">
				<HomeSearch />
				<div className="w-content mx-auto">
					<Image
						src="/banner_doc_quyen.jpg"
						width={WIDTH_CONTENT}
						height={220}
						alt="Nhân viên kinh doanh"
						className="my-5"
					/>
					<Category
						title={jobData?.[0]?.serviceName}
						icon={<FireFilled />}
						extra="/more"
					>
						<ItemSlider
							items={jobData?.[0]?.jobs}
							col={3}
							size={COMPONENT_SIZE.SMALL}
							pageSize={18}
						/>
					</Category>
					<Row gutter={16} className="my-5">
						<Col span={12}>
							<Image
								src="/banner_gioi_han1.jpg"
								width={WIDTH_CONTENT / 2 - 8}
								height={220}
								alt=""
							/>
						</Col>
						<Col span={12}>
							<Image
								src="/banner_gioi_han2.jpg"
								width={WIDTH_CONTENT / 2 - 8}
								height={220}
								alt=""
							/>
						</Col>
					</Row>
					<Row gutter={26}>
						<Col span={18}>
							<Category
								title={jobData?.[1]?.serviceName}
								icon={<StarFilled />}
								extra="/more"
								contentClass="min-h-[487px]"
							>
								<ItemSlider
									items={jobData?.[1]?.jobs}
									size={COMPONENT_SIZE.NORMAL}
									pageSize={10}
								/>
							</Category>
						</Col>
						<Col span={6}>
							<Image src="/banner1.jpg" width={280} height={550} alt="" />
						</Col>
					</Row>
					<Row gutter={26} className="my-5">
						<Col span={18}>
							<Category
								title={jobData?.[2]?.serviceName}
								icon={<StarFilled />}
								extra="/more"
								contentClass="min-h-[475px]"
							>
								<ItemSlider
									items={jobData?.[2]?.jobs}
									size={COMPONENT_SIZE.NORMAL}
									pageSize={10}
								/>
							</Category>
						</Col>
						<Col span={6}>
							<Category
								title={jobData?.[3]?.serviceName}
								icon={<EditFilled />}
								contentClass="!p-0 min-h-[475px]"
								layout={COMPONENT_LAYOUT.vertical}
								extra="/more"
							>
								<ItemList
									items={jobData?.[3]?.jobs}
									size={COMPONENT_SIZE.SMALL}
									pageSize={7}
								/>
							</Category>
						</Col>
					</Row>
					<Category title="Nhà tuyển dụng hàng đầu" icon={<UserOutlined />}>
						<CompanyList items={companiesData} />
					</Category>
					<Row gutter={16} className="my-5">
						<Col span={18}>
							<Category
								title="Việc làm theo ngành nghề"
								icon={<ApartmentOutlined />}
								layout={COMPONENT_LAYOUT.vertical}
								extra="/more"
								contentClass="!pb-3"
							>
								{<ListCate items={jobByCareerData} titleKey="career" />}
							</Category>
							<div className="pb-5" />
							<Category
								title="Việc làm theo tỉnh thành"
								icon={<EnvironmentOutlined />}
								layout={COMPONENT_LAYOUT.vertical}
								extra="/more"
								contentClass="!pb-3"
							>
								{<ListCate items={jobByLocationData} titleKey="workLocation" />}
							</Category>
							<div className="pb-5" />
							<Image
								src="/cv-banner-home-new.png"
								width={873}
								height={225}
								alt=""
							/>
							<div className="pb-5" />
							<RecruitmentSupport />
							<div className="pb-5" />
							<ContactInfo />
						</Col>
						<Col span={6}>
							<EnhanceSearch />
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
