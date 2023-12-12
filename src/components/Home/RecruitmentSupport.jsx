import { CustomerServiceFilled } from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";

const supporters = [
	{ name: "John", phone: "123 2324 3434" },
	{ name: "John", phone: "123 2324 3434" },
	{ name: "John", phone: "123 2324 3434" },
	{ name: "John", phone: "123 2324 3434" },
	{ name: "John", phone: "123 2324 3434" },
	{ name: "John", phone: "123 2324 3434" },
	{ name: "John", phone: "123 2324 3434" },
];

const RecruitmentSupport = () => {
	return (
		<div className="bg-bgPhone py-3 px-6">
			<div>
				<CustomerServiceFilled className="text-lg" />
				<span className="text-33 text-lg font-bold ml-2">
					Hotline hỗ trợ nhà tuyển dụng
				</span>
			</div>
			<Row gutter={10} className="py-2">
				{supporters?.map((item, i) => (
					<Col span={8} key={i}>
						<Row gutter={4} className="text-sm">
							<Col span={11} className="font-bold text-red1">
								{item?.phone}
							</Col>
							<Col span={12}>{item?.name}</Col>
						</Row>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default RecruitmentSupport;
