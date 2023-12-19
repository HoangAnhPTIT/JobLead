"use client";
import { Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { httpGet } from "src/apis/apiCaller";
import { apiGetEntities } from "src/apis/apiEndpoint";
import styles from "./styles.module.scss";

const staticEntities = [
	"Level",
	"TypeOfWork",
	"Salary",
	"WorkLocation",
	"Career",
	"Experience",

	"Gender",
];

const CreateJobContent = () => {
	const [form] = Form.useForm();
	const [optionValues, setOptionValues] = useState();

	const onSubmit = async () => {
		try {
			const values = await form.validateFields();
			console.log("values", values);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getOptionValues = async () => {
			try {
				Promise.all(
					staticEntities?.map(
						async (item) =>
							await httpGet(apiGetEntities, {
								entityType: item,
							})
					)
				).then((responses) => {
					responses?.forEach((element, i) => {
						element?.status === 200 &&
							setOptionValues((prev) => ({
								...prev,
								[staticEntities[i]]: element?.data,
							}));
					});
				});
			} catch (error) {
				console.error("getEntityError", error);
			}
		};
		getOptionValues();
	}, []);

	return (
		<Row gutter={16}>
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
									name="position"
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
								<Form.Item name="code" label="Mã số tuyển dụng">
									<Input size="large" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item name="amount" label="Số lượng tuyển dụng" required>
									<Input size="large" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item name="Level" label="Cấp bậc" required>
									<Select size="large">
										{optionValues?.Level?.map((item, i) => (
											<Select.Option key={i} value={item?.id}>
												{item?.name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="TypeOfWork"
									label="Loại hình công việc"
									required
								>
									<Select size="large">
										{optionValues?.TypeOfWork?.map((item, i) => (
											<Select.Option key={i} value={item?.id}>
												{item?.name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item name="Salary" label="Mức lương" required>
									<Select size="large">
										{optionValues?.Salary?.map((item, i) => (
											<Select.Option key={i} value={item?.id}>
												{item?.name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="WorkLocation"
									label="Địa điểm làm việc"
									required
								>
									<Select size="large">
										{optionValues?.WorkLocation?.map((item, i) => (
											<Select.Option key={i} value={item?.id}>
												{item?.name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item name="Career" label="Ngành nghề" required>
									<Select size="large">
										{optionValues?.Career?.map((item, i) => (
											<Select.Option key={i} value={item?.id}>
												{item?.name}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item
									name="description"
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
								<Form.Item name="benefit" label="Quyền lợi được hưởng" required>
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
							<Row>
								<Col span={24}>
									<Form.Item
										name="experienceId"
										label="Kinh nghiệm"
										required
									></Form.Item>
								</Col>
							</Row>
						</div>
					</div>
				</Form>
			</Col>
			<Col span={8}></Col>
		</Row>
	);
};

export default CreateJobContent;
