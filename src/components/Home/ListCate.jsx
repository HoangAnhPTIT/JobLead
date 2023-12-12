import { Col, Row } from "antd";
import ItemCate from "./ItemCate";

const ListCate = ({ items }) => {
	return (
		<Row gutter={[12, 6]} className="my-1">
			{items?.map((item, i) => (
				<Col span={8} key={i}>
					<ItemCate {...item} />
				</Col>
			))}
		</Row>
	);
};

export default ListCate;
