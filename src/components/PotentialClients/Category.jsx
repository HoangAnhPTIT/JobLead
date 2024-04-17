import { UserOutlined } from "@ant-design/icons";
import { Pagination } from "@mui/material";
import { Avatar, Col, Image, Row } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Nodata from "src/commons/Nodata";
import { convertSearchParamsToObject, genUrlParams } from "src/helper/format";

const Category = ({ title, list, count }) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const onChangePage = async (page) => {
		const searchParamsObject =
			searchParams.toString() && convertSearchParamsToObject(searchParams);
		router.push(genUrlParams(pathname, { ...searchParamsObject, page }));
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
							<Col span={12} key={i}>
								<div className="p-3 border flex gap-5">
									<div>
										<Avatar
											icon={
												item?.avatar ? (
													<Image src={item?.avatar} alt="" preview={false} />
												) : (
													<UserOutlined />
												)
											}
											shape="circle"
											size={64}
										/>
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
		</div>
	);
};

export default Category;
