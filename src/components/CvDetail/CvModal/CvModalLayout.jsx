import { CheckCircle, Close, HighlightOff } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
} from "@mui/material";

const CvModalLayout = ({
	title,
	open,
	handleClose,
	handleSubmit,
	children,
}) => {
	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
			<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
				{title}
			</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<Close />
			</IconButton>
			<DialogContent dividers>{children}</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					onClick={handleClose}
					className="flex items-center !border-33"
				>
					<HighlightOff fontSize="small" className="text-33" />
					<div className="h-5 ml-1 text-33">Hủy bỏ</div>
				</Button>
				<Button
					variant="contained"
					onClick={handleSubmit}
					className="flex items-center"
				>
					<CheckCircle fontSize="small" />
					<div className="h-5 ml-1">Lưu</div>
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CvModalLayout;
