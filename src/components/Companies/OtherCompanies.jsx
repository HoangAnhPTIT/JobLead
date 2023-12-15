"use client";
import { ClusterOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Col, Flex, Image, Row } from "antd";
import Link from "next/link";
import React from "react";
import Category from "src/commons/Category";

const OtherCompanies = ({ items }) => {
	return (
		<div className="mt-8">
			<Category icon={<ClusterOutlined />} title="Các công ty khác">
				<Row
					gutter={[16, 16]}
					className="max-h-[calc(100vh-200px)] overflow-y-auto"
				>
					{items?.map((item, i) => (
						<Col span={12} key={i}>
							<Link href={item?.link}>
								<Flex gap={10} className="border-b p-2">
									<Image
										src={item?.avatar}
										alt={item?.name}
										width={60}
										preview={false}
									/>
									<div className="max-w-[calc(100%-80px)]">
										<div className="font-semibold text-33 text-sm mb-3">
											{item?.name}
										</div>
										<div className="text-xs three-dot text-primary">
											<EnvironmentOutlined className="mr-2" />
											<span className="text-99">{item?.location}</span>
										</div>
									</div>
								</Flex>
							</Link>
						</Col>
					))}
				</Row>
			</Category>
		</div>
	);
};

export default OtherCompanies;
