import { EnvironmentFilled, MailFilled, PhoneFilled } from "@ant-design/icons";
import { Col, Flex, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import styles from "./styles.module.scss";
import Counter from "./Counter";

const companyInfo = {
	logo: "/logo.png",
	name: "Coong ty TNHH Xyz",
	address: "Thong tin dia chi cong ty",
	phone: "123 2323",
	email: "abc@xyz.com",
};

const websiteInfo = {
	title: "Thông tin",
	links: [
		{
			title: "Giới thiệu",
			link: "/introduce",
		},
		{
			title: "Liên hệ",
			link: "/contact",
		},
		{
			title: "Câu hỏi thường gặp",
			link: "/common-questions",
		},
		{
			title: "Chính sách bảo mật",
			link: "/policies",
		},
		{
			title: "Điều khoản sử dụng",
			link: "/terms",
		},
		{
			title: "Quy chế hoạt động",
			link: "/rules",
		},
	],
};

const candidateInfo = {
	title: "Ứng viên",
	links: [
		{
			title: "Tìm việc làm",
			link: "/finding-job",
		},
		{
			title: "Quản lý CV",
			link: "/cv",
		},
	],
};

const jobByLocation = {
	title: "Việc làm theo địa điểm",
	links: [
		{
			title: "Hà Nội",
			link: "/job-by-location?at=hanoi",
		},
		{
			title: "TP HCM",
			link: "/job-by-location?at=hcm",
		},
		{
			title: "Đà Nẵng",
			link: "/job-by-location?at=danang",
		},
		{
			title: "Cần Thơ",
			link: "/job-by-location?at=cantho",
		},
		{
			title: "Cần Thơ",
			link: "/job-by-location?at=cantho",
		},
		{
			title: "Cần Thơ",
			link: "/job-by-location?at=cantho",
		},
		{
			title: "Cần Thơ",
			link: "/job-by-location?at=cantho",
		},
	],
};

const majorInfo = {
	title: "Việc làm theo ngành nghề",
	links: [
		{
			title: "Việc làm Kinh Doanh",
			link: "/major?type=business",
		},
		{
			title: "Việc làm Kế Toán",
			link: "/major?type=accountant",
		},
		{
			title: "Việc làm IT",
			link: "/major?type=it",
		},
		{
			title: "Việc làm Marketing",
			link: "/major?type=marketing",
		},
	],
};

const toolInfo = {
	title: "Hồ sơ & Công cụ",
	links: [
		{
			title: "Tạo CV",
			link: "/1",
		},
		{
			title: "Khám phá mức lương",
			link: "/2",
		},
	],
};

const forEmployerInfo = {
	title: "Dành cho Nhà Tuyển Dụng",
	links: [
		{
			title: "Đăng tin tuyển dụng",
			link: "/1",
		},
		{
			title: "Tìm ứng viên",
			link: "/2",
		},
		{
			title: "Bảng giá lọc hồ sơ",
			link: "/2",
		},
	],
};

const InfoList = ({ info }) => {
	return (
		<div className={styles.list}>
			<div
				className={classNames([
					"font-bold relative pb-2.5 mb-4 text-base",
					styles.titleList,
				])}
			>
				{info.title}
			</div>
			{info.links.map((item, i) => (
				<p key={i}>
					<Link href={item.link}>{item.title}</Link>
				</p>
			))}
		</div>
	);
};

const FooterLayout = () => {
	return (
		<>
			<Counter />
			<div className="py-8 w-content m-auto text-footer">
				<div className="grid px-4 grid-cols-[20%_80%]">
					<div>
						<div className="mb-6">
							<Image
								src={companyInfo.logo}
								alt="logo"
								width={112}
								height={41}
							/>
						</div>
						<strong>{companyInfo.name}</strong>
						<div className="mt-1">
							<EnvironmentFilled />
							<strong> Địa chỉ: </strong>
							<span>{companyInfo.address}</span>
						</div>
						<div className="mt-1">
							<PhoneFilled />
							<strong> Số điện thoại: </strong>
							<span>{companyInfo.phone}</span>
						</div>
						<div className="mt-1">
							<MailFilled />
							<strong> Email: </strong>
							<span>{companyInfo.email}</span>
						</div>
					</div>
					<div>
						<Row gutter={[16, 16]}>
							<Col span={6}>
								<InfoList info={websiteInfo} />
							</Col>
							<Col span={6}>
								<InfoList info={candidateInfo} />
							</Col>
							<Col span={6}></Col>
							<Col span={6}></Col>
							<Col span={6}>
								<InfoList info={jobByLocation} />
							</Col>
							<Col span={6}>
								<InfoList info={majorInfo} />
							</Col>
							<Col span={6}>
								<InfoList info={toolInfo} />
							</Col>
							<Col span={6}>
								<InfoList info={forEmployerInfo} />
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</>
	);
};

export default FooterLayout;
