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
		],
	},
};

module.exports = nextConfig;
