"use client";
import { Search } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";

const CompanySearch = () => {
	return (
		<div className="w-content mx-auto py-5 bg-white">
			<Grid container spacing={2}>
				<Grid item xs={10}>
					<TextField
						fullWidth
						size="small"
						autoComplete="off"
						placeholder="Nhập tên công ty muốn tìm kiếm"
					/>
				</Grid>
				<Grid item xs={2}>
					<Button fullWidth variant="contained" className="h-10">
						<Search /> Tìm kiếm
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default CompanySearch;
