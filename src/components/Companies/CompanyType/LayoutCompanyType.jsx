import { Pagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Breadcrumb from "src/commons/Breadcrumb";
import Category from "src/commons/Category";
import CompanyItem from "../CompanyItem";
import CompanySearch from "../CompanySearch";
import { genUrlParams } from "src/helper/format";

const LayoutCompanyType = ({ data }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const currentPage = Number(searchParams.get("page") || 1);

	const onChangePage = async (page) => {
		router.push(genUrlParams(pathname, { page }));
	};

	return (
		<div>
			<CompanySearch />
			<div className="bg-bgBody">
				<div className="w-lgContent mx-auto pb-5">
					<Breadcrumb items={data.breadcrum} />
					<Category icon={data.icon} title={data.title} contentClass="!p-5">
						<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5">
							{data?.companies?.map((item, i) => (
								<CompanyItem item={item} key={i} />
							))}
						</div>
						{data?.count > 0 && (
							<Pagination
								count={Math.ceil(data?.count / 12)}
								page={currentPage}
								onChange={(e, page) => onChangePage(page)}
								className="flex justify-center py-5 bg-white"
							/>
						)}
					</Category>
				</div>
			</div>
		</div>
	);
};

export default LayoutCompanyType;
