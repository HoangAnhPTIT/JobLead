import { DollarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Col, Flex, Row } from "antd";
import classNames from "classnames";
import Image from "next/image";
import { JOB_PRIORITY } from "src/constants/job";

const JobItemList = ({ item }) => {
	return (
		<div className={classNames(["pl-2 py-1"])}>
			<Flex gap={12}>
				<Image
					src={item?.avatar}
					width={45}
					height={45}
					alt={item?.companyName}
				/>
				<div className="text-sm w-[175px]">
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
					<Row className="text-primary">
						<Col span={14}>
							<DollarOutlined className="text-xs" />
							<span className="text-55 ml-1 mr-3 text-xs">{item?.price}</span>
						</Col>
						<Col span={10}>
							<EnvironmentOutlined className="text-xs" />
							<span className="text-55 ml-1 text-xs">{item?.location}</span>
						</Col>
					</Row>
				</div>
			</Flex>
		</div>
	);
};

export default JobItemList;
