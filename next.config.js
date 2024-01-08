/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "timviec.com.vn",
			},
			{
				protocol: "https",
				hostname: "placehold.co",
			},
			{
				protocol: "https",
				hostname: "recruitment-storage.hn.ss.bfcplatform.vn",
			},
		],
	},
	output: "standalone",
};

module.exports = nextConfig;
