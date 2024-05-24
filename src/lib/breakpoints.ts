import { useMediaQuery } from "react-responsive";

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
	 */
	const isMinWidth = (width: BreakpointKey | number) => {
		const minWidth = typeof width === "number" ? width : breakpoints[width];
		return useMediaQuery({ minWidth });
	};

	/**
	 * Check if the viewport width is less than or equal to the given breakpoint.
	 * @param {BreakpointKey | number} width - The breakpoint key or custom width in pixels.
	 * @returns {boolean} - True if the viewport width is less than or equal to the given breakpoint.
	 */
	const isMaxWidth = (width: BreakpointKey | number) => {
		const maxWidth = typeof width === "number" ? width : breakpoints[width];
		return useMediaQuery({ maxWidth });
	};

	return { isMinWidth, isMaxWidth };
};
