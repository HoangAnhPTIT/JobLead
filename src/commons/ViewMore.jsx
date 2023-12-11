import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { COMPONENT_SIZE } from "src/constants/common";

const sizeCss = {
	[COMPONENT_SIZE.SMALL]: "text-sm after:text-xs",
	[COMPONENT_SIZE.NORMAL]: "text-base after:text-sm",
};

function ViewMore({ href, size = COMPONENT_SIZE.NORMAL }) {
	return (
		<Link
			href={href}
			className={classNames([
				"text-primary after:content-['276F'] after:font-bold after:ml-1 after:text-xs",
				sizeCss[size],
			])}
		>
			Xem thêm
		</Link>
	);
}

export default ViewMore;
