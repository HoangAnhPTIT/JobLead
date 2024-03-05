import Cookies from "js-cookie";
import { loggedIn, refreshToken, token } from "src/constants/common";

export function deleteAllCookies() {
	Cookies.remove(token);
	Cookies.remove(refreshToken);
	Cookies.remove(loggedIn);
}
