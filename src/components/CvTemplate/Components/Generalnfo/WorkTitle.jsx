import React from "react";

const WorkTitle = ({ workTitle, css }) => {
	return (
		<div className="text-lg text-33">
			{workTitle ? (
				<span className={css}>{workTitle}</span>
			) : (
				<span className="text-placeholder">
					Vị trí công việc bạn muốn ứng tuyển
				</span>
			)}
		</div>
	);
};

export default WorkTitle;
