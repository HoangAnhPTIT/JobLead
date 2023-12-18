/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	generateStaticParams: async function (
		defaultPathMap,
		{ dev, dir, outDir, distDir, buildId }
	) {
		return {
			"/viec-lam": { page: "/jobs" },
			"/cong-ty": { page: "/companies" },
			"/ung-vien": { page: "/candidates" },
		};
	},
};

module.exports = nextConfig;
