"use client";
import { useRouter } from "next/navigation";
import FileMenu from "./Menu";
import { useAppSelector } from "lib/hooks";
import { useEffect } from "react";
import { USER_ROLE } from "src/constants/common";

const FileLayout = ({ children }) => {
	const router = useRouter();
	const { userInfo } = useAppSelector((state) => state.user);

	useEffect(() => {
		if (userInfo?.role !== USER_ROLE.candidate) {
			router.push("/");
		}
	}, []);

	return (
		<div className="py-5 bg-bgBody min-h-[calc(100vh-64px)]">
			<div className="w-xlContent !mx-auto">
				<div className="grid gap-5" style={{ gridTemplateColumns: "20% 80%" }}>
					<div>
						<FileMenu />
					</div>
					<div>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default FileLayout;
