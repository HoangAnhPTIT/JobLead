"use client";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet, httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateExpectation } from "src/apis/apiEndpoint";
import DatePickerAntd from "src/commons/AntdForm/DatePickerAntd";
import SelectAntd from "src/commons/AntdForm/SelectAntd";
import FileLayout from "src/components/Files/FileLayout";
import { errorMessage, primaryColor } from "src/constants/common";
import { getTimeValue } from "src/helper/format";

const JobSuggestionPage = () => {
	const { entities } = useAppSelector((state) => state.entity);
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();

	const [data, setData] = useState();

	const onSubmit = async () => {
		dispatch(updateLoading(true));
		try {
			const values = await form.validateFields();
			const response = await httpAuthPut({
				endpoint: apiCandidateExpectation,
				data: { id: data?.id, ...values },
			});
			if (response.status === 200) {
				toast.success("Cập nhật thông tin thành công");
			} else {
				toast.error(errorMessage);
				console.error(response.message);
			}
		} catch (error) {
			console.error(error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		const getData = async () => {
			const response = await httpAuthGet({ endpoint: apiCandidateExpectation });
			setData(response?.data);
			form.setFieldsValue({
				...response?.data,
				dob: getTimeValue(response?.data?.dob),
			});
		};
		getData();
	}, [form]);

	return (
		<FileLayout>
			<Row gutter={20}>
				<Col span={16}>
					<Form
						form={form}
						labelCol={{
							span: 7,
						}}
						wrapperCol={{
							span: 17,
						}}
						autoComplete="off"
						className="shadow !p-5 bg-white"
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
									name="englishLevelId"
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
						<Divider />
						<div>
							<div className="text-base text-primary font-semibold uppercase mb-5">
								Mong muốn của bạn
							</div>
							<div>
								<SelectAntd
									form={Form}
									name="careerIds"
									label="Ngành nghề"
									mode="multiple"
									rules={[{ required: true }]}
									list={entities?.Career}
								/>
								<SelectAntd
									form={Form}
									name="locationIds"
									label="Địa điểm làm việc"
									mode="multiple"
									rules={[{ required: true }]}
									list={entities?.City}
								/>
								<SelectAntd
									form={Form}
									name="typeOfWorkIds"
									label="Loại hình công việc"
									mode="multiple"
									rules={[{ required: true }]}
									list={entities?.TypeOfWork}
								/>
								<SelectAntd
									form={Form}
									name="salaryId"
									label="Mức lương mong muốn"
									rules={[{ required: true }]}
									list={entities?.Salary}
								/>
								<SelectAntd
									form={Form}
									name="levelId"
									label="Cấp bậc mong muốn"
									rules={[{ required: true }]}
									list={entities?.Level}
								/>
							</div>
						</div>
					</Form>
					<Button
						type="primary"
						onClick={onSubmit}
						color={primaryColor}
						className="mt-5 float-right"
					>
						Lưu thông tin
					</Button>
				</Col>
			</Row>
		</FileLayout>
	);
};

export default JobSuggestionPage;
