"use client";
import { Button, Col, DatePicker, Form, Grid, Input, Row, Select } from "antd";
import { useAppSelector } from "lib/hooks";
import React from "react";
import DatePickerAntd from "src/commons/AntdForm/DatePickerAntd";
import SelectAntd from "src/commons/AntdForm/SelectAntd";
import FileLayout from "src/components/Files/FileLayout";

const JobSuggestionPage = () => {
	const { entities } = useAppSelector((state) => state.entity);
	const [form] = Form.useForm();
	console.log("entities", entities);

	const onSubmit = async () => {
		try {
			const values = await form.validateFields();
			console.log("values", values);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<FileLayout>
			<Row gutter={20}>
				<Col span={16} className="shadow !p-5 bg-white">
					<Form
						form={form}
						labelCol={{
							span: 7,
						}}
						wrapperCol={{
							span: 17,
						}}
						autoComplete="off"
					>
						<div>
							<div className="text-base text-primary font-semibold uppercase mb-5">
								Thông tin cá nhân
							</div>
							<div>
								<Form.Item
									name="fullName"
									label="Họ và tên"
									rules={[{ required: true }]}
								>
									<Input size="large" />
								</Form.Item>
								<Form.Item
									name="email"
									label="Email liên hệ"
									rules={[{ required: true }]}
								>
									<Input size="large" />
								</Form.Item>
							</div>
						</div>
						<div>
							<div className="text-base text-primary font-semibold uppercase mb-5">
								Kinh nghiệm thực tế
							</div>
							<div>
								<SelectAntd
									form={Form}
									name="experienceId"
									label="Kinh nghiệm"
									rules={[{ required: true }]}
									list={entities?.Experience}
								/>
								<SelectAntd
									form={Form}
									name="degreeId"
									label="Trình độ học vấn"
									rules={[{ required: true }]}
									list={entities?.Degree}
								/>
								<SelectAntd
									form={Form}
									name="englishLevel"
									label="Trình độ tiếng anh"
									rules={[{ required: true }]}
									list={entities?.LanguageLevel}
								/>
								<DatePickerAntd
									form={Form}
									label="Ngày tháng năm sinh"
									name="dob"
									rules={[{ required: true }]}
								/>
								<SelectAntd
									form={Form}
									name="genderId"
									label="Giới tính"
									rules={[{ required: true }]}
									list={entities?.Gender?.filter(
										(item) => item.name === "Nam" || item.name === "Nữ"
									)}
								/>
								<SelectAntd
									form={Form}
									name="cityId"
									label="Thành phố đang sống"
									rules={[{ required: true }]}
									list={entities?.City}
								/>
							</div>
						</div>
					</Form>
				</Col>
				<Button type="primary" onClick={onSubmit}>
					Lưu
				</Button>
			</Row>
		</FileLayout>
	);
};

export default JobSuggestionPage;
