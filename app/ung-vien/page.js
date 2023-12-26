"use client";
import { Grid } from "@mui/material";
import ImageFull from "src/commons/Image";
import Banner from "src/components/Candidates/Banner";
import CandidateList from "src/components/Candidates/CandidateList";
import CandidateSearch from "src/components/Candidates/CandidateSearch";
import { imageError } from "src/constants/common";

const CandidatesPage = () => {
	return (
		<div>
			<CandidateSearch />
			<div className="mb-10">
				<Banner />
			</div>
			<div className="bg-bgBody py-11 -my-1.5">
				<div className=" w-content mx-auto">
					<Grid container spacing={4}>
						<Grid item xs={9}>
							<CandidateList />
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
