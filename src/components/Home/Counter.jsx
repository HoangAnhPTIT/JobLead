import React from "react";
import styles from "./styles.module.scss";
import {
	ApartmentOutlined,
	FileTextOutlined,
	UserOutlined,
	UsergroupAddOutlined,
} from "@ant-design/icons";
import { Col, Row, Statistic } from "antd";
import classNames from "classnames";
import { formatNumber } from "src/helper/format";

const counts = [
	{
		title: "Ứng viên",
		amount: 1485111,
		icon: <UserOutlined className="text-3xl" style={{ color: "#fff" }} />,
	},
	{
		title: "Việc làm",
		amount: 1485111,
		icon: <ApartmentOutlined className="text-3xl" style={{ color: "#fff" }} />,
	},
	{
		title: "Nhà tuyển dụng",
		amount: 1485111,
		icon: (
			<UsergroupAddOutlined className="text-3xl" style={{ color: "#fff" }} />
		),
	},
	{
		title: "Lượt ứng tuyển",
		amount: 1485111,
		icon: <FileTextOutlined className="text-3xl" style={{ color: "#fff" }} />,
	},
];

const Counter = () => {
	return (
		<div className={classNames([styles.counter, "flex"])}>
			<Row className="w-content m-auto">
				{counts?.map((item, i) => (
					<Col span={6} className="text-center" key={i}>
						<div>{item?.icon}</div>
						<div className="text-yellow1 text-5xl font-semibold my-2">
							{formatNumber(item?.amount)}
						</div>
						<div className="text-white">{item?.title}</div>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default Counter;
