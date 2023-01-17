import localFont from "@next/font/local";

export const HelveticaNow = localFont({
	variable: "--font-base",
	display: "fallback",
	src: [
		// Light
		{
			path: "./helveticaNow-Light.woff",
			weight: "300",
			style: "normal",
		},
		{
			path: "./helveticaNow-Light.woff2",
			weight: "300",
			style: "normal",
		},
		// Light Italic
		{
			path: "./helveticaNow-LightItalic.woff",
			weight: "300",
			style: "italic",
		},
		{
			path: "./helveticaNow-LightItalic.woff2",
			weight: "300",
			style: "italic",
		},
		// Regular
		{
			path: "./helveticaNow-Regular.woff",
			weight: "400",
			style: "normal",
		},
		{
			path: "./helveticaNow-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		// Regular Italic
		{
			path: "./helveticaNow-Italic.woff",
			weight: "400",
			style: "italic",
		},
		{
			path: "./helveticaNow-Italic.woff2",
			weight: "400",
			style: "italic",
		},
		// Medium
		{
			path: "./helveticaNow-Medium.woff",
			weight: "500",
			style: "normal",
		},
		{
			path: "./helveticaNow-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		// Medium Italic
		{
			path: "./helveticaNow-MediumItalic.woff",
			weight: "500",
			style: "italic",
		},
		{
			path: "./helveticaNow-MediumItalic.woff2",
			weight: "500",
			style: "italic",
		},
		// Bold
		{
			path: "./helveticaNow-Bold.woff",
			weight: "700",
			style: "normal",
		},
		{
			path: "./helveticaNow-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		// Bold Italic
		{
			path: "./helveticaNow-BoldItalic.woff",
			weight: "700",
			style: "italic",
		},
		{
			path: "./helveticaNow-BoldItalic.woff2",
			weight: "700",
			style: "italic",
		},
	],
});
