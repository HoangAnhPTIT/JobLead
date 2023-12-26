import { toast } from "react-toastify";

export const toastSuccess = (text) => {
	toast(<div className="text-primary">123</div>, {
		theme: "light",
	});
};
export const toastError = (text = "Có lỗi xảy ra, vui lòng thử lại") => {
	toast(<div className="text-primary">{text}</div>, {
		theme: "light",
	});
};
