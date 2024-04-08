import {
	BankOutlined,
	DownCircleOutlined,
	RightOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { EmailOutlined, PhoneOutlined } from "@mui/icons-material";
import { Collapse, Form, Input } from "antd";
import classNames from "classnames";
import { useState } from "react";
import { formatNumber } from "src/helper/format";
import styles from "./styles.module.scss";
import { isEmpty } from "lodash";

const Cart = ({ packages }) => {
	const [showBox, setShowBox] = useState(false);

	const userInfoItem = {
		key: 2,
		label: "Nhập thông tin khách hàng",
		children: (
			<div className="px-3">
				<Form>
					<Form.Item name="name">
						<Input
							prefix={<UserOutlined className="!text-lg !text-99 mr-1" />}
							placeholder="Người liên hệ"
						/>
					</Form.Item>
					<Form.Item name="phone">
						<Input
							prefix={<PhoneOutlined className="!text-lg !text-99 mr-1" />}
							placeholder="Số điện thoại"
						/>
					</Form.Item>
					<Form.Item name="email">
						<Input
							prefix={<EmailOutlined className="!text-lg !text-99 mr-1" />}
							placeholder="Email"
						/>
					</Form.Item>
					<Form.Item name="conpany">
						<Input
							prefix={<BankOutlined className="!text-lg !text-99 mr-1" />}
							placeholder="Tên công ty"
						/>
					</Form.Item>
					<Form.Item name="request">
						<Input.TextArea placeholder="Yêu cầu thêm" />
					</Form.Item>
				</Form>
			</div>
		),
	};

	const items = [
		{
			key: "1",
			label: <div className="">Gói dịch vụ đã chọn</div>,
			children: (
				<div>
					<div className="grid grid-cols-1 ">
						{isEmpty(packages) ? (
							<div className="px-5 py-3 text-99 text-lg">
								Bạn chưa thêm gói dịch vụ nào
							</div>
						) : (
							packages?.map((item, i) => (
								<div key={i} className="p-3 bg-[#f1f1f1]">
									<p>{item?.title}</p>
									<p>
										Giá:
										<span className="font-semibold ml-2">
											{formatNumber(item?.price)} đ
										</span>
									</p>
								</div>
							))
						)}
					</div>
					<div>
						<Collapse
							items={[userInfoItem]}
							rootClassName={styles.userInfo}
							className="!bg-white"
							bordered={false}
						/>
					</div>
					<div className="bg-bgContainer p-3 border-t-2">
						<span className="text-primary font-semibold mr-2">
							{packages?.length} gói:
						</span>
						<span className="text-secondary font-bold">
							{formatNumber(12345)} đ
						</span>
					</div>
				</div>
			),
		},
	];

	return (
		<div className={classNames("fixed right-5 bottom-0 z-10", styles.cartbox)}>
			<Collapse
				items={items}
				className="w-[300px] p-0"
				expandIconPosition="right"
				expandIcon={({ isActive }) => (
					<DownCircleOutlined
						rotate={isActive ? 0 : 180}
						className="!text-lg"
					/>
				)}
			/>
		</div>
	);
};

export default Cart;
