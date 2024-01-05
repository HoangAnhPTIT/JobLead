"use client";
import classNames from "classnames";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { imageError } from "src/constants/common";

const JobSticky = ({ data }) => {
	const [showSticky, setShowSticky] = useState(false);

	useEffect(() => {
		const watchScrollY = () => {
			const scrollY = document.documentElement.scrollTop;
			setShowSticky(scrollY > 200);
		};

		window && window?.addEventListener("scroll", watchScrollY);
		return () => {
			window?.removeEventListener("scroll", watchScrollY);
		};
	}, []);

	return (
		<div
			className={classNames(
				[
					"h-[85px] w-screen bg-white fixed left-0 transition-all duration-700 z-20",
				],
				showSticky ? "top-0" : "-top-[86px]"
			)}
			style={{ boxShadow: "0 0 5px rgba(0,0,0,.3)" }}
		>
			<div className="w-lgContent mx-auto flex gap-10 items-center h-full">
				<Image
					src={data?.company?.avatar || imageError}
					alt={data?.company?.name || ""}
					width={65}
					height={65}
				/>
				<div className="text-33">
					<div className="text-xl font-semibold mb-1">{data?.name}</div>
					<div className="text-sm">{data?.company?.name}</div>
				</div>
			</div>
		</div>
	);
};

export default JobSticky;
