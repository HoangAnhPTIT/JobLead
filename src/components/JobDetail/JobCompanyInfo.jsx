import { Groups, Home, Place } from "@mui/icons-material";

const ItemInfo = ({ icon, title, content }) => {
	return (
		<div>
			<div className="font-semibold text-sm">
				{icon} {title}
			</div>
			<div className="my-4 text-sm">{content}</div>
		</div>
	);
};

const JobCompanyInfo = ({ data }) => {
	return (
		<div className="mt-5 p-5 bg-white">
			<div className="border-b border-dd">
				<span className="text-hlBlue text-lg uppercase font-semibold border-b-2 border-hlBlue pb-0.5">
					Thông tin {data?.name}
				</span>
			</div>
			<div className="pt-5">
				<ItemInfo
					icon={<Home />}
					title="Giới thiệu"
					content={data?.description}
				/>
				<ItemInfo
					icon={<Groups />}
					title="Quy mô"
					content={data?.sizeDescription}
				/>
				<ItemInfo icon={<Place />} title="Địa điểm" content={data?.address} />
			</div>
		</div>
	);
};

export default JobCompanyInfo;
