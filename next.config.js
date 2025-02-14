/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
	env: {
		API_URL: "https://apituyendung.vietmedia.online/api/v1",
		DOMAIN_NAME: "vietmedia.online",
		SUB_DOMAIN_NAME: "lead.vietmedia.online",
		DOMAIN_URL: "https://vietmedia.online",
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
