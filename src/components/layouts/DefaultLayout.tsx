import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
// Components
import styled from "styled-components";
import { Nav } from "@/components/global/Nav/Nav";
import { Footer } from "@/components/global/Footer/Footer";
import { isAnimatingContext } from "@/context/isAnimatingContext";

interface LayoutProps {
	children: React.ReactNode;
	isAnimating?: boolean;
	setIsAnimating?: React.Dispatch<React.SetStateAction<boolean>>;
}

const DefaultLayoutCSS = styled.div`
	& {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr auto;
		grid-template-columns: 100%;
	}
`;

const DefaultLayout: React.FC<LayoutProps> = ({ children, isAnimating, setIsAnimating }) => {
	const router = useRouter();
	return (
		<DefaultLayoutCSS className="wrapper relative pt-10">
			<Nav></Nav>
			<AnimatePresence mode="wait">{children}</AnimatePresence>
			<Footer />
		</DefaultLayoutCSS>
	);
};

export default DefaultLayout;
