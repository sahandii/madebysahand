import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "react-responsive";

declare global {
	interface String {
		capitalizeFirstLetter(): string;
	}
}

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

// utils/formatDate.ts
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatDate = (timestamp: number, format: "datetime" | "date" | "time" | "full", mode?: "live"): string => {
	const date = new Date(timestamp);
	const now = new Date();

	const formatTime = (date: Date) => {
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${hours}:${minutes}`;
	};

	const formatDateOnly = (date: Date) => {
		const day = String(date.getDate()).padStart(2, "0");
		const month = monthNames[date.getMonth()];
		const year = date.getFullYear();
		return `${day} ${month} ${year}`;
	};

	const formatFullDateTime = (date: Date) => {
		const day = String(date.getDate()).padStart(2, "0");
		const month = monthNames[date.getMonth()];
		const year = date.getFullYear();
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${day}-${month}-${year} - ${hours}:${minutes}`;
	};

	const timeString = formatTime(date);
	const dateString = formatDateOnly(date);
	const fullDateTimeString = formatFullDateTime(date);

	// Calculate the difference in days
	const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const diffTime = date.getTime() - startOfToday.getTime();
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	if (format === "time") {
		return timeString;
	}

	if (mode === "live") {
		if (diffDays === 0) {
			return format === "datetime" ? `${timeString} — Today` : "Today";
		}

		if (diffDays === -1) {
			return format === "datetime" ? `${timeString} — Yesterday` : "Yesterday";
		}

		if (diffDays >= -6) {
			return format === "datetime" ? `${timeString} — ${Math.abs(diffDays)} days ago` : `${Math.abs(diffDays)} days ago`;
		}
	}

	if (format === "datetime" || format === "full") {
		return fullDateTimeString;
	} else if (format === "date") {
		return dateString;
	}

	return "";
};

const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
} as const;

type BreakpointKey = keyof typeof breakpoints;
type BreakpointValue = (typeof breakpoints)[BreakpointKey];

/**
 * Custom hook to manage responsive breakpoints.
 * @returns {Object} An object containing functions to check min and max widths.
 */
export const useResponsive = () => {
	/**
	 * Check if the viewport width is greater than or equal to the given breakpoint.
	 * @param {BreakpointKey | number} width - The breakpoint key or custom width in pixels.
	 * @returns {boolean} - True if the viewport width is greater than or equal to the given breakpoint.
	 *
	 * @example
	 * const { isMinWidth } = useResponsive();
	 * isMinWidth("sm"); // Small Screen (≥640px)
	 * isMinWidth(500); // Custom width (≥500px)
	 */
	const isMinWidth = (width: BreakpointKey | number) => {
		const minWidth = typeof width === "number" ? width : breakpoints[width];
		return useMediaQuery({ minWidth });
	};

	/**
	 * Check if the viewport width is less than or equal to the given breakpoint.
	 * @param {BreakpointKey | number} width - The breakpoint key or custom width in pixels.
	 * @returns {boolean} - True if the viewport width is less than or equal to the given breakpoint.
	 *
	 * @example
	 * const { isMaxWidth } = useResponsive();
	 * isMaxWidth("lg"); // Large Screen (≤1024px)
	 * isMaxWidth(800); // Custom width (≤800px)
	 */
	const isMaxWidth = (width: BreakpointKey | number) => {
		const maxWidth = typeof width === "number" ? width : breakpoints[width];
		return useMediaQuery({ maxWidth });
	};

	return { isMinWidth, isMaxWidth };
};

export const capitalizeFirstLetter = (str: string | null) => {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const slugify = (str: string) => {
	const slug = str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9æøå]/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-+|-+$/g, "");
	return slug.replace(/æ/g, "ae").replace(/ø/g, "oe").replace(/å/g, "aa");
};

export function debounce(func: Function, wait: number) {
	let timeout: NodeJS.Timeout;

	return (...args: any) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(null, args), wait);
	};
}
