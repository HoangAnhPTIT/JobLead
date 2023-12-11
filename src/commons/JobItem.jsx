import { DollarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Col, Flex, Row } from "antd";
import classNames from "classnames";
import Image from "next/image";
import { COMPONENT_SIZE } from "src/constants/common";
import { JOB_PRIORITY } from "src/constants/job";

const padding = {
	[COMPONENT_SIZE.SMALL]: "p-1",
	[COMPONENT_SIZE.NORMAL]: "p-2",
	[COMPONENT_SIZE.LARGE]: "p-3",
};

const JobItem = ({ item, size, bordered = false, col = 1 }) => {
	return (
		<Col span={24 / col}>
			<div
				className={classNames(["rounded", padding[size], bordered && "border"])}
			>
				<Flex gap={12}>
					<Image
						src={item?.image}
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
						<div className="uppercase text-99 three-dot">
							{item?.companyName}
						</div>
						<Row className="text-primary">
							<Col span={14}>
								<DollarOutlined />
								<span className="text-55 ml-1 mr-3">{item?.price}</span>
							</Col>
							<Col span={10}>
								<EnvironmentOutlined />
								<span className="text-55 ml-1">{item?.location}</span>
							</Col>
						</Row>
					</div>
				</Flex>
			</div>
		</Col>
	);
};

export default JobItem;
