import {
	BorderColor,
	LocalFireDepartment,
	Person,
	Place,
	Work,
} from "@mui/icons-material";
import Stars from "@mui/icons-material/Stars";
import { Grid } from "@mui/material";
import Image from "next/image";
import { httpGet } from "src/apis/apiCaller";
import {
	apiCompany,
	apiHome,
	apiJobByCareer,
	apiJobByLocation,
} from "src/apis/apiEndpoint";
import Category from "src/commons/Category";
import ItemList from "src/commons/ItemList";
import AttractiveJob from "src/components/Home/AttractiveJob";
import CompanyList from "src/components/Home/CompanyList";
import ContactInfo from "src/components/Home/ContactInfo";
import EnhanceSearch from "src/components/Home/EnhanceSearch";
import HighSalaryJob from "src/components/Home/HighSalảyJob";
import HomeSearch from "src/components/Home/HomeSearch";
import HotJob from "src/components/Home/HotJob";
import ListCate from "src/components/Home/ListCate";
import RecruitmentSupport from "src/components/Home/RecruitmentSupport";
import {
	COMPONENT_LAYOUT,
	COMPONENT_SIZE,
	imageError,
} from "src/constants/common";
import routeMap, { jobTypeRouteMap } from "src/constants/routeMap";
import { WIDTH_CONTENT } from "src/constants/screen";

const HomePage = async () => {
	const jobResponse = await httpGet(apiHome);
	const jobByLocationResponse = await httpGet(apiJobByLocation);
	const jobByCareerResponse = await httpGet(apiJobByCareer);
	const companiesResponse = await httpGet(apiCompany);

	const jobData = jobResponse?.data || [];
	const jobByLocationData = jobByLocationResponse?.data || [];
	const jobByCareerData = jobByCareerResponse?.data || [];
	const companiesData = companiesResponse?.data || [];

	return (
		<div className="introduce pb-5 bg-bgBody">
			<HomeSearch />
			<div className="w-content sm:w-smContent md:w-mdContent lg:w-lgContent xl:w-xlContent mx-auto">
				<Image
					src={"https://placehold.co/1170x220.png" || imageError}
					width={WIDTH_CONTENT}
					height={220}
					alt="Nhân viên kinh doanh"
					className="my-5"
				/>
				<div className="mb-5">
					<Category
						title={jobData?.[0]?.serviceName}
						icon={<LocalFireDepartment />}
						extra={`${routeMap.job}${
							jobTypeRouteMap?.[jobData?.[0]?.serviceCode || "SEARCH"]
						}`}
					>
						<HotJob items={jobData?.[0]?.jobs} />
					</Category>
				</div>
				<Grid container spacing={2} className="mb-5">
					<Grid item xs={6}>
						<Image
							src={"https://placehold.co/577x220.png" || imageError}
							width={WIDTH_CONTENT / 2 - 8}
							height={220}
							alt=""
						/>
					</Grid>
					<Grid item xs={6}>
						<Image
							src={"https://placehold.co/577x220.png" || imageError}
							width={WIDTH_CONTENT / 2 - 8}
							height={220}
							alt=""
						/>
					</Grid>
				</Grid>
				<Grid container spacing={3} className="mb-5">
					<Grid item xs={12} lg={9}>
						<Category
							title={jobData?.[1]?.serviceName}
							icon={<Stars />}
							extra={`${routeMap.job}${
								jobTypeRouteMap?.[jobData?.[1]?.serviceCode || "SEARCH"]
							}`}
							contentClass="min-h-[487px]"
						>
							<AttractiveJob items={jobData?.[1]?.jobs} />
						</Category>
					</Grid>
					<Grid item xs={0} lg={3} className="hidden lg:block">
						<Image
							src="https://placehold.co/280x550.png"
							width={280}
							height={550}
							alt=""
						/>
					</Grid>
				</Grid>
				<Grid container spacing={3} className="mb-5">
					<Grid item xs={12} lg={9}>
						<Category
							title={jobData?.[2]?.serviceName}
							icon={<Stars />}
							extra={`${routeMap.job}${
								jobTypeRouteMap?.[jobData?.[2]?.serviceCode || "SEARCH"]
							}`}
							contentClass="min-h-[475px]"
						>
							<HighSalaryJob items={jobData?.[2]?.jobs} />
						</Category>
					</Grid>
					<Grid item xs={12} lg={3}>
						<Category
							title={jobData?.[3]?.serviceName}
							icon={<BorderColor />}
							contentClass="!p-0 min-h-[475px] max-h-[503px] overflow-y-auto"
							layout={COMPONENT_LAYOUT.vertical}
							extra={`${routeMap.job}${
								jobTypeRouteMap?.[jobData?.[3]?.serviceCode || "SEARCH"]
							}`}
						>
							<ItemList
								items={jobData?.[3]?.jobs}
								size={COMPONENT_SIZE.SMALL}
								pageSize={7}
							/>
						</Category>
					</Grid>
				</Grid>
				<div className="mb-5">
					<Category title="Nhà tuyển dụng hàng đầu" icon={<Person />}>
						<CompanyList items={companiesData} />
					</Category>
				</div>
				<Grid container spacing={3} className="mb-5">
					<Grid item xs={12} lg={9}>
						<Category
							title="Việc làm theo ngành nghề"
							icon={<Work />}
							layout={COMPONENT_LAYOUT.vertical}
							extra="/more"
							contentClass="!pb-3"
						>
							{<ListCate items={jobByCareerData} titleKey="career" />}
						</Category>
						<div className="pb-5" />
						<Category
							title="Việc làm theo tỉnh thành"
							icon={<Place />}
							layout={COMPONENT_LAYOUT.vertical}
							extra="/more"
							contentClass="!pb-3"
						>
							{<ListCate items={jobByLocationData} titleKey="workLocation" />}
						</Category>
						<div className="pb-5" />
						<Image
							src="https://placehold.co/873x225.png"
							width={873}
							height={225}
							alt=""
						/>
						<div className="pb-5" />
						<RecruitmentSupport />
						<div className="pb-5" />
						<ContactInfo />
					</Grid>
					<Grid item xs={12} lg={3}>
						<EnhanceSearch />
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default HomePage;
