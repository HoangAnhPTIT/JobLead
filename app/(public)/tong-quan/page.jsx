"use client";
import { Col, Row } from "antd";
import Leads from "src/components/Dashboard/Leads";
import PointChart from "src/components/Dashboard/PointChart";

const DashboardPage = () => {
	return (
		<Row gutter={24}>
			<Col span={24} className="mb-5">
				<div className="flex justify-between items-center">
					<div className="text-textPrimary text-lg font-semibold">
						Welcome back!
					</div>
					{/* <div>
						<Button size="large" type="primary" icon={<FilterOutlined />}>
							Filters
						</Button>
					</div> */}
				</div>
			</Col>
			<Col span={24} className="mb-5">
				<PointChart />
			</Col>
			<Col span={24}>
				<Leads />
			</Col>
		</Row>
	);
};

export default DashboardPage;
