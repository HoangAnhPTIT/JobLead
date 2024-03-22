import { isEmpty } from "lodash";
import React from "react";
import NoDataYet from "../../Common/NoDataYet";
import { Stack } from "@mui/material";
import CvEditDeleteLayout from "../../Common/CvEditDeleteLayout";
import { CV_MODAL_TYPES } from "src/constants/cv";
import ShowDescription from "src/commons/ShowDescription";

const Activity = ({ info, onEdit, onDelete }) => {
	return isEmpty(info) ? (
		<NoDataYet />
	) : (
		<Stack gap={1}>
			{info?.map((item, i) => (
				<CvEditDeleteLayout
					key={i}
					onEdit={() => onEdit(item, CV_MODAL_TYPES.activity)}
					onDelete={() => onDelete(item, CV_MODAL_TYPES.activity)}
				>
					<strong>{item?.title}</strong>
					<ShowDescription description={item?.description} />
				</CvEditDeleteLayout>
			))}
		</Stack>
	);
};

export default Activity;
