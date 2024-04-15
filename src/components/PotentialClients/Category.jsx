import React from "react";

const Category = ({ title, list }) => {
	return (
		<div className="">
			<div className="px-3 py-2 bg-primary text-white font-semibold text-lg">
				{title}
			</div>
		</div>
	);
};

export default Category;
