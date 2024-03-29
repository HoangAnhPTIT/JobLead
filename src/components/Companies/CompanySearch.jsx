"use client";
import { Search } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import routeMap from "src/constants/routeMap";

const CompanySearch = () => {
	const router = useRouter();
	const [searchValue, setSearchValue] = useState("");
	const searchParams = useSearchParams();

	const onSubmit = () => {
		router.push(`${routeMap.company}?q=${searchValue}`);
	};

	useEffect(() => {
		const q = searchParams.getAll("q");
		setSearchValue(q);
	}, [searchParams]);

	return (
		<div className="w-lgContent mx-auto py-5 bg-white">
			<Grid container spacing={2}>
				<Grid item xs={10}>
					<TextField
						fullWidth
						size="small"
						autoComplete="off"
						placeholder="Nhập tên công ty muốn tìm kiếm"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
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
