import classNames from "classnames";
import Link from "next/link";
import React from "react";

const Breadcrumb = ({ seperator = ">", items }) => {
	const isNotEnd = (index) => index !== items?.length - 1;

	return (
		<div className="w-full sm:w-smContent md:w-mdContent lg:w-lgContent xl:w-xlContent mx-auto py-3">
			{items?.map((item, i) => (
				<span
					key={i}
					className={classNames(isNotEnd(i) ? "text-99" : "text-black")}
				>
					{item?.href ? (
						<Link href={item?.href} className="hover:underline">
							{item?.title}
						</Link>
					) : (
						item?.title
					)}

					{isNotEnd(i) && <span className="mx-2">{seperator}</span>}
				</span>
			))}
		</div>
	);
};

export default Breadcrumb;
