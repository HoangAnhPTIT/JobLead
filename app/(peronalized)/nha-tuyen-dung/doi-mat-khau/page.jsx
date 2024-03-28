import ChangePassword from "src/commons/ChangePassword";
import EmployerLayout from "src/components/Employer/EmployerLayout";

const ChangePasswordPage = () => {
	return (
		<EmployerLayout>
			<div className="text-lg font-semibold mb-3">Đổi mật khẩu</div>
			<div className="bg-white p-8">
				<ChangePassword />
			</div>
		</EmployerLayout>
	);
};

export default ChangePasswordPage;
