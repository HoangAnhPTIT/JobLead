import { UserOutlined } from "@ant-design/icons";
import { Pagination } from "@mui/material";
import { Avatar, Button, Col, Image, Modal, Row } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Nodata from "src/commons/Nodata";
import { convertSearchParamsToObject, genUrlParams } from "src/helper/format";

const ShowAvatar = ({ src, ...option }) => (
	<Avatar
		icon={src ? <Image src={src} alt="" preview={false} /> : <UserOutlined />}
		shape="circle"
		size={64}
		{...option}
	/>
);

const Category = ({ title, list, count }) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const [itemSelected, setItemSelected] = useState();

	const onChangePage = async (page) => {
		const searchParamsObject =
			searchParams.toString() && convertSearchParamsToObject(searchParams);
		router.push(genUrlParams(pathname, { ...searchParamsObject, page }));
	};

	const onSelectItem = (item) => {
		setItemSelected(item);
	};

	const onCloseModal = () => {
		setItemSelected(null);
	};

	return (
		<div className="">
			<div className="px-3 py-2 bg-primary text-white font-semibold text-lg">
				{title}
			</div>
			<div className="border">
				{count > 0 ? (
					<Row gutter={16} className="p-5">
						{list?.map((item, i) => (
							<Col xs={24} md={12} key={i}>
								<div
									className="p-3 border flex gap-5 cursor-pointer"
									onClick={() => onSelectItem(item)}
								>
									<div>
										<ShowAvatar src={item?.avatar} />
									</div>
									<div>
										<h3 className="font-semibold text-base">{item?.name}</h3>
										<p>
											<strong>Tỉnh/TP:</strong> {item?.province?.name}
										</p>
										<p>
											<strong>Quận/Huyện:</strong> {item?.district?.name}
										</p>
									</div>
								</div>
							</Col>
						))}
					</Row>
				) : (
					<Nodata />
				)}
			</div>
			<div className="mt-5">
				{count > 0 && (
					<Pagination
						count={Math.ceil(count / 20)}
						page={searchParams.get("page") || 1}
						onChange={(e, page) => onChangePage(page)}
						className="flex justify-center"
					/>
				)}
			</div>
			<Modal
				open={Boolean(itemSelected)}
				title="Thông tin chi tiết"
				onCancel={onCloseModal}
				width={700}
			>
				<div className="flex flex-col items-center">
					<ShowAvatar src={itemSelected?.avatar} size={100} />
					<p className="text-lg font-semibold mt-3">{itemSelected?.name}</p>
					<Button type="text">Xem thêm...</Button>
				</div>
			</Modal>
		</div>
	);
};

export default Category;
