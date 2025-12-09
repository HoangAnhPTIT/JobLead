import { configureAuth, clearSession, getSessionFromCookies, loginCandidate, loginEmployer } from "@/packages/auth-sdk";
import { httpPost } from "src/apis/apiCaller";
import { apiLoginCandidate, apiLoginEmployer } from "src/apis/apiEndpoint";
import {
    errorMessage,
    expiresTime,
    loggedIn,
    refreshToken,
    token,
} from "src/constants/common";

configureAuth({
    env: process.env.NEXT_PUBLIC_ENV,
    domain: process.env.NEXT_PUBLIC_DOMAIN_NAME,
    subDomain: process.env.NEXT_PUBLIC_SUB_DOMAIN_NAME,
    expiresTime,
    errorMessage,
    cookieNames: { token, refreshToken, loggedIn },
    loginCandidateRequest: (payload) => httpPost(apiLoginCandidate, payload),
    loginEmployerRequest: (payload) => httpPost(apiLoginEmployer, payload),
});

export { clearSession, getSessionFromCookies, loginCandidate, loginEmployer };
