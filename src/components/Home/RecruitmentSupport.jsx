import { HeadsetMicOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";

const supporters = [
	{ name: "John", phone: "123 2324 3434" },
	{ name: "John", phone: "123 2324 3434" },
	{ name: "John", phone: "123 2324 3434" },
	{ name: "John", phone: "123 2324 3434" },
	{ name: "John", phone: "123 2324 3434" },
	{ name: "John", phone: "123 2324 3434" },
	{ name: "John", phone: "123 2324 3434" },
];

const RecruitmentSupport = () => {
	return (
		<div className="bg-bgPhone py-3 px-6">
			<div className="text-sm flex items-center">
				<HeadsetMicOutlined fontSize="small" />
				<span className="text-33 text-lg font-bold ml-2">
					Hotline hỗ trợ nhà tuyển dụng
				</span>
			</div>
			<Grid container spacing={[2, 0]} className="py-2">
				{supporters?.map((item, i) => (
					<Grid item xs={4} key={i}>
						<div className="text-sm">
							<span className="font-bold text-red1 mr-2">{item?.phone}</span>
							<span>{item?.name}</span>
						</div>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default RecruitmentSupport;
