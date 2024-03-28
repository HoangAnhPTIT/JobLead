import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useAppSelector } from "lib/hooks";
import React from "react";

const LoadingComponent = ({ children }) => {
	const { isLoading } = useAppSelector((state) => state.loading);
	return (
		<Spin
			spinning={isLoading}
			indicator={<LoadingOutlined />}
			size="large"
			className="z-20"
		>
			{children}
		</Spin>
	);
};

export default LoadingComponent;
