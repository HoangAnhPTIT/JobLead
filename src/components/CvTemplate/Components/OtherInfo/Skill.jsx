import { Stack } from "@mui/material";
import { isEmpty } from "lodash";
import ShowDescription from "src/commons/ShowDescription";
import NoDataYet from "../../Common/NoDataYet";

const Skill = ({ info, icon }) => {
	return !info?.description && isEmpty(info?.items) ? (
		<NoDataYet />
	) : (
		<>
			<Stack gap={1}>
				{info?.items?.map((item, i) => (
					<p key={i}>
						<span className="mr-2">{icon}</span>
						{item?.name}
					</p>
				))}
			</Stack>
			<div className="mt-1">
				<ShowDescription description={info?.description} />
			</div>
		</>
	);
};

export default Skill;
