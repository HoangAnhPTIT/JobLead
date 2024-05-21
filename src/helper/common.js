import Cookies from "js-cookie";
import { loggedIn, refreshToken, token } from "src/constants/common";

const domain = process.env.DOMAIN_NAME;

export function deleteAllCookies() {
	Cookies.remove(token, {
		path: "/",
		domain,
	});
	Cookies.remove(refreshToken, {
		path: "/",
		domain,
	});
	Cookies.remove(loggedIn, {
		path: "/",
		domain,
	});
}
