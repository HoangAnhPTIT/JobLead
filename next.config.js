/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
	env: {
		BASE_URL: "https://api.tuyendung247.vn/api/v1",
		DOMAIN_NAME: "tuyendung247.vn",
	},
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
