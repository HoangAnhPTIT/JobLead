import React from "react";

const Discount = ({ amount }) => {
	return (
		<span className="bg-yellow4 border-yellow4 rounded-full ml-2 text-white px-2 py-[3px] text-xs">
			Khuyễn mãi {amount}
		</span>
	);
};

export default Discount;
