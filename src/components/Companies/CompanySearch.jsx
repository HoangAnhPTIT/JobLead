"use client";
import { Search } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import routeMap from "src/constants/routeMap";

const CompanySearch = () => {
	const router = useRouter();
	const [q, setQ] = useState("");

	const onSubmit = () => {
		router.push(`${routeMap.company}?q=${q}`);
	};

	return (
		<div className="w-lgContent mx-auto py-5 bg-white">
			<Grid container spacing={2}>
				<Grid item xs={10}>
					<TextField
						fullWidth
						size="small"
						autoComplete="off"
						placeholder="Nhập tên công ty muốn tìm kiếm"
						value={q}
						onChange={(e) => setQ(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && onSubmit()}
					/>
				</Grid>
				<Grid item xs={2}>
					<Button
						fullWidth
						variant="contained"
						className="h-10"
						onClick={onSubmit}
					>
						<Search /> Tìm kiếm
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default CompanySearch;
