"use client";
import FileMenu from "./Menu";

const FileLayout = ({ children }) => {
	return (
		<div className="py-5 bg-bgBody">
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
