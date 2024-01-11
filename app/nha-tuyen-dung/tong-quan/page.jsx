"use client";
import { ContactPage, HistoryEdu, Work } from "@mui/icons-material";
import classNames from "classnames";
import EmployerBanner from "src/components/Employer/EmployerBanner";
import EmployerLayout from "src/components/Employer/EmployerLayout";

const ViewItem = ({ icon, bgIcon, amount, title }) => {
	return (
		<div className="shadow p-5 flex gap-5 bg-white">
			<div
				className={classNames(
					"rounded-full w-[50px] h-[50px] flex justify-center items-center",
					bgIcon
				)}
			>
				{icon}
			</div>
			<div>
				<p className="text-33 text-2xl font-semibold">{amount}</p>
				<p className="text-33 text-sm">{title}</p>
			</div>
		</div>
	);
};

const DashboardPage = () => {
	return (
		<EmployerLayout>
			<div>
				<EmployerBanner />
				<div className="grid grid-cols-3 gap-5 mt-5">
					<ViewItem
						title="Viêc làm đã đăng"
						amount={1}
						icon={<Work style={{ color: "#feaa2f" }} />}
						bgIcon="bg-[#ffedd2]"
					/>
					<ViewItem
						title="Hồ sơ ứng tuyển"
						amount={1}
						icon={<HistoryEdu style={{ color: "#01c0c8" }} />}
						bgIcon="bg-[#ccf2f4]"
					/>
					<ViewItem
						title="Hồ sơ đã lưu"
						amount={1}
						icon={<ContactPage style={{ color: "#00c292" }} />}
						bgIcon="bg-[#ccf3e9]"
					/>
				</div>
			</div>
		</EmployerLayout>
	);
};

export default DashboardPage;
