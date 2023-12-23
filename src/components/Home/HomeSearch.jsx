"use client";
import { Box, Button, Grid } from "@mui/material";
import classNames from "classnames";
import { useAppSelector } from "lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import InputWithoutLabel from "src/commons/FormInput/InputWithoutLabel";
import SelectWithoutLabel from "src/commons/FormInput/SelectWithoutLabel";
import routeMap from "src/constants/routeMap";
import styles from "./styles.module.scss";
import InputSearch from "src/commons/FormInput/InputSearch";
import SelectFilter from "src/commons/FormInput/SelectFilter";

const commonSearch = [
	// { title: "Nhân viên bán hàng", link: "/sale" },
	{ title: "Việc làm Hà Nội", link: "/0/ha-noi" },
	{ title: "Việc làm Hồ Chí Minh", link: "/0/ho-chi-minh" },
	{ title: "Việc làm Đà Nẵng", link: "/0/da-nang" },
];

const HomeSearch = () => {
	const router = useRouter();
	const { register, handleSubmit, control } = useForm();
	const { entities } = useAppSelector((state) => state.entity);

	const onSubmit = (values) => {
		router.push(
			`${routeMap.searchJob}/${values?.career || 0}/${
				values?.workLocation || 0
			}?q=${values?.q}`
		);
	};

	return (
		<div className={styles.search}>
			<h2 className="text-5xl text-center w-full text-white mb-30 font-bold">
				Công nghệ AI - đón đầu xu hướng tìm việc mới
				<br />
				<strong
					style={{
						color: "#0091ce",
						textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
					}}
				>
					Việc làm hấp dẫn
				</strong>{" "}
				dành cho bạn
			</h2>
			<form>
				<div
					className={classNames([
						"bg-f0Blur rounded-full mx-auto w-content p-3 z",
						styles.searchForm,
					])}
				>
					<Grid container spacing={2} className="!w-full">
						<Grid item xs={4}>
							<InputSearch
								name="q"
								placeholder="Tiêu đề công việc..."
								control={control}
								Controller={Controller}
								classname={classNames([
									"rounded-full bg-white",
									styles.searchInput,
								])}
							/>
						</Grid>
						<Grid item xs={3}>
							<SelectFilter
								name="career"
								placeholder="Ngành nghề"
								list={entities?.Career}
								classname={"bg-white !rounded-full"}
								valueKey="slug"
								control={control}
								Controller={Controller}
							/>
						</Grid>
						<Grid item xs={3}>
							<SelectFilter
								name="workLocation"
								placeholder="Địa điểm"
								list={entities?.WorkLocation}
								classname={"bg-white !rounded-full"}
								valueKey="slug"
								control={control}
								Controller={Controller}
							/>
						</Grid>
						<Grid item xs={2}>
							<Button
								fullWidth
								variant="contained"
								className="!rounded-full h-10"
								onClick={handleSubmit((data) => onSubmit(data))}
							>
								<div className="h-5">Tìm kiếm</div>
							</Button>
						</Grid>
					</Grid>
				</div>
			</form>
			<Box className="text-white mx-auto">
				<strong>Tìm kiếm phổ biến</strong>
				{commonSearch.map((item, i) => (
					<Link
						href={item.link}
						key={i}
						className={classNames(
							"ml-4",
							i === 0 ? "text-primary" : "text-white"
						)}
					>
						{item.title}
					</Link>
				))}
			</Box>
		</div>
	);
};

export default HomeSearch;
