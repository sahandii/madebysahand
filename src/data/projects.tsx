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
	thumbnail?: StaticImageData | undefined;
	media?: {
		images?: Array<StaticImageData | undefined>;
		videos?: Array<{ poster: StaticImageData | undefined; mp4: HTMLVideoElement | undefined; webm: HTMLVideoElement | undefined } | unknown>;
	};
}

export interface Projects {
	projects: Project[];
}

export const data: Projects = {
	projects: [
		{
			title: "FIFAe 2022",
			description: "Working closely with Dreamhack and the FIFA team, my job was to to produce some of the content for the SoMe channels. While being a Motion Design supervisor, I was making sure that the produced content was in alignment with the brand, FIFA's strategy and goals.",
			client: "Dreamhack Sports Games",
			category: "Motion Graphics",
			subcategories: ["Art Direction", "VFX", "Compositing", "3D"],
			year: 2021,
			thumbnail: images.fifaeThumb,
			media: {
				images: [],
				videos: [],
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
			title: "Miss Osaka",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
			client: "VIRTUE",
			category: "VFX",
			subcategories: ["VFX", "Compositing", "Motion Graphics"],
			year: 2019,
			thumbnail: images.todoegnThumb,
			media: {
				images: [],
				videos: [],
			},
		},
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
					// videos[0]
					{
						poster: images.fifaeThumb,
						// videos[0].mp4
						mp4: videos.pandoraMP4,
						// videos[0].webm
						webm: videos.pandoraWebM,
					},
					// videos[1] etc
					// ...
				],
			},
		},
	] as Array<Project>,
};
