"use client";
import { useState } from "react";
import Intro from "src/commons/LogSignIn/Intro";
import Candidate from "src/components/Login/Candidate";
import Employer from "src/components/Login/Employer";
import { USER_ROLE } from "src/constants/common";

const LoginPage = () => {
	const [loginType, setLoginType] = useState(USER_ROLE.guest);

	switch (loginType) {
		case USER_ROLE.guest:
			return <Intro setType={setLoginType} />;
		case USER_ROLE.candidate:
			return <Candidate setLoginType={setLoginType} />;
		case USER_ROLE.employer:
			return <Employer setLoginType={setLoginType} />;

		default:
			return null;
	}
};

export default LoginPage;
