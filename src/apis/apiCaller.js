import axios from "axios";

axios.defaults.baseURL = "https://api.tuyendung247.vn/api/v1";
// axios.defaults.baseURL =
// 	"https://5cfc-2401-d800-20d1-2e2d-8ef-f71e-d3b1-6e8a.ngrok-free.app/api/v1";

export const httpPost = async (endpoint, data = {}, callback) => {
	try {
		const response = await axios.post(endpoint, data);
		if (response.status === 200) {
			return response?.data;
		} else {
			console.error(endpoint, response);
		}
	} catch (error) {
		console.error(error);
	}
};

export const httpGet = async (endpoint, params, callback) => {
	try {
		const response = await axios.get(endpoint, { params });
		if (response.status === 200) {
			return response?.data;
		} else {
			console.error(endpoint, response?.data);
		}
	} catch (error) {
		console.error(error);
	}
};
