import { FireFilled } from "@ant-design/icons";
import Image from "next/image";
import Category from "./commons/Category";
import HomeSearch from "./components/Home/HomeSearch";
import { WIDTH_CONTENT } from "./constants/screen";

const HomePage = () => (
	<div className="Home">
		<div className="introduce">
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
					abc
				</Category>
			</div>
		</div>
	</div>
);

export default HomePage;
