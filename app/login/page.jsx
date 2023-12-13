"use client";
import { useState } from "react";
import Intro from "src/commons/LogSignIn/Intro";
import Candidate from "src/components/Login/Candidate";
import Employer from "src/components/Login/Employer";
import { USER_TYPE } from "src/constants/common";

const LoginPage = () => {
	const [loginType, setLoginType] = useState(USER_TYPE.guest);

	switch (loginType) {
		case USER_TYPE.guest:
			return <Intro setType={setLoginType} />;
		case USER_TYPE.candidate:
			return <Candidate setLoginType={setLoginType} />;
		case USER_TYPE.employer:
			return <Employer setLoginType={setLoginType} />;

		default:
			return null;
	}
};

export default LoginPage;
