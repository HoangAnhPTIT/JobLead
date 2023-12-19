"use client";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { httpGet } from "src/apis/apiCaller";
import { apiGetEntities } from "src/apis/apiEndpoint";

const commonSearch = [
	{ title: "Nhân viên bán hàng", link: "/sale" },
	{ title: "Việc làm Hà Nội", link: "/ha-noi" },
	{ title: "Việc làm Hồ Chí Minh", link: "/ho-chi-minh" },
	{ title: "Việc làm Đà Nẵng", link: "/da-nang" },
];

const { Option } = Select;

const HomeSearch = () => {
	const router = useRouter();
	const [form] = Form.useForm();
	const [searchOptions, setSearchOptions] = useState({});

	const onSubmit = () => {
		const values = form.getFieldsValue();
		router.push(
			`/search?q=${values.q}&major=${values.major}&locations=${values.locations}`
		);
	};

	useEffect(() => {
		const getOptionValues = async () => {
			try {
				const locationList = await httpGet(apiGetEntities, {
					entityType: "WorkLocation",
				});
				const majorList = await httpGet(apiGetEntities, {
					entityType: "TypeOfWork",
				});
				setSearchOptions({
					WorkLocation: locationList?.data,
					TypeOfWork: majorList?.data,
				});
			} catch (error) {
				console.error("getEntityError", error);
			}
		};
		getOptionValues();
	}, []);

	return (
		<div className={styles.search}>
			<h2 className="text-5xl text-center w-full text-white mb-30 font-bold">
				Công nghệ AI - đón đầu xu hướng tìm việc mới
				<br />
				<strong
					style={{
						color: "#0091ce",
						textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
					}}
				>
					Việc làm hấp dẫn
				</strong>{" "}
				dành cho bạn
			</h2>
			<Form form={form} onFinish={onSubmit}>
				<div
					className={classNames([
						"bg-f0Blur rounded-full mx-auto w-content p-3 z",
						styles.searchInput,
					])}
				>
					<Row gutter={16} className="!w-full">
						<Col span={8}>
							<Form.Item name="q" className="!m-0">
								<Input
									size="large"
									className="!rounded-full !px-6 !text-base"
									placeholder="Từ khóa, chức danh"
								/>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item name="major" className="!m-0">
								<Select size="large" placeholder="Ngành nghề">
									{searchOptions?.TypeOfWork?.map((item, i) => (
										<Option key={i} value={item?.id}>
											{item?.name}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item name="location" className="!m-0">
								<Select size="large" placeholder="Địa điểm">
									{searchOptions?.WorkLocation?.map((item, i) => (
										<Option key={i} value={item?.id}>
											{item?.name}
										</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col span={4}>
							<Button
								type="primary"
								htmlType="submit"
								size="large"
								className="w-full !rounded-full"
							>
								Tìm kiếm
							</Button>
						</Col>
					</Row>
				</div>
			</Form>
			<Space className="text-white mx-auto">
				<strong>Tìm kiếm phổ biến</strong>
				{commonSearch.map((item, i) => (
					<Link
						href={item.link}
						key={i}
						className={classNames(i === 0 ? "text-primary" : "text-white")}
					>
						{item.title}
					</Link>
				))}
			</Space>
		</div>
	);
};

export default HomeSearch;
