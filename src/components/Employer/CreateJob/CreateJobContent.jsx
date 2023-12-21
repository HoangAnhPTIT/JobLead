"use client";
import { Button, Col, DatePicker, Form, Image, Input, Row, Select } from "antd";
import styles from "./styles.module.scss";
import ApproveRule from "./ApproveRule";
import useEntities from "src/hooks/useEntities";

const CreateJobContent = () => {
	const [form] = Form.useForm();
	const entities = useEntities();

	const onSubmit = async () => {
		try {
			const values = await form.validateFields();
			console.log("values", values);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Row gutter={20}>
			<Col span={16}>
				<Form
					form={form}
					layout="vertical"
					onFinish={onSubmit}
					className="w-full"
					rootClassName={styles.createJob}
				>
					<div className="p-5 bg-white">
						<div className="text-primary font-semibold uppercase">
							Thông tin công việc
						</div>
						<Row gutter={16}>
							<Col span={24}>
								<Form.Item
									name={["jobInfo", "position"]}
									label="Vị trí tuyển dụng"
									extra="(Lưu ý: Vị trí tuyển dụng sẽ không được chỉnh sửa sau khi tin tuyển dụng được duyệt)"
									required
								>
									<Input
										size="large"
										placeholder="VD: Nhân viên kinh doanh, Trưởng nhóm Marketing..."
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item name={["jobInfo", "code"]} label="Mã số tuyển dụng">
									<Input size="large" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name={["jobInfo", "amount"]}
									label="Số lượng tuyển dụng"
									required
								>
									<Input size="large" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name={["jobInfo", "levelId"]}
									label="Cấp bậc"
									required
								>
									<Select size="large">
										{entities?.Level?.map((item, i) => (
											<Select.Option key={i} value={item?.id}>
												{item?.name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name={["jobInfo", "typeOfWorkId"]}
									label="Loại hình công việc"
									required
								>
									<Select size="large">
										{entities?.TypeOfWork?.map((item, i) => (
											<Select.Option key={i} value={item?.id}>
												{item?.name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name={["jobInfo", "salaryId"]}
									label="Mức lương"
									required
								>
									<Select size="large">
										{entities?.Salary?.map((item, i) => (
											<Select.Option key={i} value={item?.id}>
												{item?.name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name={["jobInfo", "workLocationId"]}
									label="Địa điểm làm việc"
									required
								>
									<Select size="large">
										{entities?.WorkLocation?.map((item, i) => (
											<Select.Option key={i} value={item?.id}>
												{item?.name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name={["jobInfo", "careerId"]}
									label="Ngành nghề"
									required
								>
									<Select size="large">
										{entities?.Career?.map((item, i) => (
											<Select.Option key={i} value={item?.id}>
												{item?.name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item
									name={["jobInfo", "description"]}
									label="Mô tả công việc"
									required
									extra={
										"(Lưu ý: Hãy mô tả chi tiết những đầu mục công việc để ứng viên có thể hiểu rõ hơn về yêu cầu của công ty bạn với vị trí này)"
									}
								>
									<Input.TextArea
										rows={12}
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
									name={["jobInfo", "benefit"]}
									label="Quyền lợi được hưởng"
									required
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
						<div>
							<Row gutter={16}>
								<Col span={24}>
									<Form.Item
										name={["jobRequirement", "experienceId"]}
										label="Kinh nghiệm"
										required
									>
										<Select size="large">
											{entities?.Experience?.map((item, i) => (
												<Select.Option key={i} value={item?.id}>
													{item?.name}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name={["jobRequirement", "degreeId"]}
										label="Bằng cấp"
										required
									>
										<Select size="large">
											{entities?.Degree?.map((item, i) => (
												<Select.Option key={i} value={item?.id}>
													{item?.name}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name={["jobRequirement", "genderId"]}
										label="Giới tính"
										required
									>
										<Select size="large">
											{entities?.Gender?.map((item, i) => (
												<Select.Option key={i} value={item?.id}>
													{item?.name}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name={["jobRequirement", "expireDate"]}
										label="Hạn nộp hồ sơ"
										required
									>
										<DatePicker size="large" className="w-full" />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name={["jobRequirement", "languageId"]}
										label="Ngôn ngữ hồ sơ"
										required
									>
										<Select size="large">
											{entities?.Language?.map((item, i) => (
												<Select.Option key={i} value={item?.id}>
													{item?.name}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										name={["jobRequirement", "jobRequirement"]}
										label="Yêu cầu công việc"
										required
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
										name={["jobRequirement", "cvRequirement"]}
										label="Yêu cầu hồ sơ"
										required
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
						<div>
							<Row gutter={16}>
								<Col span={24}>
									<Form.Item
										name={["contact", "fullname"]}
										label="Người liên hệ"
										required
									>
										<Input size="large" />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name={["contact", "email"]}
										label="Email liên hệ"
										required
									>
										<Input size="large" />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name={["contact", "phone"]}
										label="Số điện thoại liên hệ"
										required
									>
										<Input size="large" />
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										name={["contact", "address"]}
										label="Địa điểm làm việc"
										required
									>
										<Input size="large" />
									</Form.Item>
								</Col>
							</Row>
						</div>
					</div>
					<div className="text-right">
						<Button
							type="primary"
							onClick={onSubmit}
							className="mt-5 bg-primary"
						>
							Đăng tuyển
						</Button>
					</div>
				</Form>
			</Col>
			<Col span={8}>
				<ApproveRule />
				<Image
					src="/kp2.jpg"
					alt="KPI"
					width="100%"
					preview={false}
					className="mt-5"
				/>
			</Col>
		</Row>
	);
};

export default CreateJobContent;
