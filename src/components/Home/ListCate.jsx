import { Grid } from "@mui/material";
import ItemCate from "./ItemCate";
import routeMap from "src/constants/routeMap";

const ListCate = ({ items, titleKey = "name" }) => {
	return (
		<div className="my-1">
			<Grid container spacing={(2, 1)}>
				{items?.map((item, i) => (
					<Grid item xs={4} key={i}>
						<ItemCate
							title={item?.[titleKey]?.name}
							amount={item?.jobCount}
							link={`${routeMap.searchJob}/${
								titleKey === "career" ? item?.[titleKey].slug : 0
							}/${titleKey === "workLocation" ? item?.[titleKey].slug : 0}`}
						/>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default ListCate;
