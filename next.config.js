/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	generateStaticParams: async function () {
		return {
			"/viec-lam": { page: "/jobs" },
			"/cong-ty": { page: "/companies" },
			"/ung-vien": { page: "/candidates" },
		};
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "timviec.com.vn",
			},
		],
	},
};

module.exports = nextConfig;
