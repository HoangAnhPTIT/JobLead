import axios from "axios";

axios.defaults.baseURL = "https://api.tuyendung247.vn/api/v1";
// axios.defaults.baseURL = "https://38b3-1-55-112-17.ngrok-free.app/api/v1";

export const httpPost = async (endpoint, data = {}, callback) => {
	try {
		const response = await axios.post(endpoint, data);
		return response?.data || response;
	} catch (error) {
		console.error(error);
		return error?.response?.data || error?.response;
	}
};

export const httpGet = async (endpoint, params, callback) => {
	try {
		const response = await axios.get(endpoint, { params });
		return response?.data || response;
	} catch (error) {
		console.error(error);
		return error?.response?.data || error?.response;
	}
};
