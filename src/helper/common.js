import { clearSession, setCookie as authSetCookie } from "src/services/authService";

export const setCookie = authSetCookie;

export const deleteAllCookies = clearSession;

export const redirectTo = (pathname) => {
	window.location.href = `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}${pathname}`;
};
