/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			container: {
				screens: {
					sm: "640px",
					md: "768px",
					lg: "1024px",
					xl: "1200px",
					"2xl": "1536px",
				},
				center: true,
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
