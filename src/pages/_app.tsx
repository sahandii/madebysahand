// Deps
import { useState, useEffect, SetStateAction } from "react";
import type { AppProps } from "next/app";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import slugify from "react-slugify";

// CSS & fonts
import "@/styles/globals.css";
import { HelveticaNow } from "../fonts/helveticaNow";
// Components
import { Nav } from "../components/global/Nav/Nav";
import { Footer } from "../components/global/Footer/Footer";
// Hooks
import { usePreserveScroll } from "@/hooks/usePreserveScroll";
// Data
import { data, Project, Projects } from "@/data/projects";
const AppCSS = styled.div`
	.wrapper {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr auto;
		grid-template-columns: 100%;
	}
`;

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
	const [projects, setProjects] = useState<Project[] | null>(null);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	// usePreserveScroll();
	useEffect(() => {
		// Copy data to State + add slugs
		if (data.projects) {
			let projectsCopy = data.projects;
			for (let i = 0; i < projectsCopy.length; i++) {
				const element = projectsCopy[i];
				element.slug = slugify(element.title);
			}
			setProjects(projectsCopy);
		}
	}, [projects]);

	return (
		<AppCSS>
			<style jsx global>{`
				:root {
					--font-helveticanow: ${HelveticaNow.style.fontFamily};
				}
			`}</style>
			<div className="wrapper relative pt-10">
				<Nav></Nav>
				<AnimatePresence
					mode="wait"
					onExitComplete={() => {
						const frontPage = router.pathname === "/";
						window.scrollTo(0, 0);
						setIsAnimating(false);
					}}
				>
					<Component //
						{...pageProps}
						isAnimating={isAnimating}
						setIsAnimating={setIsAnimating}
						key={router.asPath}
						projects={data.projects}
					/>
				</AnimatePresence>
				<Footer isAnimating={isAnimating} setIsAnimating={setIsAnimating} />
			</div>
		</AppCSS>
	);
};

export default App;
