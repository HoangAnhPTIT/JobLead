"use client";
import { Pagination } from "@mui/material";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthPost } from "src/apis/apiAuthCaller";
import { apiCandidateExpectationSearch } from "src/apis/apiEndpoint";
import Nodata from "src/commons/Nodata";
import EmployerBanner from "src/components/Employer/EmployerBanner";
import EmployerLayout from "src/components/Employer/EmployerLayout";
import CandidateList from "src/components/Employer/SearchCandidate/CandidateList";
import SearchBox from "src/components/Employer/SearchCandidate/SearchBox";

const SearchCandidate = () => {
	const dispatch = useAppDispatch();
	const [candidates, setCandidates] = useState();
	const [amount, setAmount] = useState(0);
	const [filterData, setFilterData] = useState({});
	const [paging, setPaging] = useState({ page: 1, size: 10 });

	const onChangePage = (page) => {
		setPaging({ page, size: 10 });
	};

	const getData = async () => {
		dispatch(updateLoading(true));
		try {
			const res = await httpAuthPost({
				endpoint: apiCandidateExpectationSearch,
				data: { ...filterData, paging },
			});
			setCandidates(res?.data?.candidates);
			setAmount(res?.data?.count);
		} catch (error) {
			toast.error(error.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		getData();
	}, [filterData, paging]);

	return (
		<EmployerLayout>
			<div>
				<EmployerBanner />
				<SearchBox setFilterData={setFilterData} />
				<CandidateList candidates={candidates} />
				{amount > 1 ? (
					<Pagination
						count={Math.ceil(amount / 10)}
						page={filterData?.paging?.page}
						onChange={(e, page) => onChangePage(page)}
						className="flex justify-center"
					/>
				) : (
					<div className="bg-white pt-4">
						<Nodata />
					</div>
				)}
			</div>
		</EmployerLayout>
	);
};

export default SearchCandidate;
