/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				footer: "#666",
				bgContainer: "#f5f5f5",
				primary: "#0091ce",
				secondary: "#fc205c",
				f0: "#f0f0f0",
				f0Blur: "rgb(240, 240, 240, 0.5)",
				55: "#555",
				99: "#999",
				33: "#333",
				bgBody: "#f0f0f0",
			},
			width: {
				content: "1170px",
			},
		},
	},
	plugins: [],
};
