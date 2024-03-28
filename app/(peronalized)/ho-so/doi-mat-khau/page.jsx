import React from "react";
import ChangePassword from "src/commons/ChangePassword";
import FileLayout from "src/components/Files/FileLayout";

const ChangePasswordPage = () => {
	return (
		<FileLayout>
			<div className="text-lg font-semibold mb-3">Đổi mật khẩu</div>
			<div className="bg-white p-8">
				<ChangePassword />
			</div>
		</FileLayout>
	);
};

export default ChangePasswordPage;
