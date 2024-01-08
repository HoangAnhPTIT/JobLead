import Breadcrumb from "src/commons/Breadcrumb";
import CompanySearch from "src/components/Companies/CompanySearch";
import OtherCompanies from "src/components/Companies/OtherCompanies";
import TopCompanies from "src/components/Companies/TopCompanies";

const breadcrum = [
	{
		title: "Trang chủ",
		href: "/",
	},
	{
		title: "Công ty",
	},
];

const CompaniesPage = () => {
	return (
		<div>
			<CompanySearch />
			<div className="bg-bgBody">
				<div className="w-lgContent mx-auto pb-5">
					<Breadcrumb items={breadcrum} />
					<TopCompanies />
					<OtherCompanies />
				</div>
			</div>
		</div>
	);
};

export default CompaniesPage;
