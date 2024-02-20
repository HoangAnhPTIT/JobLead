import React from "react";
import FooterLayout from "src/components/Layout/Footer";

const RegisterLayout = ({ children }) => {
	return (
		<>
			{children}
			<FooterLayout />
		</>
	);
};

export default RegisterLayout;
