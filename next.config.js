/** @type {import('next').NextConfig} */
const withVideos = require("next-videos");
const nextConfig = {
    reactStrictMode: false,
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true,
    },
};

module.exports = withVideos(nextConfig);
