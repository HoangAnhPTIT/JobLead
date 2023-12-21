"use client";
import { Grid } from "@mui/material";
import EmployerMenu from "src/components/Employer/Menu";

const EmployerLayout = ({ children }) => {
	return (
		<div className="py-5 bg-bgBody">
			<div className="w-content !mx-auto">
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
