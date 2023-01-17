// Deps
import { useState } from "react";
import styled from "styled-components";
// CSS & fonts
import "@/styles/globals.css";
import { HelveticaNow } from "../fonts/helveticaNow";
// Components
import { Nav } from "../components/global/Nav/Nav";
import { Footer } from "../components/global/Footer/Footer";
// Data
import { data } from "@/data/projects";

import type { AppProps } from "next/app";

const AppCSS = styled.div`
	.wrapper {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr auto;
		grid-template-columns: 100%;
	}
`;

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<AppCSS>
			<style jsx global>{`
				:root {
					--font-helveticanow: ${HelveticaNow.style.fontFamily};
				}
			`}</style>
			<div className="wrapper relative pt-16 px-10">
				<Nav></Nav>
				<Component {...pageProps} projects={data.projects} />
				<Footer />
			</div>
		</AppCSS>
	);
};

export default App;
