import { Col, Row } from "antd";
import ItemCate from "./ItemCate";

const ListCate = ({ items, titleKey = "name" }) => {
	return (
		<Row gutter={[12, 6]} className="my-1">
			{items?.map((item, i) => (
				<Col span={8} key={i}>
					<ItemCate
						title={item?.[titleKey]?.name}
						amount={item?.jobCount}
						link="/"
					/>
				</Col>
			))}
		</Row>
	);
};

export default ListCate;
