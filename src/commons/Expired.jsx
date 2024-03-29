"use client";
import dayjs from "dayjs";
import { useAppSelector } from "lib/hooks";
import React from "react";

const Expired = ({ time }) => {
	const { today } = useAppSelector((state) => state.time);

	return dayjs(time).isBefore(dayjs(today)) ? (
		<span className="ml-1 text-[11px] px-1 rounded text-white bg-secondary font-semibold">
			Đã hết hạn
		</span>
	) : null;
};

export default Expired;
