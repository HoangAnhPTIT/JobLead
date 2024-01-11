"use client";
import React from "react";
import EmployerBanner from "src/components/Employer/EmployerBanner";
import EmployerLayout from "src/components/Employer/EmployerLayout";

const PostListPage = () => {
	return (
		<EmployerLayout>
			<div>
				<EmployerBanner />
			</div>
		</EmployerLayout>
	);
};

export default PostListPage;
