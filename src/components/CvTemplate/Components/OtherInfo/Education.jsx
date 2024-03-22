import React from "react";
import ShowDescription from "src/commons/ShowDescription";

const Education = ({ info }) => {
	return (
		<>
			<p className="mt-2">
				<strong className="uppercase">{info?.certification}</strong>
			</p>
			<p className="mt-1">
				<strong className="mr-1">Trường, nơi đào tạo:</strong>
				{info?.school}
			</p>
			<p className="mt-1">
				<strong className="mr-1">Xếp loại:</strong>
				{info?.degree}
			</p>
			<p className="mt-1">
				<strong className="mr-1">Khoa:</strong>
				{info?.class}
			</p>
			<p className="mt-1">
				<strong className="mr-1">Ngành:</strong>
				{info?.major}
			</p>
			<div className="mt-1">
				<strong className="mr-1">Mô tả:</strong>
				<ShowDescription description={info?.description} />
			</div>
		</>
	);
};

export default Education;
