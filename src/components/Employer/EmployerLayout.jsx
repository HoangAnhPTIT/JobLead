"use client";
import { FileUpload } from "@mui/icons-material";
import { Avatar, Divider, Image } from "antd";
import { useAppSelector } from "lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCompanyInfo } from "src/apis/apiEndpoint";
import EmployerMenu from "src/components/Employer/Menu";
import { USER_ROLE } from "src/constants/common";
import routeMap from "src/constants/routeMap";

const SupportBanner = () => {
	const css = "text-primary font-semibold mx-2";
	return (
		<div className="p-3 border border-primary mb-5 text-center text-base text-33 bg-white">
			<div>
				<p>
					Quý khách đang sử dụng tài khoản MIỄN PHÍ bị giới hạn quyền lợi đăng
					tin.
				</p>
				<p>
					Hãy tham gia gói
					<span className={css}>Dịch vụ đăng tin</span>
					để tuyển dụng nhanh và hiệu quả với các quyền lợi hấp dẫn.
				</p>
			</div>
			<Divider className="!my-3" />
			<div>
				<p>
					Để được hỗ trợ, vui lòng liên hệ chuyên viên đang chăm sóc tài khoản
					của Quý khách
				</p>
				<p>
					CSKH:<span className={css}>Ms Thảo Nhi</span>- Email:
					<span className={css}>timviec247@gmail.com</span>- Hotline:
					<span className={css}>0123456789</span>
				</p>
			</div>
		</div>
	);
};

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
							<div
								className="bg-secondary text-white text-center p-2 cursor-pointer"
								onClick={() =>
									router.push(`${routeMap.employer}${routeMap.createJob}`)
								}
							>
								<p className="font-semibold text-[15px]">
									<FileUpload /> Đăng tin tuyển dụng
								</p>
								<i className="text-[13px]">Cách nhanh nhất để tìm ứng viên</i>
							</div>
							<div className="pt-3 text-center">
								{data?.avatar ? (
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
								) : (
									<Avatar size={100} shape="circle" />
								)}
								<p className="text-33 text-lg font-semibold">{data?.name}</p>
							</div>
							<div className="pt-2 px-6 text-99">
								<p className="flex justify-between">
									<span>
										Điểm: <strong className="text-secondary">{data?.point}</strong>
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
					<div>
						<SupportBanner />
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmployerLayout;
