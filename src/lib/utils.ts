import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const titleToClassName = (title: string) => {
	return title.toLowerCase().replace(/\s+/g, "-");
};

/**
 * Generates a unique identifier using the current timestamp.
 * @returns {string} A unique identifier.
 */
export function makeUID(): string {
	return Date.now().toString();
}
