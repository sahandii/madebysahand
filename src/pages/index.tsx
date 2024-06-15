import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { Project } from "@/data/projects";
import { ProjectTile } from "./../components/ProjectTile";
import Motion from "../components/Motion";
import { motion } from "framer-motion";
import smoothscroll from "smoothscroll-polyfill";
import { useEffect } from "react";
import { fetchProjectsOnce } from "@/firebase/firebaseOperations";

interface homeProps {
	projects: Project[];
	isAnimating?: boolean;
	setIsAnimating?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
	slug: string;
}
const container = {
	hidden: { opacity: 1 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
};
const item = {
	hidden: { x: 0, y: "5vh", opacity: 0 },
	show: {
		x: 0,
		y: 0,
		opacity: 1,
		transition: {
			//
			type: "tween",
			ease: "anticipate",
			duration: 1,
		},
	},
};
export const Home: NextPage<homeProps> = ({ projects, isAnimating, setIsAnimating }: homeProps) => {
	useEffect(() => {
		smoothscroll.polyfill();
	});

	return (
		<>
			<Head>
				<title>Digital designer | Sahand Porkar</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Motion isAnimating={isAnimating} setIsAnimating={setIsAnimating}>
				<motion.div initial="hidden" animate="show" variants={container}>
					<header className="container mt-20 flex h-[200px] flex-col px-6">
						<h1 className="mb-6 flex flex-col font-medium">
							{/* <motion.span className="text-2xl sm:text-4xl md:text-5xl inline-block" variants={item}>
                                Digital Designer.
                            </motion.span> */}
							<motion.span className="my-1 inline-block text-2xl sm:text-4xl md:my-3 md:text-5xl" variants={item}>
								Digital Designer at{" "}
								<a
									className="underline"
									target="_blank"
									href="http://linkedin.com/in/sporkar
"
								>
									Netcompany
								</a>
								.
							</motion.span>
							<motion.span className="inline-block text-2xl sm:text-4xl md:text-5xl" variants={item}>
								Skilled in Motion, VFX & Graphic Design.
							</motion.span>
						</h1>
					</header>
					<main className="container">
						<motion.div variants={item} className="mb-5 px-6">
							<h3 className="text-2xl font-medium">
								Some of my work <small>&#8600;</small>
							</h3>
						</motion.div>
						<motion.ul variants={item} className="grid-cols-2 grid-rows-2 gap-[10px] px-6 md:grid">
							{projects.map((project: Project) => {
								if (project.status === "publish") {
									return <ProjectTile key={project.id} {...project} slug={project.slug} />;
								}
							})}
						</motion.ul>
					</main>
				</motion.div>
			</Motion>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const projects: Project[] = await fetchProjectsOnce();

	return {
		props: {
			projects,
		},
		revalidate: 5, // Revalidate every 10 seconds for incremental updates
	};
};

export default Home;
