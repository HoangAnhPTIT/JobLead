"use client";
import Link from "next/link";

const ItemCate = ({ title, amount, link }) => {
	return (
		<Link href={link}>
			<div className="flex gap-1">
				<div className="text-sm text-33 three-dot max-w-[calc(100%-70px)]">
					{title}
				</div>
				<div className="text-sm text-third"> ({amount})</div>
			</div>
		</Link>
	);
};

export default ItemCate;
