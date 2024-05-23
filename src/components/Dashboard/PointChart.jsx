"use client";
import { Line } from "@ant-design/plots";
import { Card, Col, DatePicker, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiPointReport } from "src/apis/apiEndpoint";
import { errorMessage, primaryColor } from "src/constants/common";
import { getDate } from "src/helper/format";

const PointChart = () => {
	const [data, setData] = useState([]);
	const [period, setPeriod] = useState();
	const [loading, setLoading] = useState(false);

	const pointConfig = {
		data,
		xField: "time",
		yField: "points",
		point: {
			shapeField: "circle",
			sizeField: 4,
			style: { stroke: primaryColor, fill: primaryColor },
		},
		tooltip: (d) => ({ name: "Points", color: primaryColor, value: d.points }),
		style: {
			lineWidth: 2,
			stroke: primaryColor,
		},
	};
	const objectConfig = {
		data,
		xField: "time",
		yField: "numOfObject",
		point: {
			shapeField: "circle",
			sizeField: 4,
			style: { stroke: primaryColor, fill: primaryColor },
		},
		tooltip: (d) => ({
			name: "Objects",
			color: primaryColor,
			value: d.numOfObject,
		}),
		style: {
			lineWidth: 2,
			stroke: primaryColor,
		},
	};

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				const response = await httpAuthGet({
					endpoint: apiPointReport,
					params: { startDate: period?.[0], endDate: period?.[1] },
				});
				const convertData =
					response?.data?.map((item) => ({
						...item,
						time: getDate(item?.date),
					})) || [];
				setData(convertData);
			} catch (error) {
				toast.error(error?.message || errorMessage);
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, [period]);

	return (
		<Spin spinning={loading}>
			<Row gutter={[16, 4]}>
				<Col span={24}>
					<DatePicker.RangePicker
						className="w-full"
						format="DD/MM/YYYY"
						onChange={setPeriod}
					/>
				</Col>
				<Col span={12}>
					<Card title="Point chart" size="small">
						<Line {...pointConfig} />
					</Card>
				</Col>
				<Col span={12}>
					<Card title="Object chart" size="small">
						<Line {...objectConfig} />
					</Card>
				</Col>
			</Row>
		</Spin>
	);
};

export default PointChart;
