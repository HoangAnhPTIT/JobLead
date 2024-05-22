import Cookies from "js-cookie";
import {
	expiresTime,
	loggedIn,
	refreshToken,
	token,
} from "src/constants/common";

const domain = process.env.DOMAIN_NAME;
const subDomain = process.env.SUB_DOMAIN_NAME;

export const setCookie = (name, value) => {
	console.log("name, value", name, value);
	Cookies.set(name, value, {
		expires: expiresTime,
		domain: subDomain,
		path: "/",
		secure: true,
		sameSite: "Lax",
	});
	Cookies.set(name, value, {
		expires: expiresTime,
	});
};

export const removeCookie = (name) => {
	Cookies.remove(name, { domain, path: "/" });
	Cookies.remove(name, { domain: subDomain, path: "/" });
};

export function deleteAllCookies() {
	removeCookie(token);
	removeCookie(refreshToken);
	removeCookie(loggedIn);
}

export const redirectTo = (pathname) => {
	window.location.href = `${process.env.DOMAIN_URL}${pathname}`;
};
