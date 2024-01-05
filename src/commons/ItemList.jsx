"use client";
import JobItemList from "./JobItemList";

const ItemList = ({ items }) => {
	return (
		<div className="min-h-[435px] overflow-y-auto px-2 pt-2 md:pt-0">
			{items?.map((item, i) => (
				<JobItemList item={item} key={i} />
			))}
		</div>
	);
};

export default ItemList;
