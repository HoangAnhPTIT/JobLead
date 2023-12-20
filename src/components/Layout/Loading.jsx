import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => {
	return (
		<div className="h-[90vh]">
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={true}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
};

export default Loading;
