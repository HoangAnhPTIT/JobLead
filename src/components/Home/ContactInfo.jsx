"use client";
import { Grid } from "@mui/material";

const contacts = [
	{
		title: "Thông tin hỗ trợ cho ứng viên",
		phone: "0123 456 789",
		email: "abc@abc.com",
	},
	{
		title: "Thông tin hỗ trợ cho doanh nghiệp",
		phone: "0123 456 789",
		email: "abc@abc.com",
	},
];

const ContactInfo = () => {
	return (
		<div className="text-center">
			<div className="text-lg bg-primary text-white p-2">THÔNG TIN LIÊN HỆ</div>
			<Grid container className="bg-white py-4 px-2">
				{contacts?.map((item, i) => (
					<Grid item xs={6} key={i}>
						<div className="font-bold text-base">{item?.title}:</div>
						<div className="text-[15px]">
							Hotline: <span className="text-primary">{item?.phone}</span>
						</div>
						<div className="text-[15px]">
							Email: <span>{item?.email}</span>
						</div>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default ContactInfo;
