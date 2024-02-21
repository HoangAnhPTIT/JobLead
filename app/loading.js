import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => {
	return (
		<Backdrop sx={{ color: "#fff", zIndex: 9999 }} open>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default Loading;
