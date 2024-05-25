import { StaticImageData } from "next/image";
import { videos, images } from "../constants";

export interface Project {
	id: string;
	slug: string;
	title: string;
	description?: string;
	client: string;
	category: string;
	subcategories: Array<string>;
	year: number;
	thumbnail?: StaticImageData;
	media?: Media;
	updated: number;
	created: number;
}

export interface Media {
	images?: {
		data: StaticImageData;
		desc: string;
	}[];
	videos?: {
		poster: StaticImageData;
		mp4: string | undefined;
		webm: string | undefined;
		desc?: "string" | undefined;
	}[];
	instagram?: {
		reels: string[];
	};
}

export interface Projects {
	projects: Project[];
}

// export const data: Projects = {
// 	projects: [
// 		{
// 			id: 1,
// 			title: "FIFAe 2022",
// 			description: "In collaboration with Dreamhack and the FIFA team, I was responsible for creating content for the FIFAe social media channels, making animating visuals for the actual tournaments and streams. Additionally, my role involved ensuring that all content adhered to the brand guidelines, aligned with FIFA's strategy, and met its objectives. The event, spanning three days, was streamed worldwide on Twitch.",
// 			client: "Dreamhack Sports Games & FIFA",
// 			category: "Motion Graphics",
// 			subcategories: ["Art Direction", "VFX", "3D"],
// 			year: 2021,
// 			thumbnail: images.fifaeThumb,
// 			media: {
// 				images: [],
// 				videos: [
// 					{
// 						poster: images.fecwOpener,
// 						mp4: videos.fecwOpenerMP4,
// 						webm: videos.fecwOpenerWebM,
// 						desc: "One of the opener animations I made for the Nations Cup. The opener was used on stream as breakers between matches etc.",
// 					},
// 					{
// 						poster: images.fifaeExplainer,
// 						webm: videos.fifaExplainerWebM,
// 						mp4: videos.fifaExplainerMP4,
// 						desc: "One of the Explainer videos I did for the FIFAe Nations Cup 2022™",
// 					},
// 				],
// 				instagram: {
// 					reels: ["https://www.instagram.com/reel/ChCtk1bDj2H/"],
// 				},
// 			},
// 		},
// 		{
// 			id: 2,
// 			title: "Prisregn 2021",
// 			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
// 			client: "Politiken",
// 			category: "Storytelling",
// 			subcategories: ["Motion Graphics"],
// 			year: 2021,
// 			thumbnail: images.prisregn002,
// 			media: {
// 				images: [
// 					{ data: images.prisregn001, desc: "" },
// 					{ data: images.prisregn002, desc: "" },
// 					{ data: images.prisregn003, desc: "" },
// 					{ data: images.prisregn004, desc: "" },
// 				],
// 				videos: [],
// 			},
// 		},
// 		{
// 			id: 3,
// 			title: "Podimo trailers",
// 			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
// 			client: "Podimo",
// 			category: "Storytelling",
// 			subcategories: ["Edit", "Motion Graphics", "VFX"],
// 			year: 2021,
// 			thumbnail: images.todoegnThumb,
// 			media: {
// 				images: [],
// 				videos: [],
// 			},
// 		},
// 		{
// 			id: 4,
// 			title: "2DØGN",
// 			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
// 			client: "DRIVE Studios & XEE",
// 			category: "TV Show Identity",
// 			subcategories: ["Edit", "Motion Graphics", "VFX"],
// 			year: 2021,
// 			thumbnail: images.todoegnThumb,
// 			media: {
// 				images: [],
// 				videos: [],
// 			},
// 		},
// 		{
// 			id: 5,
// 			title: "IKEA COP26",
// 			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
// 			client: "Barkas",
// 			category: "Motion Graphics",
// 			subcategories: [],
// 			year: 2021,
// 			thumbnail: images.todoegnThumb,
// 			media: {
// 				images: [],
// 				videos: [],
// 			},
// 		},
// 		// {
// 		// 	id: 5,
// 		//  title: "Miss Osaka",
// 		// 	description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
// 		// 	client: "VIRTUE",
// 		// 	category: "VFX",
// 		// 	subcategories: ["VFX", "Compositing", "Motion Graphics"],
// 		// 	year: 2019,
// 		// 	thumbnail: images.todoegnThumb,
// 		// 	media: {
// 		// 		images: [],
// 		// 		videos: [],
// 		// 	},
// 		// },
// 		{
// 			id: 6,
// 			title: "Pandora Black Friday",
// 			description: "",
// 			client: "Pandora",
// 			category: "3D",
// 			subcategories: ["VFX", "Compositing", "Motion Graphics"],
// 			year: 2019,
// 			thumbnail: images.pandoraThumb,
// 			media: {
// 				images: [],
// 				videos: [
// 					{
// 						poster: images.pandoraThumb,
// 						webm: videos.pandoraWebM,
// 						mp4: videos.pandoraMP4,
// 					},
// 				],
// 			},
// 		},
// 	] as Project[],
// };
