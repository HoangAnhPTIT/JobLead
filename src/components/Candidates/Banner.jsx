import ImageFull from "src/commons/Image";
import { imageError } from "src/constants/common";

const Banner = () => {
	return (
		<ImageFull
			src={"https://placehold.co/1500x40.png" || imageError}
			alt="Top việc làm"
		/>
	);
};

export default Banner;
