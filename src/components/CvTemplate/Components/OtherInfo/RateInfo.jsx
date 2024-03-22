import { Flex, Rate } from "antd";
import { isEmpty } from "lodash";
import NoDataYet from "../../Common/NoDataYet";

const RateInfo = ({ info, iconColor }) => {
	return isEmpty(info) ? (
		<NoDataYet />
	) : (
		info.map((item, i) => (
			<div className="grid grid-cols-2 gap-2 mt-1" key={i}>
				<div>{item?.name}</div>
				<Flex>
					<Rate value={item?.star} disabled style={{ color: iconColor }} />
				</Flex>
			</div>
		))
	);
};

export default RateInfo;
