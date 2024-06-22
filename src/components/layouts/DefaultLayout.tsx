import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
// Components
import styled from "styled-components";
import { Nav } from "../../components/global/Nav/Nav";
import { Footer } from "../../components/global/Footer/Footer";

interface LayoutProps {
	children: React.ReactNode;
	isAnimating: boolean;
	setIsAnimating: (isAnimating: boolean) => void;
}

const DefaultLayoutCSS = styled.div`
	footer.show {
		opacity: 1;
	}

	footer {
		will-change: opacity;
		transition: opacity 0.25s linear 0s;
		opacity: 0;
	}
	.wrapper {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr auto;
		grid-template-columns: 100%;
	}
`;

const DefaultLayout: React.FC<LayoutProps> = ({ children, isAnimating, setIsAnimating }) => {
	const router = useRouter();
	return (
		<DefaultLayoutCSS>
			<div className="wrapper relative pt-10">
				<Nav></Nav>
				<AnimatePresence
					mode="wait"
					onExitComplete={() => {
						if (typeof window !== "undefined") {
							window.scrollTo({ top: 0 });
						}
					}}
				>
					{children}
				</AnimatePresence>
				<Footer isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
			</div>
		</DefaultLayoutCSS>
	);
};

export default DefaultLayout;
