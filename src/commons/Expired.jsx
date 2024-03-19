"use client";
import dayjs from "dayjs";
import { useAppSelector } from "lib/hooks";
import React from "react";

const Expired = ({ time }) => {
	const { today } = useAppSelector((state) => state.time);
	return dayjs(time).isBefore(today) ? null : (
		<span className="ml-1 text-[11px] px-1 rounded text-white bg-secondary font-semibold">
			Đã hết hạn
		</span>
	);
};

export default Expired;
