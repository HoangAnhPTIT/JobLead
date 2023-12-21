import { Grid } from "@mui/material";
import ItemCate from "./ItemCate";

const ListCate = ({ items, titleKey = "name" }) => {
	return (
		<div className="my-1">
			<Grid container spacing={(2, 1)}>
				{items?.map((item, i) => (
					<Grid item xs={4} key={i}>
						<ItemCate
							title={item?.[titleKey]?.name}
							amount={item?.jobCount}
							link="/"
						/>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default ListCate;
