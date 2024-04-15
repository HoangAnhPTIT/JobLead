import classNames from "classnames";
import Breadcrumb from "src/commons/Breadcrumb";
import Category from "src/components/PotentialClients/Category";
import SearchBox from "src/components/PotentialClients/SearchBox";
import { responsiveContent } from "src/constants/css";

const breadcrum = [
	{
		title: "Trang chủ",
		href: "/",
	},
	{
		title: "Khách hàng tiềm năng",
	},
];

const PotentialClients = () => {
	return (
		<div className={classNames(responsiveContent, "py-5")}>
			<SearchBox />
			<Breadcrumb items={breadcrum} />
			<Category title="ljládjfla sl" />
		</div>
	);
};

export default PotentialClients;
