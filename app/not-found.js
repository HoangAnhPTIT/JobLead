import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
	const router = useRouter();
	return (
		<div className="mt-36 text-center">
			<h2 className="text-2xl">Trang không tồn tại!</h2>
			{/* <Button type="primary" onClick={() => router.back()} className="mt-10">
				Quay lại
			</Button> */}
		</div>
	);
};

export default NotFound;
