import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";

const Category = ({ title, icon, extra, children }) => {
	return (
		<div className="">
			<Row
				justify="space-between"
				align="middle"
				className="h-12 px-2.5 bg-primary text-white uppercase"
			>
				<Col>
					{icon} {title}
				</Col>
				<Col>
					<Link
						href={extra}
						className="text-white after:content-['\276F'] after:font-bold after:ml-1 "
					>
						Xem thêm
					</Link>
				</Col>
			</Row>
			{children}
		</div>
	);
};

export default Category;
