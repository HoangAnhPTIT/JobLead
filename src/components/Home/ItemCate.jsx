"use client";
import { Flex } from "antd";
import Link from "next/link";

const ItemCate = ({ title, amount, link }) => {
	return (
		<Link href={link}>
			<Flex gap={4}>
				<div className="text-sm text-33 three-dot max-w-[calc(100%-70px)]">
					{title}
				</div>
				<div className="text-sm text-third"> ({amount})</div>
			</Flex>
		</Link>
	);
};

export default ItemCate;
