"use client";
import { Col, Row } from "antd";

const contacts = [
	{
		title: "Thông tin hỗ trợ cho ứng viên",
		phone: "0123 456 789",
		email: "abc@abc.com",
	},
	{
		title: "Thông tin hỗ trợ cho doanh nghiệp",
		phone: "0123 456 789",
		email: "abc@abc.com",
	},
];

const ContactInfo = () => {
	return (
		<div className="text-center">
			<div className="text-lg bg-primary text-white p-2">THÔNG TIN LIÊN HỆ</div>
			<Row className="bg-white py-4 px-2">
				{contacts?.map((item, i) => (
					<Col span={12} key={i}>
						<div className="font-bold">{item?.title}:</div>
						<div>
							Hotline: <span className="text-primary">{item?.phone}</span>
						</div>
						<div>
							Email: <span>{item?.email}</span>
						</div>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default ContactInfo;
