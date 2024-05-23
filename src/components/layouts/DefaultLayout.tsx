import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
// Components
import styled from "styled-components";
import { Nav } from "../../components/global/Nav/Nav";
import { Footer } from "../../components/global/Footer/Footer";

interface LayoutProps {
	children: React.ReactNode;
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

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
	const router = useRouter();
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	return (
		<DefaultLayoutCSS>
			<div className="wrapper relative pt-10">
				<Nav></Nav>
				<AnimatePresence
					mode="wait"
					onExitComplete={() => {
						document.body.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
						setIsAnimating(false);
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
