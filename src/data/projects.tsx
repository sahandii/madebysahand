import { StaticImageData } from "next/image";
import { videos, images } from "../constants";

export interface Project {
	slug?: string;
	title: string;
	description?: string;
	client: string;
	category: string;
	subcategories: Array<string>;
	year: number;
	thumbnail?: StaticImageData;
	media?: Media;
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

export const data: Projects = {
	projects: [
		{
			title: "FIFAe 2022",
			description: "Working closely with Dreamhack and the FIFA team, my job was to to produce some of the content for the SoMe channels, aswell as the openers for each cup. While being a Motion Design supervisor, I was making sure that the produced content was in alignment with the brand, FIFA's strategy and goals. The three-day event was streamed globally on Twitch.",
			client: "Dreamhack Sports Games & FIFA",
			category: "Motion Graphics",
			subcategories: ["Art Direction", "VFX", "Compositing", "3D"],
			year: 2021,
			thumbnail: images.fifaeThumb,
			media: {
				images: [],
				videos: [
					{
						poster: images.fecwOpener,
						mp4: videos.fecwOpenerMP4,
						webm: videos.fecwOpenerWebM,
						desc: "One of the opener animations I made for the Nations Cup. The opener was used on stream as breakers between matches etc.",
					},
					{
						poster: images.fifaeExplainer,
						mp4: videos.fifaExplainerMP4,
						webm: videos.fifaExplainerWebM,
						desc: "One of the Explainer videos I did for the FIFAe Nations Cup 2022™",
					},
				],
				instagram: {
					reels: ["https://www.instagram.com/reel/ChCtk1bDj2H/"],
				},
			},
		},
		{
			title: "Prisregn 2021",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
			client: "Politiken",
			category: "Storytelling",
			subcategories: ["Motion Graphics"],
			year: 2021,
			thumbnail: images.prisregn002,
			media: {
				images: [
					{ data: images.prisregn001, desc: "" },
					{ data: images.prisregn002, desc: "" },
					{ data: images.prisregn003, desc: "" },
					{ data: images.prisregn004, desc: "" },
				],
				videos: [],
			},
		},
		{
			title: "Podimo trailers",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
			client: "Podimo",
			category: "Storytelling",
			subcategories: ["Edit", "Motion Graphics", "VFX"],
			year: 2021,
			thumbnail: images.todoegnThumb,
			media: {
				images: [],
				videos: [],
			},
		},
		{
			title: "2DØGN",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
			client: "DRIVE Studios",
			category: "TV Show Identity",
			subcategories: ["Edit", "Motion Graphics", "VFX"],
			year: 2021,
			thumbnail: images.todoegnThumb,
			media: {
				images: [],
				videos: [],
			},
		},
		{
			title: "IKEA COP26",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
			client: "Barkas",
			category: "Motion Graphics",
			subcategories: [],
			year: 2021,
			thumbnail: images.todoegnThumb,
			media: {
				images: [],
				videos: [],
			},
		},
		// {
		// 	title: "Miss Osaka",
		// 	description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
		// 	client: "VIRTUE",
		// 	category: "VFX",
		// 	subcategories: ["VFX", "Compositing", "Motion Graphics"],
		// 	year: 2019,
		// 	thumbnail: images.todoegnThumb,
		// 	media: {
		// 		images: [],
		// 		videos: [],
		// 	},
		// },
		{
			title: "Pandora Black Friday",
			description: "",
			client: "Pandora",
			category: "3D",
			subcategories: ["VFX", "Compositing", "Motion Graphics"],
			year: 2019,
			thumbnail: images.pandoraThumb,
			media: {
				images: [],
				videos: [
					{
						poster: images.pandoraThumb,
						mp4: videos.pandoraMP4,
						webm: videos.pandoraWebM,
					},
				],
			},
		},
	] as Project[],
};
