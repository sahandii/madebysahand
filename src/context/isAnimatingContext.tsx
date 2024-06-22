import { createContext, Dispatch, SetStateAction } from "react";

interface IsAnimatingContextType {
	isAnimating: boolean;
	setIsAnimating: Dispatch<SetStateAction<boolean>>;
}

export const isAnimatingContext = createContext<IsAnimatingContextType | undefined>(undefined);
