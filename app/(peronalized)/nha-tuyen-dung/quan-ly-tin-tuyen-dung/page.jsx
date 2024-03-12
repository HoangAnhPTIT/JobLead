"use client";
import { Edit } from "@mui/icons-material";
import { Button, Card, Col, Form, Image, Input, Row } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { isEmpty } from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import {
	apiCompanyApplication,
	apiCompanyApplicationGeneralInfo,
	apiCompanyJobs,
} from "src/apis/apiEndpoint";
import SelectAntd from "src/commons/AntdForm/SelectAntd";
import EmployerBanner from "src/components/Employer/EmployerBanner";
import EmployerLayout from "src/components/Employer/EmployerLayout";
import { NO_DATA } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { getDate } from "src/helper/format";

const PostListPage = () => {
	const [posts, setPosts] = useState();
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const [userApply, setUserApply] = useState();
	const [statisical, setStatisical] = useState();
	const router = useRouter();

	const onSubmit = () => {
		console.log(form.getFieldsValue());
	};

	useEffect(() => {
		const getData = async () => {
			dispatch(updateLoading(true));
			const res = await httpAuthGet({ endpoint: apiCompanyJobs });
			const resUser = await httpAuthGet({
				endpoint: apiCompanyApplication,
				data: { paging: { size: 3, page: 1 } },
			});
			const resStatistical = await httpAuthGet({
				endpoint: apiCompanyApplicationGeneralInfo,
			});
			if (res?.status === 200) {
				setPosts(res.data);
			}
			if (resUser?.status === 200) {
				setUserApply(resUser.data?.application);
			}
			if (resStatistical?.status === 200) {
				setStatisical(resStatistical.data);
			}

			if (
				res?.status !== 200 ||
				resUser?.status !== 200 ||
				resStatistical?.status !== 200
			) {
				toast.error(res.message);
			}
			dispatch(updateLoading(false));
		};
		getData();
	}, []);

	return (
		<EmployerLayout>
			<div>
				<EmployerBanner />
				<div>
					<Form form={form}>
						<Row gutter={16}>
							<Col span={10}>
								<Form.Item name="q">
									<Input size="large" placeholder="Tiêu đề công việc" />
								</Form.Item>
							</Col>
							<Col span={10}>
								<SelectAntd
									form={Form}
									placeholder="Tất cả tuyển dụng"
									allowClear
									list={[]}
								/>
							</Col>
							<Col span={4}>
								<Button
									size="large"
									type="primary"
									onClick={onSubmit}
									htmlType="submit"
									className="w-full"
								>
									Tìm kiếm
								</Button>
							</Col>
						</Row>
					</Form>
					<Row gutter={16}>
						<Col span={15}>
							<Card
								title="Danh sách tin tuyển dụng đã đăng"
								bodyStyle={{ padding: "0 20px" }}
							>
								{isEmpty(posts) ? (
									<div className="py-4 text-center font-semibold">
										{NO_DATA}
									</div>
								) : (
									posts?.map((post, i) => (
										<div
											key={i}
											className="flex gap-5 border-b py-4 relative group"
										>
											<div className="border border-primary rounded flex flex-col justify-center items-center p-4">
												<p className="text-2xl text-primary font-semibold">
													{post?.numOfApplication}
												</p>
												<p className="font-semibold text-base">Ứng viên</p>
											</div>
											<div>
												<Link
													href={`${routeMap.job}${routeMap.detail}/${post?.jobId}`}
												>
													<h1 className="text-lg text-primary font-semibold three-dot">
														{post?.jobName}
													</h1>
												</Link>
												<p className="font-semibold text-base">
													<span className="text-66">Mức lương:</span>
													<span className="ml-1 text-33">{post?.salary}</span>
												</p>
												<p className="text-sm font-semibold text-99">
													<span>Số lượng:</span>
													<span className="ml-1 text-33">
														{post?.numOfRecruitment}
													</span>
													<span className="mx-1">-</span>
													<span>Hạn nộp:</span>
													<span className="ml-1 text-33">
														{getDate(post?.submitDeadline)}
													</span>
													<span className="mx-1">-</span>
													<span className="text-33 mr-1">
														{post?.numOfView}
													</span>
													<span>lượt xem</span>
												</p>
											</div>
											<div
												className="hidden top-5 right-2 group-hover:block absolute"
												onClick={() =>
													router.push(
														`${routeMap.employer}/${routeMap.createJob}/${routeMap.edit}/${post?.jobId}`
													)
												}
											>
												<Edit className="text-green-500 cursor-pointer" />
											</div>
										</div>
									))
								)}
							</Card>
						</Col>
						<Col span={9}>
							<div className="bg-white p-5 text-99 mb-5">
								<div>
									<p className="text-base font-semibold">ỨNG VIÊN</p>
									<div className="grid grid-cols-3 py-5 border-b">
										<div className="flex flex-col items-center">
											<div
												className="w-9 h-9 rounded-full font-semibold flex items-center justify-center text-base text-[#fea31e]"
												style={{ background: "rgba(254,163,30,.2)" }}
											>
												{statisical?.numOfApplyToday}
											</div>
											<p>Hôm nay</p>
										</div>
										<div className="flex flex-col items-center">
											<div
												className="w-9 h-9 rounded-full font-semibold flex items-center justify-center text-base text-[#01c0c8]"
												style={{ background: "rgba(1,192,200,.2)" }}
											>
												{statisical?.numOfApplyDayAgo}
											</div>
											<p>1 ngày trước</p>
										</div>
										<div className="flex flex-col items-center">
											<div
												className="w-9 h-9 rounded-full font-semibold flex items-center justify-center text-base text-[#00c292]"
												style={{ background: "rgba(0,194,146,.2)" }}
											>
												{statisical?.numOfApply2DaysAgo}
											</div>
											<p>2 ngày trước</p>
										</div>
									</div>
								</div>
								<div className="mt-5">
									<p className="text-base font-semibold">LƯỢT ỨNG TUYỂN</p>
									<div className="grid grid-cols-3 pt-5">
										<div className="flex flex-col items-center">
											<div
												className="w-9 h-9 rounded-full font-semibold flex items-center justify-center text-base text-[#859900]"
												style={{ background: "rgba(133,153,0,.2)" }}
											>
												{statisical?.numOfViewJob}
											</div>
											<p>Xem job</p>
										</div>
										<div className="flex flex-col items-center">
											<div
												className="w-9 h-9 rounded-full font-semibold flex items-center justify-center text-base text-[#fc2a63]"
												style={{ background: "rgba(252,42,99,.2)" }}
											>
												{statisical?.numOfApplication}
											</div>
											<p>Ứng tuyển</p>
										</div>
										<div className="flex flex-col items-center">
											<div
												className="w-9 h-9 rounded-full font-semibold flex items-center justify-center text-base text-[#ab8ce4]"
												style={{ background: "rgba(171,140,228,.2)" }}
											>
												{statisical?.numOfSaveCandidate}
											</div>
											<p>Cv template</p>
										</div>
									</div>
								</div>
							</div>
							<Card
								title="Ứng viên mới apply gần đây"
								bodyStyle={{ padding: "0" }}
							>
								{isEmpty(userApply) ? (
									<div className="py-4 text-center">{NO_DATA}</div>
								) : (
									userApply?.map((item, i) => (
										<Link
											href={`${routeMap.candidate}${routeMap.detail}/${item?.candidate?.candidateId}`}
											key={i}
										>
											<div
												className="flex gap-3 p-3 w-full border-b hover:bg-blue2"
												key={i}
											>
												<div className="w-[40px]">
													<Image
														preview={false}
														src={item?.candidate?.avatar}
														width={40}
														height={40}
														alt=""
														className="object-cover rounded-full"
													/>
												</div>
												<div className="w-[calc(100%-60px)]">
													<p className="text-lg text-primary three-dot">
														{item?.candidate?.name}
													</p>
													<p className="text-base text-99 three-dot">
														{item?.job?.title}
													</p>
												</div>
											</div>
										</Link>
									))
								)}
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		</EmployerLayout>
	);
};

export default PostListPage;
