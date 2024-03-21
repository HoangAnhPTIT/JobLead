import dayjs from "dayjs";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch } from "lib/hooks";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet } from "src/apis/apiAuthCaller";
import { apiCandidate } from "src/apis/apiEndpoint";
import { errorMessage } from "src/constants/common";
import { convertCandidateInfo } from "src/helper/data";

const useCandidateInfo = () => {
	const dispatch = useAppDispatch();
	const [info, setInfo] = useState(null);

	const getCandidateInfo = useCallback(async () => {
		try {
			dispatch(updateLoading(true));
			const response = await httpAuthGet({
				endpoint: apiCandidate,
			});
			if (response?.status === 200) {
				const { data } = response;

				const newData = convertCandidateInfo(data);

				setInfo(newData);
			} else {
				toast.error(response?.message);
			}
		} catch {
			toast.error(errorMessage);
		} finally {
			dispatch(updateLoading(false));
		}
	}, [dispatch]);

	useEffect(() => {
		getCandidateInfo();
	}, [getCandidateInfo]);

	return { info, getCandidateInfo };
};

export default useCandidateInfo;
