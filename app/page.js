import { FireFilled } from "@ant-design/icons";
import Image from "next/image";
import Category from "@/src/commons/Category";
import HomeSearch from "@/src/components/Home/HomeSearch";
import { WIDTH_CONTENT } from "@/src/constants/screen";
import GroupItem from "src/components/Home/GroupItem";
import { JOB_PRIORITY } from "src/constants/job";
import { Col, Row } from "antd";

const fakeData = {
	jobName: "NHÂN VIÊN KẾ TOÁN TỔNG HỢP - THU NHẬP TỪ 12 TRIỆU",
	image: "/thumb-80x80.png",
	companyName: "Công ty TNHH South Sea Leatherwares Việt Nam",
	price: "12 triệu - 15 triệu",
	location: "Hà Nội",
	type: JOB_PRIORITY.HOT,
};

const data = [];

for (let i = 0; i < 20; i++) {
	data[i] = {
		...fakeData,
		type:
			i % 4 === 0
				? JOB_PRIORITY.HOT
				: i % 4 === 1
				? JOB_PRIORITY.URGENT
				: JOB_PRIORITY.NORMAL,
	};
}

const HomePage = () => {
	return (
		<div className="Home">
			<div className="introduce bg-bgBody">
				<HomeSearch />
				<div className="w-content mx-auto">
					<Image
						src="/banner_doc_quyen.jpg"
						width={WIDTH_CONTENT}
						height={220}
						alt="Nhân viên kinh doanh"
						className="my-5"
					/>
					<Category title="Việc làm hot" icon={<FireFilled />} extra="/more">
						<GroupItem items={data} />
					</Category>
					<Row gutter={16} className="my-5">
						<Col span={12}>
							<Image
								src="/banner_gioi_han1.jpg"
								width={WIDTH_CONTENT / 2 - 8}
								height={220}
								alt=""
							/>
						</Col>
						<Col span={12}>
							<Image
								src="/banner_gioi_han2.jpg"
								width={WIDTH_CONTENT / 2 - 8}
								height={220}
								alt=""
							/>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
