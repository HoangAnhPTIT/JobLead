import axios from "axios";
import Cookies from "js-cookie";
import { expiresTime, refreshToken, token } from "src/constants/common";
import routeMap from "src/constants/routeMap";
import { deleteAllCookies } from "src/helper/common";
import {
	apiLoginCandidate,
	apiLoginEmployer,
	apiRefreshToken,
} from "./apiEndpoint";

const baseURL = process.env.API_URL;
// const baseURL =
// 	"https://bcd8-2402-800-73e4-54a5-310f-99ff-1eae-feb2.ngrok-free.app";

const instance = axios.create({
	baseURL,
});

instance.interceptors.request.use(
	(config) => {
		// Lấy token từ localStorage hoặc nơi lưu trữ tương tự
		const accessToken = getLocalAccessToken();

		// Thêm token vào header Authorization
		if (accessToken && config.headers) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		if (config.url?.includes(apiRefreshToken)) {
			if (config.headers) {
				delete config.headers.Authorization;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Tạo một biến lưu trạng thái retry
let isRefreshing = false;

instance.interceptors.response.use(
	(response) => {
		return response;
	},

	async (error) => {
		const originalRequest = error.config;
		// Kiểm tra mã lỗi xác thực
		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest.url?.includes(apiRefreshToken)
		) {
			if (isRefreshing) {
				// Nếu đang trong quá trình refresh token, chờ đợi và thử lại sau
				return new Promise((resolve) => {
					// Đưa request vào hàng đợi
					const retryQueue = () => {
						setTimeout(() => {
							resolve(instance(originalRequest));
						}, 200); // Chờ 200ms trước khi thử lại
					};

					refreshQueue.push(retryQueue);
				});
			}
			if (
				!originalRequest.url?.includes(apiRefreshToken) &&
				!originalRequest.url?.includes(apiLoginCandidate) &&
				!originalRequest.url?.includes(apiLoginEmployer)
			) {
				originalRequest._retry = true;
				isRefreshing = true;
				try {
					await refreshTokenAndRetry();

					const response = await instance(originalRequest);
					isRefreshing = false;

					// Xử lý hàng đợi refresh token
					if (refreshQueue.length > 0) {
						const queue = refreshQueue.splice(0, refreshQueue.length);
						queue.forEach((cb) => cb());
					}

					return response;
				} catch (refreshError) {
					// Xử lý lỗi khi không thể refresh token
					// ...
					isRefreshing = false;
					return Promise.reject(refreshError);
				}
			}
		}

		return Promise.reject(error);
	}
);

// Hàng đợi refresh token
const refreshQueue = [];

export async function apiCaller({
	method,
	endpoint,
	data,
	params,
	responseType = "json",
	contentType = "application/json",
	TOKEN,
}) {
	let headers = {
		// Accept: "*",
		"Content-Type": contentType,
		// "Access-Control-Allow-Origin": "*",
	};

	// Lấy token từ localStorage hoặc nơi lưu trữ tương tự
	const accessToken = TOKEN || getLocalAccessToken();

	// Thêm token vào header Authorization
	if (accessToken) {
		headers.Authorization = `Bearer ${accessToken}`;
	}

	const axiosConfig = {
		params,
		url: endpoint,
		method,
		data,
		headers,
		responseType,
		withCredentials: false,
	};

	try {
		const response = await instance(axiosConfig);

		return response.data;
	} catch (error) {
		const err = error?.response?.data;
		if (
			err?.errorCode?.toLowerCase()?.includes("token") &&
			err?.errorCode !== "TOKEN_INVALID"
		) {
			await refreshTokenAndRetry();
		} else if (err?.errorCode === "TOKEN_INVALID") {
			deleteAllCookies();
			setTimeout(() => {
				window.location.href = routeMap.login;
			}, 1000);
		} else {
			console.error("error when call api", err);
			// toast.error(err?.title);
		}

		return err;
	}
}

// Hàm gọi lại token khi API trả về mã "TOKEN_EXPIRE"
const refreshTokenAndRetry = async () => {
	try {
		// Lấy refreshToken từ localStorage hoặc nơi lưu trữ tương tự
		const accessToken = getLocalAccessToken();
		const refreshToken = getLocalRefeshToken();
		if (refreshToken) {
			// Gọi API để lấy token mới
			const axiosConfigRefesh = {
				url: `${apiRefreshToken}`,
				method: "POST",
				headers: {
					Accept: "*",
					"Content-Type": "application/json",
					// "Access-Control-Allow-Origin": "*",
					"Accept-Language": "*",
				},
				withCredentials: false,
				data: { accessToken, refreshToken },
			};
			try {
				const response = await instance(axiosConfigRefesh);
				if (response?.status === 200) {
					const newDataToken = response.data.tokenModel;
					Cookies.set(token, newDataToken.accessToken, {
						expires: expiresTime,
					});
					Cookies.set(refreshToken, newDataToken.refreshToken, {
						expires: expiresTime,
					});
				} else {
					deleteAllCookies();
					setTimeout(() => {
						window.location.href = "/";
					}, 1000);
				}
			} catch (error) {
				deleteAllCookies();
				setTimeout(() => {
					window.location.href = "/";
				}, 1000);
			}

			// Cập nhật token mới vào localStorage
		} else {
			deleteAllCookies();
			setTimeout(() => {
				window.location.href = "/";
			}, 1000);
		}
	} catch (error) {
		console.error("Lỗi khi gọi lại token:", error);
		// Chuyển hướng người dùng đến trang login
		window.location.href = routeMap.login;
		// throw error;
	}
};

export const getLocalAccessToken = () => {
	const tokenCookie = Cookies.get(token);
	return tokenCookie || "";
};

export const getLocalRefeshToken = () => {
	const rTokenCookie = Cookies.get(refreshToken);
	return rTokenCookie || "";
};

export function httpAuthPost(options) {
	return apiCaller({ ...options, method: "post" });
}
export function httpAuthGet(options) {
	return apiCaller({ ...options, method: "get" });
}
export function httpAuthPut(options) {
	return apiCaller({ ...options, method: "put" });
}
export function httpAuthDelete(options) {
	return apiCaller({ ...options, method: "delete" });
}
