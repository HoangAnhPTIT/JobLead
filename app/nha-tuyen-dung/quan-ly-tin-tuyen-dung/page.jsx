"use client";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCompanyJobs } from "src/apis/apiEndpoint";
import SelectAntd from "src/commons/AntdForm/SelectAntd";
import EmployerBanner from "src/components/Employer/EmployerBanner";
import EmployerLayout from "src/components/Employer/EmployerLayout";
import { getDate } from "src/helper/format";

const PostListPage = () => {
	const [posts, setPosts] = useState();
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();

	const onSubmit = () => {
		console.log(form.getFieldsValue());
	};

	useEffect(() => {
		const getData = async () => {
			dispatch(updateLoading(true));
			const res = await httpAuthGet({ endpoint: apiCompanyJobs });
			if (res.status === 200) {
				setPosts(res.data);
			} else {
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
								{posts?.map((post, i) => (
									<div key={i} className="flex gap-5 border-b py-4">
										<div className="border border-primary rounded flex flex-col justify-center items-center p-4">
											<p className="text-2xl text-primary font-semibold">
												{post?.numOfApplication}
											</p>
											<p className="font-semibold text-base">Ứng viên</p>
										</div>
										<div>
											<h1 className="text-lg text-primary font-semibold three-dot">
												{post?.jobName}
											</h1>
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
												<span className="text-33 mr-1">{post?.numOfView}</span>
												<span>lượt xem</span>
											</p>
										</div>
									</div>
								))}
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		</EmployerLayout>
	);
};

export default PostListPage;
