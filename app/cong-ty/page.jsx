import CompanySearch from "src/components/Companies/CompanySearch";
import OtherCompanies from "src/components/Companies/OtherCompanies";
import TopCompanies from "src/components/Companies/TopCompanies";

const CompaniesPage = () => {
	return (
		<div>
			<CompanySearch />
			<div className="bg-bgBody">
				<div className="w-lgContent mx-auto py-8">
					<TopCompanies />
					<OtherCompanies />
				</div>
			</div>
		</div>
	);
};

export default CompaniesPage;
