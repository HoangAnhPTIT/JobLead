import React from "react";
import FooterLayout from "src/components/Layout/Footer";

const LoginLayout = ({ children }) => {
	return (
		<>
			{children}
			<FooterLayout />
		</>
	);
};

export default LoginLayout;
