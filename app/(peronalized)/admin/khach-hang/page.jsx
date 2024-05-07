"use client";
import { Button, Col, Form, Input, Row, Spin, TreeSelect } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet, httpAuthPost } from "src/apis/apiAuthCaller";
import { apiCategory, apiCustomer } from "src/apis/apiEndpoint";
import { errorMessage } from "src/constants/common";

const CustomerPage = () => {
	const [form] = Form.useForm();
	const [categories, setCategories] = useState();
	const [loading, setLoading] = useState(false);

	const onAdd = async () => {
		setLoading(true);
		try {
			const values = await form.validateFields();
			const response = httpAuthPost({ endpoint: apiCustomer, data: values });
			if (response?.status === 200) {
				toast.success("Thêm khách hàng thành công");
				form.resetFields();
			} else {
				toast.error(response?.message);
			}
		} catch (error) {
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			const categoryResponse = await httpAuthGet({ endpoint: apiCategory });
			setCategories(categoryResponse?.data);
			setLoading(false);
		};
		getData();
	}, []);

	return (
		<Spin spinning={loading}>
			<div className="bg-white p-6">
				<div className="text-black text-xl">Thêm khách hàng</div>
				<div className="mt-5 p-5 border rounded">
					<Form form={form} layout="vertical" autoComplete="off">
						<Row gutter={32}>
							<Col span={24}>
								<Form.Item
									label="Phân loại"
									name="categoryId"
									rules={[{ required: true }]}
								>
									<TreeSelect
										showSearch
										allowClear
										treeNodeFilterProp="name"
										dropdownStyle={{
											maxHeight: 400,
											overflow: "auto",
										}}
										treeData={categories}
										fieldNames={{
											label: "name",
											value: "id",
										}}
									/>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Họ tên"
									name="name"
									rules={[{ required: true }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="Tuổi" name="age" rules={[{ required: true }]}>
									<Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Số điện thoại"
									name="phone"
									rules={[{ required: true }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Email"
									name="email"
									rules={[{ required: true }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Số nhà/Đường"
									name="street"
									rules={[{ required: true }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Địa chỉ"
									name="address"
									rules={[{ required: true }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item label="Mô tả" name="description">
									<Input.TextArea />
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item label="MetaData" name="metaData">
									<Input.TextArea />
								</Form.Item>
							</Col>
						</Row>
						<div className="mt-3 text-right">
							<Button type="primary" onClick={onAdd}>
								Thêm khách hàng
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</Spin>
	);
};

export default CustomerPage;
