import React from "react";

const Fullname = ({ fullName, css }) => {
	return (
		<div className="text-3xl">
			{fullName ? (
				<span className={css}>{fullName}</span>
			) : (
				<span className="text-placeholder">Tên của bạn</span>
			)}
		</div>
	);
};

export default Fullname;
