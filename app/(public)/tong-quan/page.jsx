import { Col, Row } from "antd";
import Leads from "src/components/Dashboard/Leads";

const DashboardPage = () => {
	return (
		<Row gutter={24}>
			<Col span={24}>
				<Leads />
			</Col>
		</Row>
	);
};

export default DashboardPage;
