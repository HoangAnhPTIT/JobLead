"use client";
import { Col, Row } from "antd";
import EmployerMenu from "src/components/Employer/Menu";

const EmployerLayout = ({ children }) => {
	return (
		<div className="py-5 bg-bgBody">
			<Row gutter={20} className="w-content !mx-auto">
				<Col span={5}>
					<EmployerMenu />
				</Col>
				<Col span={19}>{children}</Col>
			</Row>
		</div>
	);
};

export default EmployerLayout;
