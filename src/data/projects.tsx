import { StaticImageData } from "next/image";
import { videos, images } from "../constants";

export interface Project {
	id: string;
	slug: string;
	title: string;
	description?: string;
	client: string;
	categories: string[]; // Updated from category and subcategories
	year: string;
	thumbnail?: StaticImageData | undefined;
	media?: Media;
	updated: number;
	created: number;
	status: "publish" | "draft" | "private" | null;
}

export interface Media {
	images?: {
		data: StaticImageData | undefined;
		desc: string;
	}[];
	videos?: {
		poster: StaticImageData | undefined;
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
