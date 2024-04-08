import {
	BankOutlined,
	CloseCircleOutlined,
	DownCircleOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { EmailOutlined, PhoneOutlined } from "@mui/icons-material";
import { Button, Collapse, Form, Input } from "antd";
import classNames from "classnames";
import { isEmpty } from "lodash";
import { formatNumber } from "src/helper/format";
import styles from "./styles.module.scss";

const Cart = ({ cart, setCart }) => {
	const packages = Object.values(cart);

	const totalPrice =
		packages?.reduce((price, item) => price + item?.price?.discounted, 0) || 0;

	const onRemove = (type) => {
		const newCart = { ...cart };
		delete newCart[type];
		setCart(newCart);
	};

	const userInfoItem = {
		key: 2,
		label: "Nhập thông tin khách hàng",
		children: (
			<div className="">
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
			label: (
				<div className="">
					Gói dịch vụ đã chọn
					<span className="text-white rounded-full bg-yellow3 font-semibold ml-1 px-1.5">
						{packages?.length}
					</span>
				</div>
			),
			children: (
				<div>
					<div className="grid grid-cols-1 p-3 gap-3 max-h-[400px] overflow-y-auto">
						{isEmpty(packages) ? (
							<div className="text-99 text-lg">
								Bạn chưa thêm gói dịch vụ nào
							</div>
						) : (
							packages?.map((item, i) => (
								<div
									key={i}
									className="p-3 pr-6 bg-[#f1f1f1] relative text-[15px]"
								>
									<p>{item?.title}</p>
									<p>
										Giá:
										<span className="font-semibold ml-1">
											{formatNumber(item?.price?.discounted)} đ
										</span>
									</p>
									<CloseCircleOutlined
										className="absolute right-2 top-2 !text-secondary"
										fontSize="12"
										onClick={() => onRemove(item?.type)}
									/>
								</div>
							))
						)}
					</div>
					<div className="border-t mx-3">
						<Collapse
							items={[userInfoItem]}
							rootClassName={styles.userInfo}
							className="!bg-white"
							bordered={false}
						/>
					</div>
					<div className="bg-bgContainer px-3 py-2.5   border-t-2 flex justify-between items-center">
						<div>
							<span className="text-primary font-semibold mr-1">
								{packages?.length} gói:
							</span>
							<span className="text-[#e50303] font-bold">
								{formatNumber(totalPrice)} đ
							</span>
						</div>
						<div>
							<Button
								type="primary"
								danger
								className="!font-semibold !bg-secondary"
							>
								Mua ngay
							</Button>
						</div>
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
