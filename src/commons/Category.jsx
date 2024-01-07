import { COMPONENT_LAYOUT } from "src/constants/common";
import { Grid } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";

const Category = ({
	title,
	icon,
	extra,
	layout = COMPONENT_LAYOUT.horizolical,
	contentClass,
	children,
}) => {
	return (
		<div className="">
			<Grid
				container
				justifyContent="space-between"
				alignItems="center"
				className="h-12 px-2.5 bg-primary text-white uppercase"
			>
				<Grid item className="!text-base lg:!text-lg flex items-center gap-1">
					{icon}
					{title}
				</Grid>
				{extra && layout === COMPONENT_LAYOUT.horizolical && (
					<Grid item>
						<Link
							href={extra}
							className="text-white after:content-['\276F'] after:font-bold after:ml-1 "
						>
							Xem thêm
						</Link>
					</Grid>
				)}
			</Grid>
			<div
				className={classNames([
					"border border-f0 p-3 pb-0 bg-white",
					contentClass,
				])}
			>
				{children}
				{extra && layout === COMPONENT_LAYOUT.vertical && (
					<div className="text-right px-2 py-1">
						<Link
							href={extra}
							className="text-sm text-primary after:content-['\276F'] after:font-bold after:ml-1 after:text-xs"
						>
							Xem thêm
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Category;
