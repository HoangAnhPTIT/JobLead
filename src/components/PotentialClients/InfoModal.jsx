import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Spin } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { httpAuthPost } from "src/apis/apiAuthCaller";
import { apiCompanyPurchaseLead, apiCompanyPrebuy } from "src/apis/apiEndpoint";
import { BUY_MODE, BUY_OBJECT_TYPE } from "src/constants/buyObjectType";
import { errorMessage } from "src/constants/common";
import { POINT_DEFINE } from "src/constants/pointDefine";

const infoDetail = (info) => info || "__";

const ItemInfo = ({ label, value }) => {
	return (
		<Row gutter={16} className="my-1 border-b">
			<Col span={8}>{label}</Col>
			<Col span={16}>
				<span className="text-base">{infoDetail(value)}</span>
			</Col>
		</Row>
	);
};

const InfoModal = ({
	itemSelected,
	setItemSelected,
	loading,
	setLoading,
	reload,
}) => {
	const [modal, contextHolder] = Modal.useModal();

	const onBuyInfo = async () => {
		setLoading(true);
		try {
			const response = await httpAuthPost({
				endpoint: apiCompanyPurchaseLead +"/" + itemSelected?.id,
			});
			if (response?.status === 200) {
				toast.success("Mua thông tin thành công");
				setItemSelected(response?.data);
				reload();
			} else {
				toast.error(response?.message);
			}
		} catch {
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const onConfirmBuy = async () => {
		try {
			modal.confirm({
				title: "Xác nhận mua thông tin",
				icon: <ExclamationCircleOutlined />,
				content: (
					<span>
						Bạn đồng ý sử dụng
						<strong className="mx-2 text-primary">
							20 point(s)
						</strong>
						để xem thông tin chi tiết khách hàng?
					</span>
				),
				okText: "Đồng ý",
				cancelText: "Hủy",
				onOk: onBuyInfo,
			});
		} catch (error) {
			toast.error(errorMessage);
		}
	};

	const onCloseModal = () => {
		setItemSelected(null);
	};

	return (
		<Modal
			open={Boolean(itemSelected)}
			title="Thông tin chi tiết"
			onCancel={onCloseModal}
			width={700}
			footer={
				<Button type="primary" onClick={onCloseModal}>
					OK
				</Button>
			}
		>
			<Spin spinning={loading}>
				<div className="">
					<ItemInfo label="Họ tên" value={itemSelected?.name} />
					<ItemInfo label="Tuổi" value={itemSelected?.age} />
					<ItemInfo label="Giới tính" value={itemSelected?.gender?.name} />
					<ItemInfo label="Số điện thoại" value={itemSelected?.phone} />
					<ItemInfo label="Email" value={itemSelected?.email} />
					<ItemInfo label="Địa chỉ" value={itemSelected?.address} />
					<ItemInfo label="Tỉnh/TP" value={itemSelected?.province?.name} />
					<ItemInfo label="Quận/Huyện" value={itemSelected?.district?.name} />
					<ItemInfo label="Xã/Phường" value={itemSelected?.ward?.name} />
					<ItemInfo label="Đường/Số nhà" value={itemSelected?.street} />
					{/* <ItemInfo label="MetaData" value={""} /> */}
					<ItemInfo label="Thông tin khác" value={itemSelected?.otherInfo} />
				</div>
				{!itemSelected?.isViewed && (
					<div className="text-center mt-5">
						<Button danger onClick={onConfirmBuy}>
							Xem thông tin chi tiết
						</Button>
					</div>
				)}
				{contextHolder}
			</Spin>
		</Modal>
	);
};

export default InfoModal;
