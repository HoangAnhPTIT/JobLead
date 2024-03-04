"use client";
import { Grid } from "@mui/material";
import { useAppSelector } from "lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import EmployerMenu from "src/components/Employer/Menu";
import { USER_ROLE } from "src/constants/common";

const EmployerLayout = ({ children }) => {
	const router = useRouter();
	const { userInfo } = useAppSelector((state) => state.user);

	useEffect(() => {
		if (userInfo?.role !== USER_ROLE.employer) {
			router.push("/");
		}
	}, []);

	return (
		<div className="py-5 bg-bgEmployer min-h-[calc(100vh-64px)]">
			<div className="w-xlContent !mx-auto">
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<EmployerMenu />
					</Grid>
					<Grid item xs={9}>
						{children}
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default EmployerLayout;
