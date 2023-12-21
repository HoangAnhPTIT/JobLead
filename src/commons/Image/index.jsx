import classNames from "classnames";
import Image from "next/image";

const ImageFull = ({ src, alt, classname, ...props }) => {
	return (
		<div className="relative w-full">
			<Image
				layout="fill"
				className={classNames(["w-full !h-auto !relative", classname])}
				src={src}
				alt={alt}
				{...props}
			/>
		</div>
	);
};

export default ImageFull;
