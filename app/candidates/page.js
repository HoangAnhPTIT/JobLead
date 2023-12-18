"use client";
import { Col, Image, Row } from "antd";
import Banner from "src/components/Candidates/Banner";
import CandidateList from "src/components/Candidates/CandidateList";
import CandidateSearch from "src/components/Candidates/CandidateSearch";

const CandidatesPage = () => {
	return (
		<div>
			<CandidateSearch />
			<Banner />
			<div className="bg-bgBody py-11 -my-1.5">
				<div className=" w-content mx-auto">
					<Row gutter={32}>
						<Col span={18}>
							<CandidateList />
						</Col>
						<Col span={6}>
							<Image
								src="/banner2.jpg"
								width="100%"
								height="auto"
								preview={false}
								alt="Dịch vụ đăng tin"
							/>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
};

export default CandidatesPage;
