import React from "react";
import NoDataYet from "../../Common/NoDataYet";
import { isEmpty } from "lodash";
import ShowDescription from "src/commons/ShowDescription";

const Career = ({ info, icon }) => {
	return !info?.description && isEmpty(info?.items) ? (
		<NoDataYet />
	) : (
		<>
			{info?.items?.map((item, i) => (
				<p key={i}>
					<span className="mr-2">{icon}</span>
					{item?.name}
				</p>
			))}
			<div className="mt-1">
				<ShowDescription description={info?.description} />
			</div>
		</>
	);
};

export default Career;
