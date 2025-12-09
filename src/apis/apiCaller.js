import axios from "axios";
import https from "https";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// In Node.js (SSR), allow local self-signed certs for dev
const isLocalHttps = typeof window === "undefined" && axios.defaults.baseURL?.startsWith("https://localhost");
if (isLocalHttps) {
	axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
}

export const httpPost = async (endpoint, data = {}) => {
	try {
		const response = await axios.post(endpoint, data);
		return response?.data || response;
	} catch (error) {
		console.error(error);
		return error?.response?.data || error?.response;
	}
};

export const httpGet = async (endpoint, params) => {
	try {
		const response = await axios.get(endpoint, { params });
		return response?.data || response;
	} catch (error) {
		console.error(error);
		return error?.response?.data || error?.response;
	}
};
