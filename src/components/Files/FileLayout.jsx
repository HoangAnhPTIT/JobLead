"use client";
import { Avatar, Image } from "antd";
import { useAppSelector } from "lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCandidate } from "src/apis/apiEndpoint";
import LoadingComponent from "src/commons/LoadingComponent";
import { USER_ROLE } from "src/constants/common";
import FileMenu from "./Menu";

const FileLayout = ({ children }) => {
	const router = useRouter();
	const { userInfo } = useAppSelector((state) => state.user);
	const [data, setData] = useState(null);

	useEffect(() => {
		if (userInfo?.role !== USER_ROLE.candidate) {
			router.push("/");
		}
		const getData = async () => {
			const response = await httpAuthGet({ endpoint: apiCandidate });
			setData(response?.data);
		};
		getData();
	}, [router, userInfo]);

	return (
		<div className="py-5 bg-bgBody min-h-[calc(100vh-64px)]">
			<div className="w-xlContent !mx-auto">
				<div className="grid gap-5" style={{ gridTemplateColumns: "20% 80%" }}>
					<div>
						<div className="bg-white pt-5 pb-0 text-center">
							<Avatar
								size={100}
								src={
									<Image
										src={data?.avatar}
										alt={data?.fullName}
										preview={false}
									/>
								}
								shape="circle"
							/>
							<p className="text-33 text-lg font-semibold pb-5">
								{data?.fullName}
							</p>
						</div>
						<FileMenu />
					</div>
					<div>
						<LoadingComponent>{children}</LoadingComponent>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FileLayout;
