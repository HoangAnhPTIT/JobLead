import { Col, Row } from "antd";
import React from "react";
import PotentialClients from "src/components/Dashboard/PotentialClients";

const DashboardPage = () => {
	return (
		<Row gutter={24}>
			<Col span={24}>
				<PotentialClients />
			</Col>
		</Row>
	);
};

export default DashboardPage;
