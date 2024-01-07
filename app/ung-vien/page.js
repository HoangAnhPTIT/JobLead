"use client";
import { Grid } from "@mui/material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpPost } from "src/apis/apiCaller";
import { apiCandidateExpectationSearch } from "src/apis/apiEndpoint";
import ImageFull from "src/commons/Image";
import Banner from "src/components/Candidates/Banner";
import CandidateList from "src/components/Candidates/CandidateList";
import CandidateSearch from "src/components/Candidates/CandidateSearch";
import { imageError } from "src/constants/common";

const CandidatesPage = () => {
	const [candidates, setCandidates] = useState();
	const searchParams = useSearchParams();
	const dispatch = useAppDispatch();

	const getParams = () => {
		let params = {};
		for (const [key, value] of searchParams.entries()) {
			if (key !== "page") {
				params[key] = value;
			} else {
				params.paging = { page: Number(value) || 1, size: 10 };
			}
		}

		return params;
	};

	useEffect(() => {
		const getCandidates = async () => {
			try {
				dispatch(updateLoading(true));
				const params = getParams();
				const res = await httpPost(apiCandidateExpectationSearch, params);
				setCandidates(res?.data);
			} catch (error) {
				toast.error(error.message || error);
			} finally {
				dispatch(updateLoading(false));
			}
		};
		getCandidates();
	}, [searchParams]);

	return (
		<div>
			<CandidateSearch />
			<div className="mb-10">
				<Banner />
			</div>
			<div className="bg-bgBody py-11 -my-1.5">
				<div className=" w-lgContent mx-auto">
					<Grid container spacing={4}>
						<Grid item xs={9}>
							<CandidateList data={candidates} />
						</Grid>
						<Grid item xs={3}>
							<ImageFull
								alt="Dịch vụ đăng tin"
								src={"https://placehold.co/270x525.png" || imageError}
							/>
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
	);
};

export default CandidatesPage;
