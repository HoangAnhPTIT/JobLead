"use client";
import { Button } from "antd";
import { useEffect } from "react";

export default function Error({ error, reset }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="mt-36 text-center">
			<h2 className="text-2xl">Đã có lỗi xảy ra!</h2>
			<Button type="default" onClick={() => reset()} className="mt-10">
				Thử lại
			</Button>
		</div>
	);
}
