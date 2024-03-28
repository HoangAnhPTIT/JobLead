"use client";
import { Search } from "@mui/icons-material";
import { Button, Col, Form, Input, Row } from "antd";
import { useAppSelector } from "lib/hooks";
import React from "react";
import SelectAntd from "src/commons/AntdForm/SelectAntd";

const SearchBox = ({ setFilterData }) => {
	const { entities } = useAppSelector((state) => state.entity);
	const [form] = Form.useForm();

	const onSearch = () => {
		const values = form.getFieldsValue();
		setFilterData(values);
	};

	return (
		<div className="mt-5 p-5 bg-white">
			<Form form={form}>
				<Row gutter={[16, 8]}>
					<Col span={8}>
						<Form.Item name="q">
							<Input placeholder="Tiêu đề công việc" allowClear />
						</Form.Item>
					</Col>
					<Col span={8}>
						<SelectAntd
							form={Form}
							allowClear
							name="careerId"
							placeholder="Tất cả ngành nghề"
							list={entities?.Career}
						/>
					</Col>
					<Col span={8}>
						<SelectAntd
							form={Form}
							allowClear
							name="cityId"
							placeholder="Tất cả địa điểm"
							list={entities?.WorkLocation}
						/>
					</Col>
					<Col span={8}>
						<SelectAntd
							form={Form}
							allowClear
							name="degreeId"
							placeholder="Trình độ học vấn"
							list={entities?.Degree}
						/>
					</Col>
					<Col span={8}>
						<SelectAntd
							form={Form}
							allowClear
							name="levelId"
							placeholder="Cấp bậc mong muốn"
							list={entities?.Level}
						/>
					</Col>
					<Col span={8}>
						<SelectAntd
							form={Form}
							allowClear
							name="experienceId"
							placeholder="Số năm kinh nghiêm"
							list={entities?.Experience}
						/>
					</Col>
					<Col span={8}>
						<SelectAntd
							form={Form}
							allowClear
							name="typeOfWorkId"
							placeholder="Loại hình công việc"
							list={entities?.TypeOfWork}
						/>
					</Col>
					<Col span={8}>
						<SelectAntd
							form={Form}
							allowClear
							name="salaryId"
							placeholder="Mức lương"
							list={entities?.Salary}
						/>
					</Col>
					<Col span={8}>
						<SelectAntd
							form={Form}
							allowClear
							name="genderId"
							placeholder="Giới tính"
							list={entities?.Gender}
						/>
					</Col>
				</Row>
				<div className="text-right mt-2">
					<Button
						type="primary"
						icon={<Search fontSize="small" />}
						htmlType="submit"
						onClick={onSearch}
					>
						Tìm kiếm
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default SearchBox;
