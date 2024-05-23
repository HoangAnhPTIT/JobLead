"use client";
import { Image } from "antd";
import Category from "src/components/PotentialClients/Category";
import CategorySlider from "src/components/PotentialClients/CategorySlider";
import SearchBox from "src/components/PotentialClients/SearchBox";

const PotentialClients = () => {
	return (
		<div>
			<Image
				src={"https://placehold.co/1170x220.png"}
				width="100%"
				height={220}
				alt=""
				preview={false}
			/>
			<div className="mt-5">
				<SearchBox />
			</div>
			<CategorySlider />
			<Category />
		</div>
	);
};

export default PotentialClients;
