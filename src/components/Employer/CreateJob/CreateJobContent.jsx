"use client";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet, httpAuthPost, httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCompany, apiCompanyContact, apiJob } from "src/apis/apiEndpoint";
import DatePickerAntd from "src/commons/AntdForm/DatePickerAntd";
import SelectAntd from "src/commons/AntdForm/SelectAntd";
import ImageFull from "src/commons/Image";
import ApproveRule from "./ApproveRule";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import routeMap from "src/constants/routeMap";

const CreateJobContent = () => {
	const router = useRouter();
	const { entities } = useAppSelector((state) => state.entity);
	const [serviceList, setServiceList] = useState([]);
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const { id } = useParams();

	const onSubmit = async () => {
		dispatch(updateLoading(true));
		try {
			const values = await form.validateFields();
			const bodyData = {
				serviceIds: values.services || [],
				job: {
					...values?.jobInfo,
					numOfRecruitment: Number(values?.jobInfo?.numOfRecruitment || 0),
					jobRequirement: {
						...values?.jobRequirement,
						submitDeadline: dayjs(
							values?.jobRequirement?.submitDeadline
						).format("YYYY-MM-DD"),
					},
					contactInfo: values?.contactInfo,
				},
			};
			const response = id
				? await httpAuthPut({ endpoint: `${apiJob}/${id}`, data: bodyData })
				: await httpAuthPost({ endpoint: apiJob, data: bodyData });
			if (response?.status === 200) {
				toast.success(
					id
						? "Cập nhật tin tuyển dụng thành công"
						: "Đăng tin tuyển dụng thành công"
				);
				id
					? router.push(`${routeMap.employer}${routeMap.postList}`)
					: form.resetFields();
			}
		} catch (error) {
			console.error(error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		const getServices = async () => {
			const response = await httpAuthGet({
				endpoint: `${apiCompany}/services/available`,
			});
			response?.status === 200 && setServiceList(response?.data || []);
		};
		const getCompanyInfo = async () => {
			const response = await httpAuthGet({ endpoint: apiCompanyContact });
			response?.data && form.setFieldValue("contactInfo", response?.data);
		};
		getServices();
		!id && getCompanyInfo();
		form.setFieldValue("jobInfo", { isHasCommission: false });
	}, []);

	useEffect(() => {
		const getJobData = async () => {
			dispatch(updateLoading(true));
			try {
				const response = await httpAuthGet({
					endpoint: `${apiJob}/${id}`,
				});
				const data = response?.jobInfo;
				const formData = {
					jobInfo: {
						code: data?.code,
						name: data?.name,
						numOfRecruitment: data?.numOfRecruitment,
						levelId: data?.level?.id,
						isHasCommission: data?.isHasCommission,
						typeOfWorkId: data?.typeOfWork?.id,
						salaryId: data?.salary?.id,
						workLocationId: data?.workLocation?.id,
						careerId: data?.career?.id,
						description: data?.description,
						benifitDescription: data?.benifitDescription,
					},
					jobRequirement: {
						experienceId: data?.jobRequirement?.experience?.id,
						degreeId: data?.jobRequirement?.degree?.id,
						genderId: data?.jobRequirement?.gender?.id,
						submitDeadline: data?.jobRequirement?.submitDeadline
							? dayjs(data?.jobRequirement?.submitDeadline)
							: null,
						languageId: data?.jobRequirement?.language?.id,
						requestDescription: data?.jobRequirement?.requestDescription,
						requestDocumentAttachment:
							data?.jobRequirement?.requestDocumentAttachment,
					},
					contactInfo: data?.contactInfo,
				};
				form.setFieldsValue(formData);
			} catch {
				// empty
			} finally {
				dispatch(updateLoading(false));
			}
		};
		id && getJobData();
	}, [dispatch, form, id]);

	return (
		<div>
			<Row gutter={16}>
				<Col span={16}>
					<Form form={form} layout="vertical" className="w-full">
						<div className="p-5 bg-white">
							<div className="text-primary font-semibold uppercase">
								Thông tin công việc
							</div>
							<Row gutter={16} className="py-5">
								<Col span={24}>
									<Form.Item
										name={["jobInfo", "name"]}
										label="Vị trí tuyển dụng"
										// extra="(Lưu ý: Vị trí tuyển dụng sẽ không được chỉnh sửa sau khi tin tuyển dụng được duyệt)"
										required
									>
										<Input
											size="large"
											placeholder="VD: Nhân Viên Kinh Doanh, Trưởng Nhóm Marketing,..."
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item name={["jobInfo", "code"]} label="Mã số">
										<Input size="large" placeholder="Nhập mã số tuyển dụng" />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name={["jobInfo", "numOfRecruitment"]}
										label="Số lượng"
										rules={[{ required: true }]}
									>
										<Input size="large" placeholder="Số lượng tuyển dụng" />
									</Form.Item>
								</Col>
								<Col span={12}>
									<SelectAntd
										form={Form}
										name={["jobInfo", "levelId"]}
										size="large"
										label="Cấp bậc"
										placeholder="Chọn cấp bậc"
										list={entities?.Level}
										rules={[{ required: true }]}
									/>
								</Col>
								<Col span={12}>
									<SelectAntd
										form={Form}
										name={["jobInfo", "typeOfWorkId"]}
										size="large"
										label="Loại hình công việc"
										placeholder="Chọn loại hình công việc"
										list={entities?.TypeOfWork}
										rules={[{ required: true }]}
									/>
								</Col>
								<Col span={12}>
									<SelectAntd
										form={Form}
										name={["jobInfo", "salaryId"]}
										size="large"
										label="Mức lương"
										placeholder="Chọn mức lương"
										list={entities?.Salary}
										rules={[{ required: true }]}
									/>
								</Col>
								<Col span={12}>
									<Form.Item
										label=" "
										name={["jobInfo", "isHasCommission"]}
										valuePropName="checked"
									>
										<Checkbox>Phần trăm hoa hồng</Checkbox>
									</Form.Item>
								</Col>
								<Col span={12}>
									<SelectAntd
										form={Form}
										name={["jobInfo", "workLocationId"]}
										size="large"
										label="Địa điểm làm việc"
										placeholder="Chọn địa điểm làm việc"
										list={entities?.WorkLocation}
										rules={[{ required: true }]}
									/>
								</Col>
								<Col span={12}>
									<SelectAntd
										form={Form}
										name={["jobInfo", "careerId"]}
										size="large"
										label="Ngành nghề"
										placeholder="Chọn ngành nghề"
										list={entities?.Career}
										rules={[{ required: true }]}
									/>
								</Col>
								<Col span={24}>
									<Form.Item
										name={["jobInfo", "description"]}
										label="Mô tả công việc"
										rules={[{ required: true }]}
										extra={`(Lưu ý: Hãy mô tả chi tiết những đầu mục công việc để ứng
											viên có thể hiểu rõ hơn về yêu cầu của công ty bạn với vị
											trí này)`}
									>
										<Input.TextArea
											rows={10}
											placeholder={`Gợi ý:
- Nhận đơn hàng qua mail.
- Tìm kiếm khách hàng mới cho công ty, chăm sóc khách hàng cũ của công ty.
- Tìm kiếm khai thác khách hàng tiềm năng.
- Đàm phán, thương lượng và chốt hợp đồng với khách hàng.
- Kiểm tra và theo dõi tình hình thanh toán của khách hàng.
- Liên hệ khách hàng để làm đơn đặt hàng , giao hàng.
- Các công việc hành chính khác khi có yêu cầu từ ban lãnh đạo.
- Chi tiết trao đổi tại buổi phỏng vấn.`}
										/>
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										name={["jobInfo", "benifitDescription"]}
										label="Quyền lợi được hưởng"
										rules={[{ required: true }]}
										extra={`(Lưu ý: Hãy mô tả chi tiết những đầu mục công việc để ứng
											viên có thể hiểu rõ hơn về yêu cầu của công ty bạn với vị
											trí này)`}
									>
										<Input.TextArea
											rows={10}
											placeholder={`Gợi ý:
- Lương cứng: 7 triệu – 10 triệu VNĐ/tháng.
- Lương thưởng cạnh tranh đầy hấp dẫn.
- Thời gian làm việc Từ thứ 2 đến sáng thứ 7.
- Được làm việc trong môi trường trẻ trung, năng động, được đào tạo các kỹ năng...
- Tham gia du lịch, team building cùng với công ty.
- Được học hỏi kinh nghiệm, nâng cao trình độ chuyên môn.
- Được hưởng các chế độ theo quy định của luật lao động và công ty.`}
										/>
									</Form.Item>
								</Col>
							</Row>
						</div>
						<div className="p-5 mt-5 bg-white">
							<div className="uppercase text-primary font-semibold">
								Yêu cầu công việc
							</div>
							<div className="my-5">
								<Row gutter={16}>
									<Col span={24}>
										<SelectAntd
											form={Form}
											name={["jobRequirement", "experienceId"]}
											size="large"
											label="Kinh nghiệm"
											placeholder="Chọn kinh nghiệm"
											list={entities?.Experience}
											rules={[{ required: true }]}
										/>
									</Col>
									<Col span={12}>
										<SelectAntd
											form={Form}
											name={["jobRequirement", "degreeId"]}
											size="large"
											label="Bằng cấp"
											placeholder="Chọn bằng cấp"
											list={entities?.Degree}
											rules={[{ required: true }]}
										/>
									</Col>
									<Col span={12}>
										<SelectAntd
											form={Form}
											name={["jobRequirement", "genderId"]}
											size="large"
											label="Giới tính"
											placeholder="Chọn giới tính"
											list={entities?.Gender}
											rules={[{ required: true }]}
										/>
									</Col>
									<Col span={12}>
										<DatePickerAntd
											form={Form}
											label="Hạn nộp hồ sơ"
											placeholder="Chọn hạn nộp hồ sơ"
											name={["jobRequirement", "submitDeadline"]}
											rules={[{ required: true }]}
										/>
									</Col>
									<Col span={12}>
										<SelectAntd
											form={Form}
											name={["jobRequirement", "languageId"]}
											size="large"
											label="Ngôn ngữ hồ sơ"
											placeholder="Chọn ngôn ngữ hồ sơ"
											list={entities?.Language}
											rules={[{ required: true }]}
										/>
									</Col>
									<Col span={24}>
										<Form.Item
											name={["jobRequirement", "requestDescription"]}
											label="Yêu cầu công việc"
											rules={[{ required: true }]}
										>
											<Input.TextArea
												rows={8}
												placeholder={`Gợi ý:
- Có kinh nghiệm là một lợi thế.
- Nhanh nhẹn, trung thực, giao tiếp tốt. Có tinh thần hòa đồng, cầu tiến, chịu áp lực và có trách nhiệm trong công việc.
- Biết sử dụng kỹ năng văn phòng như: word, excel...
- Độ tuổi từ 18-35 tuổi.
- Chăm chỉ, cẩn thận và sức khỏe tốt.
- Giao tiếp tốt, năng động.`}
											/>
										</Form.Item>
									</Col>
									<Col span={24}>
										<Form.Item
											name={["jobRequirement", "requestDocumentAttachment"]}
											label="Yêu cầu hồ sơ"
										>
											<Input.TextArea
												rows={8}
												placeholder={`Gợi ý:
- Đơn xin việc hoặc CV xin việc.
- Sơ yếu lý lịch (có dán ảnh)
- Hộ khẩu.
- Chứng minh nhân dân.
- Giấy khám sức khỏe.
- Các bằng cấp có liên quan.`}
											/>
										</Form.Item>
									</Col>
								</Row>
							</div>
						</div>
						<div className="p-5 mt-5 bg-white">
							<div className="uppercase text-primary font-semibold">
								Thông tin liên hệ
							</div>
							<div className="my-5">
								<Row gutter={[16, 16]}>
									<Col span={24}>
										<Form.Item
											name={["contactInfo", "contact"]}
											label="Người liên hệ"
											rules={[{ required: true }]}
										>
											<Input
												size="large"
												placeholder="Nhập tên người liên hệ"
											/>
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item
											name={["contactInfo", "email"]}
											label="Email liên hệ"
											rules={[{ required: true }]}
										>
											<Input size="large" placeholder="Nhập địa chỉ email" />
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item
											name={["contactInfo", "phone"]}
											label="Số điện thoại liên hệ"
											rules={[{ required: true }]}
										>
											<Input size="large" placeholder="Nhập số điện thoại" />
										</Form.Item>
									</Col>
									<Col span={24}>
										<Form.Item
											name={["contactInfo", "workLocation"]}
											label="Địa điểm làm việc"
											rules={[{ required: true }]}
										>
											<Input size="large" placeholder="Nhập địa chỉ" />
										</Form.Item>
									</Col>
								</Row>
							</div>
						</div>
						<div className="p-5 mt-5 bg-white">
							<div className="uppercase text-primary font-semibold">
								Chọn services
							</div>
							<div className="my-5">
								<div className="w-full">
									<SelectAntd
										form={Form}
										name="services"
										size="large"
										label="Services"
										mode="multiple"
										placeholder="Chọn services"
										list={serviceList}
									/>
								</div>
							</div>
						</div>
						<div className="text-right mt-5">
							<Button type="primary" onClick={onSubmit}>
								{id ? "Cập nhật" : "Đăng tuyển"}
							</Button>
						</div>
					</Form>
				</Col>
				<Col span={8}>
					<ApproveRule />
					<ImageFull src="/kp2.jpg" alt="KPI" className="mt-5" />
				</Col>
			</Row>
		</div>
	);
};

export default CreateJobContent;
