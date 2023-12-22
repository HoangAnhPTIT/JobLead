"use client";
import { useState } from "react";
import Intro from "@/src/commons/LogSignIn/Intro";
import Candidate from "@/src/components/Signin/Candidate";
import Employer from "@/src/components/Signin/Employer";
import { USER_ROLE } from "@/src/constants/common";

const SigninPage = () => {
	const [signinType, setSigninType] = useState(USER_ROLE.guest);

	switch (signinType) {
		case USER_ROLE.guest:
			return <Intro setType={setSigninType} />;
		case USER_ROLE.candidate:
			return <Candidate setSigninType={setSigninType} />;
		case USER_ROLE.employer:
			return <Employer setSigninType={setSigninType} />;

		default:
			return null;
	}
};

export default SigninPage;
