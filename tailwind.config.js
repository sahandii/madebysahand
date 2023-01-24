/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			container: {
				screens: {
					sm: "100vw",
					md: "100vw",
					lg: "100vw",
					xl: "1200px",
					"2xl": "1536px",
				},
				center: true,
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
