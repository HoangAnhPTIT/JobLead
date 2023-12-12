"use client";
import JobItemList from "./JobItemList";

const ItemList = ({ items, size, pageSize }) => {
	return (
		<div className="h-[455px] overflow-y-auto">
			{items?.map((item, i) => (
				<JobItemList item={item} key={i} />
			))}
		</div>
	);
};

export default ItemList;
