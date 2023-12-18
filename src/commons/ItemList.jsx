"use client";
import JobItemList from "./JobItemList";

const ItemList = ({ items }) => {
	return (
		<div className="min-h-[435px] overflow-y-auto">
			{items?.map((item, i) => (
				<JobItemList item={item} key={i} />
			))}
		</div>
	);
};

export default ItemList;
