import {
	CalendarOutlined,
	DollarOutlined,
	EnvironmentOutlined,
} from "@ant-design/icons";
import { Col, Flex, Row } from "antd";
import classNames from "classnames";
import Image from "next/image";
import { JOB_PRIORITY } from "src/constants/job";

const JobItem = ({ item, showExpire = false }) => {
	return (
		<Flex gap={12}>
			<Image
				src={item?.avatar}
				width={60}
				height={60}
				alt={item?.companyName}
			/>
			<div className="text-sm w-[calc(100%-72px)]">
				<div
					className={classNames([
						"three-dot font-bold",
						item?.type === JOB_PRIORITY.HOT ? "text-secondary" : "text-55",
					])}
				>
					{item?.type === JOB_PRIORITY.URGENT && (
						<i className="text-secondary ">(Gấp) </i>
					)}
					<span>{item?.jobName}</span>
				</div>
				<div className="uppercase text-99 three-dot">{item?.companyName}</div>
				<Row className="text-primary">
					<Col span={!showExpire ? 14 : 8}>
						<DollarOutlined />
						<span className="text-55 ml-1 mr-3">{item?.price}</span>
					</Col>
					<Col span={!showExpire ? 10 : 8}>
						<EnvironmentOutlined />
						<span className="text-55 ml-1">{item?.location}</span>
					</Col>
					{showExpire && (
						<Col span={8}>
							<CalendarOutlined />
							<span className="text-55 ml-1">{item?.expireDate}</span>
						</Col>
					)}
				</Row>
			</div>
		</Flex>
	);
};

export default JobItem;
