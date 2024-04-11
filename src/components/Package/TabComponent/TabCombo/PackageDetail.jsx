import React, { useState } from "react";
import { Row, Col, Table, Button } from "antd";
import { Check } from "@mui/icons-material";
import Discount from "../../Common/Discount";

const iconCheck = <Check className="text-yellow3 mr-1" />;

const PackageDetail = ({ tableData, groupData, setCart }) => {
	const dataKeys = Object.keys(groupData);
	const [keySelected, setKeySelected] = useState(dataKeys[0]);
	const [rowSelected, setRowSelected] = useState(tableData[0]);
	const info = groupData[keySelected] || {};

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			setKeySelected(selectedRowKeys[0]);
			setRowSelected(selectedRows[0]);
		},
	};

	const onAdd = () => {
		setCart((prev) => ({
			...prev,
			[rowSelected?.name]: {
				title: `${rowSelected?.title} (${rowSelected?.amount}) `,
				type: rowSelected?.name,
				price: {
					discounted: Number(rowSelected?.totalPrice?.split(",").join("")),
				},
			},
		}));
	};

	const columns = [
		{
			key: "name",
			dataIndex: "name",
			title: "Tên gói",
			render: (value) => <strong>{value}</strong>,
		},
		{
			key: "price",
			dataIndex: "price",
			title: "Đơn giá (VNĐ)",
		},
		{
			key: "discount",
			dataIndex: "discount",
			title: "Chiết khấu",
		},
		{
			key: "totalPrice",
			dataIndex: "totalPrice",
			title: "Thành tiền (VNĐ)",
		},
		{
			key: "amount",
			dataIndex: "amount",
			title: "Số lượng",
		},
		{
			key: "action",
			dataIndex: "",
			render: (record) => (
				<Button
					type="primary"
					disabled={record.key !== keySelected}
					onClick={() => onAdd(record)}
				>
					Thêm
				</Button>
			),
		},
	];

	return (
		<Row gutter={30}>
			<Col span={15}>
				<Table
					rowSelection={{
						type: "radio",
						defaultSelectedRowKeys: [dataKeys[0]],
						...rowSelection,
					}}
					columns={columns}
					dataSource={tableData}
					pagination={false}
					bordered
				/>
			</Col>
			<Col span={9}>
				<div>
					<p className="font-semibold text-base">{info?.title}</p>
					<Discount amount={info?.discount} />
				</div>
				<div className="mt-5 text-[15px]">
					<strong className="">{info?.discounted}</strong>
					{info?.description?.map((item, i) => (
						<p key={i}>
							{iconCheck} {item}
						</p>
					))}
					<strong>ĐẶC BIỆT:</strong>
					{info?.special?.map((item, i) => (
						<p key={i}>
							{iconCheck} {item}
						</p>
					))}
				</div>
			</Col>
		</Row>
	);
};

export default PackageDetail;
