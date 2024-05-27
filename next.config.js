/** @type {import('next').NextConfig} */
const withVideos = require("next-videos");

const nextConfig = {
	reactStrictMode: false,
	compiler: {
		// Enables the styled-components SWC transform
		styledComponents: true,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						icon: true,
					},
				},
			],
		});

		return config;
	},
};

module.exports = withVideos(nextConfig);
