import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const defaultCookieNames = {
    token: "token",
    refreshToken: "refreshToken",
    loggedIn: "loggedIn",
};

const readEnv = (key) => {
    if (typeof process === "undefined") return undefined;
    return process?.env?.[key];
};

const parseNumber = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

let authConfig = {
    env: readEnv("NEXT_PUBLIC_ENV") ?? "dev",
    domain: readEnv("NEXT_PUBLIC_DOMAIN_NAME") || undefined,
    subDomain: readEnv("NEXT_PUBLIC_SUB_DOMAIN_NAME") || undefined,
    expiresTime: parseNumber(readEnv("NEXT_PUBLIC_AUTH_EXPIRES_DAYS"), 1),
    successStatus: 200,
    errorMessage:
        readEnv("NEXT_PUBLIC_AUTH_ERROR_MESSAGE") || "Authentication failed",
    cookieNames: { ...defaultCookieNames },
    loginCandidateRequest: null,
    loginEmployerRequest: null,
    tokenExtractor: (response) =>
        response?.tokenLogin ??
        response?.tokenModel ??
        response?.data?.tokenModel ??
        response?.data?.tokenLogin ??
        null,
};

const buildOptions = (overrides = {}) => ({
    expires: authConfig.expiresTime,
    ...overrides,
});

const isDevEnv = () =>
    authConfig.env === "dev" || authConfig.env === "development";

const setCookieDev = (name, value, overrides = {}) => {
    const baseOptions = buildOptions(overrides);
    if (authConfig.domain) {
        Cookies.set(name, value, { ...baseOptions, domain: authConfig.domain });
    } else {
        Cookies.set(name, value, baseOptions);
    }
};

const setCookieProduction = (name, value, overrides = {}) => {
    const secureOptions = buildOptions({ secure: true, ...overrides });
    if (authConfig.domain) {
        Cookies.set(name, value, {
            ...secureOptions,
            path: "/",
            domain: authConfig.domain,
            sameSite: "None",
        });
    }
    if (authConfig.subDomain) {
        Cookies.set(name, value, {
            ...secureOptions,
            path: "/",
            domain: authConfig.subDomain,
            sameSite: "Lax",
        });
    }
    if (!authConfig.domain && !authConfig.subDomain) {
        Cookies.set(name, value, secureOptions);
    }
};

export const configureAuth = (options = {}) => {
    authConfig = {
        ...authConfig,
        ...options,
        cookieNames: {
            ...authConfig.cookieNames,
            ...(options.cookieNames || {}),
        },
    };
};

export const getAuthConfig = () => authConfig;

export const setCookie = (name, value, overrides = {}) => {
    if (isDevEnv()) {
        setCookieDev(name, value, overrides);
    } else {
        setCookieProduction(name, value, overrides);
    }
};

const removeCookieAcrossDomains = (name) => {
    Cookies.remove(name);
    if (authConfig.domain) {
        Cookies.remove(name, { domain: authConfig.domain, path: "/" });
    }
    if (authConfig.subDomain) {
        Cookies.remove(name, { domain: authConfig.subDomain, path: "/" });
    }
};

export const deleteAllCookies = () => {
    const { token, refreshToken, loggedIn } = authConfig.cookieNames;
    removeCookieAcrossDomains(token);
    removeCookieAcrossDomains(refreshToken);
    removeCookieAcrossDomains(loggedIn);
};

export const saveLoginData = (tokenInfo) => {
    if (!tokenInfo) return;
    const { token, refreshToken, loggedIn } = authConfig.cookieNames;
    setCookie(token, tokenInfo?.token, tokenInfo?.tokenOptions);
    setCookie(refreshToken, tokenInfo?.refreshToken, tokenInfo?.refreshTokenOptions);
    setCookie(loggedIn, true);
};

export const clearSession = () => {
    deleteAllCookies();
};

const ensureRequestFn = (requestFn, label) => {
    if (typeof requestFn !== "function") {
        throw new Error(`Auth SDK is missing a ${label} request handler. Call configureAuth first.`);
    }
};

const handleLoginRequest = async (requestFn, payload) => {
    ensureRequestFn(requestFn, "login");
    const response = await requestFn(payload);
    if (!response || response?.status !== authConfig.successStatus) {
        const message = response?.messages?.[0] || authConfig.errorMessage;
        const error = new Error(message);
        error.apiResponse = response;
        throw error;
    }

    const tokenInfo = authConfig.tokenExtractor(response);
    if (!tokenInfo?.token || !tokenInfo?.refreshToken) {
        throw new Error("Auth SDK: token extractor did not return access/refresh tokens");
    }

    saveLoginData(tokenInfo);
    return response;
};

export const loginCandidate = (payload) =>
    handleLoginRequest(authConfig.loginCandidateRequest, payload);

export const loginEmployer = (payload) =>
    handleLoginRequest(authConfig.loginEmployerRequest, payload);

export const getSessionFromCookies = () => {
    const { loggedIn, token } = authConfig.cookieNames;
    const isLoggedInCookie = Cookies.get(loggedIn);
    const accessToken = Cookies.get(token);

    if (!accessToken || isLoggedInCookie !== "true") {
        return { isLoggedIn: false, userInfo: null };
    }

    try {
        const decoded = jwtDecode(accessToken);
        if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
            clearSession();
            return { isLoggedIn: false, userInfo: null };
        }

        const userInfo = {
            userId: decoded.userId,
            email:
                decoded[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
                ],
            role:
                decoded[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ],
        };

        return { isLoggedIn: true, userInfo };
    } catch (error) {
        console.warn("Auth SDK: Unable to decode token", error);
        clearSession();
        return { isLoggedIn: false, userInfo: null };
    }
};
