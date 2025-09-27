/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
	reactStrictMode: false,
	env: {
		API_URL: "https://localhost:7234/api/v1",
		DOMAIN_NAME: "timviec247.vn",
		SUB_DOMAIN_NAME: "lead.timviec247.vn",
		DOMAIN_URL: "https://timviec247.vn",

		// API_URL: "https://localhost:7234/api/v1",
		// DOMAIN_NAME: "localhost:3000",
		// SUB_DOMAIN_NAME: "lead.localhost:3000",
		// DOMAIN_URL: "http://localhost:3000",
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
