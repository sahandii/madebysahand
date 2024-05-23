// Deps
import { useState, useEffect, ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import slugify from "react-slugify";
import { AuthProvider } from "@/firebase/useAuth";

// CSS & fonts
import styled from "styled-components";
import "@/styles/globals.css";
import { HelveticaNow } from "../fonts/helveticaNow";

// Hooks
// import { usePreserveScroll } from "@/hooks/usePreserveScroll";

// Data
// import { data, Project } from "@/data/projects";
import DefaultLayout from "@/components/layouts/DefaultLayout";

type NextPageWithLayout = AppProps["Component"] & {
	layout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const App = ({ Component, pageProps, router }: AppPropsWithLayout): JSX.Element => {
	// const [projects, setProjects] = useState<Project[] | null>(null);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	// usePreserveScroll();
	// useEffect(() => {
	// 	// Copy data to State + add slugs
	// 	if (data.projects) {
	// 		let projectsCopy = data.projects;
	// 		for (let i = 0; i < projectsCopy.length; i++) {
	// 			const element = projectsCopy[i];
	// 			element.slug = slugify(element.title);
	// 		}
	// 		setProjects(projectsCopy);
	// 	}
	// }, [projects]);

	// Determine the layout based on the page component
	const Layout = (Component as any).layout || DefaultLayout;

	return (
		<AuthProvider>
			<Layout>
				<Component //
					{...pageProps}
					isAnimating={isAnimating}
					setIsAnimating={setIsAnimating}
					key={router.asPath}
					// projects={data.projects}
				/>
			</Layout>
		</AuthProvider>
	);
};

export default App;
