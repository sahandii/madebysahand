import { StaticImageData } from "next/image";
import { images } from "../constants";

export interface Project {
	pid: number;
	title: string;
	description: string;
	client: string;
	category: string;
	subcategories: Array<string>;
	year: number;
	poster?: StaticImageData | undefined;
}

export interface Projects {
	projects: Project[];
}

export const data: Projects = {
	projects: [
		{
			pid: 0,
			title: "Prisregn 2021",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
			client: "Politiken",
			category: "Storytelling",
			subcategories: ["Motion Graphics"],
			year: 2021,
			poster: images.prisregn004,
		},
		{
			pid: 1,
			title: "Podcast trailers",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
			client: "Podimo",
			category: "Video",
			subcategories: ["Edit", "Motion Graphics", "VFX"],
			year: 2021,
		},
		{
			pid: 2,
			title: "2DØGN",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
			client: "DRIVE Studios",
			category: "Brand indentity",
			subcategories: ["Edit", "Motion Graphics", "VFX"],
			year: 2021,
			poster: images.todoegnthumb,
		},
		{
			pid: 3,
			title: "Logo design",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, veniam. Est facilis quod unde esse commodi quasi eveniet perspiciatis aliquid!",
			client: "EOW!",
			category: "Brand indentity",
			subcategories: ["Edit", "Motion Graphics", "VFX"],
			year: 2021,
		},
	],
};
