"use client";
import { useState } from "react";
import Intro from "src/commons/LogSignIn/Intro";
import Candidate from "src/components/Signin/Candidate";
import Employer from "src/components/Signin/Employer";
import { USER_TYPE } from "src/constants/common";

const SigninPage = () => {
	const [signinType, setSigninType] = useState(USER_TYPE.guest);

	switch (signinType) {
		case USER_TYPE.guest:
			return <Intro setType={setSigninType} />;
		case USER_TYPE.candidate:
			return <Candidate setSigninType={setSigninType} />;
		case USER_TYPE.employer:
			return <Employer setSigninType={setSigninType} />;

		default:
			return null;
	}
};

export default SigninPage;
