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
		videos?: Array<{ poster: StaticImageData | undefined; mp4: HTMLVideoElement; webm: HTMLVideoElement }>;
	};
}

export interface Projects {
	projects: Project[];
}

export const data: Projects = {
	projects: [
		{
			title: "FIFAe 2022",
			description: "For the big FIFAe 2021 tournaments in Bella Arena, I worked closely with Dreamhack as a Motion designer, to bring the social media content that was pushed out, to life, through motion. And together with FIFA, making sure that the produced content was aligned with their marketing strategy and goals. I had fun while making the content more engaging for the fans of FIFAe.",
			client: "Dreamhack Sports Games",
			category: "Motion Graphics",
			subcategories: ["VFX", "Compositing", "3D"],
			year: 2021,
			thumbnail: images.fifaeThumb,
			media: {
				images: [images.prisregn001, images.prisregn002, images.prisregn003, images.prisregn004],
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
		{
			title: "Prisregn 2021",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
			client: "Politiken",
			category: "Storytelling",
			subcategories: ["Motion Graphics"],
			year: 2021,
			thumbnail: images.prisregn002,
		},
		{
			title: "Podimo trailers",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
			client: "Podimo",
			category: "Storytelling",
			subcategories: ["Edit", "Motion Graphics", "VFX"],
			year: 2021,
			thumbnail: images.todoegnThumb,
		},
		{
			title: "2DØGN",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
			client: "DRIVE Studios",
			category: "TV Show Identity",
			subcategories: ["Edit", "Motion Graphics", "VFX"],
			year: 2021,
			thumbnail: images.todoegnThumb,
		},
		{
			title: "Miss Osaka",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
			client: "VIRTUE",
			category: "VFX",
			subcategories: ["VFX", "Compositing", "Motion Graphics"],
			year: 2019,
			thumbnail: images.todoegnThumb,
		},
		{
			title: "Pandora Black Friday",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
			client: "Pandora",
			category: "3D",
			subcategories: ["VFX", "Compositing", "Motion Graphics"],
			year: 2019,
			thumbnail: images.pandoraThumb,
		},
	] as Array<Project>,
};
