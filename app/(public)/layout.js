import React from "react";
import FooterLayout from "src/components/Layout/Footer";

const PublicLayout = ({ children }) => {
	return (
		<>
			{children}
			<FooterLayout />
		</>
	);
};

export default PublicLayout;
