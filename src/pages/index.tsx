import { useEffect } from "react";
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { Project } from "@/data/projects";
import { ProjectTile } from "./../components/ProjectTile";
import Motion from "../components/Motion";
import { motion } from "framer-motion";
import { fetchProjectsOnce } from "@/firebase/firebaseOperations";

interface homeProps {
	projects: Project[];
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

export const Home: NextPage<homeProps> = ({ projects }) => {
	return (
		<>
			<Head>
				<title>Digital designer | Sahand Porkar</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Motion>
				<motion.div initial="hidden" animate="show" variants={container}>
					<header className="container mt-20 flex h-[200px] flex-col px-6">
						<h1 className="mb-6 flex flex-col font-medium">
							<motion.span className="my-1 inline-block text-3xl sm:text-4xl lg:text-5xl" variants={item}>
								Digital Designer at{" "}
								<a className="underline" target="_blank" href="http://linkedin.com/in/sporkar">
									Netcompany
								</a>
								.
							</motion.span>
							<motion.span className="inline-block text-3xl sm:text-4xl lg:text-5xl" variants={item}>
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
						<motion.ul variants={item} className={`md:grid-cols-2 ${projects.length > 2 ? "md:grid-rows-2" : "md:grid-rows-1"} grid gap-[10px] px-6`}>
							{projects
								.sort((a, b) => Number(b.year) - Number(a.year)) // Sort projects by year in descending order
								.map((project: Project) => {
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
	const allProjects: Project[] = await fetchProjectsOnce();
	const projects = allProjects.filter((project) => project.status === "publish");

	return {
		props: {
			projects,
		},
		revalidate: 5,
	};
};

export default Home;
