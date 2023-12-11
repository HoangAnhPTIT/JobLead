import { Col, Row } from "antd";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { COMPONENT_LAYOUT } from "src/constants/common";

const Category = ({
	title,
	icon,
	extra,
	layout = COMPONENT_LAYOUT.horizolical,
	contentClass,
	children,
}) => {
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
				{layout === COMPONENT_LAYOUT.horizolical && (
					<Col>
						<Link
							href={extra}
							className="text-white after:content-['\276F'] after:font-bold after:ml-1 "
						>
							Xem thêm
						</Link>
					</Col>
				)}
			</Row>
			<div
				className={classNames([
					"border border-f0 p-3 pb-0 bg-white",
					contentClass,
				])}
			>
				{children}
				{layout === COMPONENT_LAYOUT.vertical && (
					<div className="text-right px-2 py-1">
						<Link
							href={extra}
							className="text-sm text-primary after:content-['\276F'] after:font-bold after:ml-1 after:text-xs"
						>
							Xem thêm
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Category;
