import { NextPage } from "next";
import Head from "next/head";
import { Project } from "@/data/projects";
import { ProjectTile } from "./../components/ProjectTile";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import slugify from "react-slugify";

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
	return (
		<>
			<Head>
				<title>Motion & graphics designer | Sahand Porkar</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout isAnimating={isAnimating} setIsAnimating={setIsAnimating}>
				<motion.div initial="hidden" animate="show" variants={container}>
					<header className="px-6 container min-h-[65vh] flex flex-col justify-center">
						<h1 className="text-[2.75rem] md:text-[4rem] lg:text-[5rem] leading-[1.1] font-medium mb-6">
							<motion.span className="inline-block" variants={item}>
								Skilled in Motion, <br />
							</motion.span>
							<motion.span className="inline-block" variants={item}>
								VFX & Graphic Design. <br />
							</motion.span>
							<motion.span className="inline-block" variants={item}>
								Co-founder of{" "}
								<a className="underline" target="_blank" href="https://comfortoasis.studio/">
									Comfort Oasis
								</a>
								.
							</motion.span>
						</h1>
					</header>
					<main className="container">
						<div className="px-6 mb-5">
							<h3 className="text-2xl font-medium">
								Some of my work <small>&#8600;</small>
							</h3>
						</div>
						<motion.ul variants={item} className="sm:px-6 md:grid gap-[10px] grid-cols-2 grid-rows-2">
							{projects.map((project: Project, index: number) => {
								return <ProjectTile key={index++} {...project} slug={slugify(project.title)} />;
							})}
						</motion.ul>
					</main>
				</motion.div>
			</Layout>
		</>
	);
};

export default Home;
