"use client";
import { FileUpload } from "@mui/icons-material";
import { Avatar, Image } from "antd";
import { useAppSelector } from "lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCompanyInfo } from "src/apis/apiEndpoint";
import EmployerMenu from "src/components/Employer/Menu";
import { USER_ROLE } from "src/constants/common";

const EmployerLayout = ({ children }) => {
	const router = useRouter();
	const { userInfo } = useAppSelector((state) => state.user);
	const [data, setData] = useState(null);

	useEffect(() => {
		if (userInfo?.role !== USER_ROLE.employer) {
			router.push("/");
		}
		const getData = async () => {
			const response = await httpAuthGet({ endpoint: apiCompanyInfo });
			setData(response?.company);
		};
		getData();
	}, [router, userInfo]);

	return (
		<div className="py-5 bg-bgEmployer min-h-[calc(100vh-64px)]">
			<div className="w-xlContent !mx-auto">
				<div className="grid gap-5" style={{ gridTemplateColumns: "20% 80%" }}>
					<div>
						<div className="pb-5 bg-white">
							<div className="bg-secondary text-white text-center p-2">
								<p className="font-semibold text-[15px]">
									<FileUpload /> Đăng tin tuyển dụng
								</p>
								<i className="text-[13px]">Cách nhanh nhất để tìm ứng viên</i>
							</div>
							<div className="pt-3 text-center">
								<Avatar
									size={100}
									src={
										<Image
											src={data?.avatar}
											alt={data?.name}
											preview={false}
										/>
									}
									shape="circle"
								/>
								<p className="text-33 text-lg font-semibold">{data?.name}</p>
							</div>
							<div className="pt-2 px-8 text-99">
								<p>
									<span className="mr-5">
										Điểm: <strong className="text-secondary">0</strong>
									</span>
									<span className="mr-5">
										Điểm tặng: <strong className="text-secondary">0</strong>
									</span>
								</p>
								<span>
									Số lượng xem CV: <strong className="text-secondary">0</strong>
								</span>
							</div>
						</div>
						<EmployerMenu />
					</div>
					<div>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default EmployerLayout;
