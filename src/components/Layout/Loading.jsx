import { CircularProgress } from "@mui/material";

const Loading = () => {
	return (
		<div className="h-[90vh] flex relative bg-bgContainer">
			<CircularProgress
				color="primary"
				className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
			/>
		</div>
	);
};

export default Loading;
