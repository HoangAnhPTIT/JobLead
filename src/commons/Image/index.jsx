import Image from "next/image";

const ImageFull = ({ src, alt, ...props }) => {
	return (
		<div className="relative w-full">
			<Image
				layout="fill"
				className="w-full !h-auto"
				src={src}
				alt={alt}
				{...props}
			/>
		</div>
	);
};

export default ImageFull;
