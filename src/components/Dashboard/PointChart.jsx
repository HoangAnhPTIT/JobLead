"use client";
import { Line } from "@ant-design/plots";
import { Card, Col, DatePicker, Row, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCompanyGetUsedPointChart } from "src/apis/apiEndpoint";
import { errorMessage, primaryColor } from "src/constants/common";
import { getDate } from "src/helper/format";

const PointChart = () => {
	const [data, setData] = useState([]);
	const [period, setPeriod] = useState([dayjs().add(-1, "month"), dayjs()]);
	const [loading, setLoading] = useState(false);

	const pointConfig = {
		data,
		xField: "time",
		yField: "usedPoint",
		point: {
			shapeField: "circle",
			sizeField: 4,
			style: { stroke: primaryColor, fill: primaryColor },
		},
		tooltip: (d) => ({ name: "Points", color: primaryColor, value: d.usedPoint }),
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
					endpoint: apiCompanyGetUsedPointChart,
					params: { startDate: period?.[0].format("YYYY-MM-DD"), endDate:  period?.[1].format("YYYY-MM-DD")},
				});

				if (response.data.lineWidth === 0) {
					setData([]);
					return;
				}

				const convertData =
					response?.data?.map((item) => ({
						...item,
						time: getDate(item?.createdDate),
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
						defaultValue={[dayjs().add(-1, "month"), dayjs()]}
					/>
				</Col>
				<Col span={24}>
					<Card title="Point chart" size="small">
						<Line {...pointConfig} />
					</Card>
				</Col>
			</Row>
		</Spin>
	);
};

export default PointChart;
