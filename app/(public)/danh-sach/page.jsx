"use client";
import { Image } from "antd";
import Category from "src/components/PotentialClients/Category";
import SearchBox from "src/components/PotentialClients/SearchBox";

const PotentialClients = () => {
	return (
		<div>
			<Image
				src={"https://placehold.co/1170x220.png"}
				width="auto"
				height={220}
				alt=""
				preview={false}
			/>
			<div className="mt-5">
				<SearchBox />
			</div>
			<Category />
		</div>
	);
};

export default PotentialClients;
