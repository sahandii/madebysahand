// Deps
import { FC, useEffect, useState } from "react";
import { withRouter, useRouter } from "next/router";
import styled from "styled-components";
import Head from "next/head";
import Image, { StaticImageData } from "next/image";
import { isSafari } from "react-device-detect";
import { motion } from "framer-motion";
// Data
import { Project } from "@/data/projects";
// Components
import Layout from "@/components/Layout";
import { easeInOutQuart } from "@/assets/easings";

interface caseProps {
	router: any;
	projects: Project[];
	poster: StaticImageData | undefined;
	mp4: string;
	webm: string;
}

const container = {
	hidden: { opacity: 1 },
	show: {
		opacity: 1,
		transition: {
			// delayChildren: 0.25,
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

const CaseCSS = styled.div``;

export const Case: FC<caseProps> = ({ router: { query }, projects }) => {
	const router = useRouter();
	const [element, setElement] = useState<Project[] | any>("");
	useEffect(() => {
		if (!router.isReady) return;
		for (let i = 0; i < projects.length; i++) {
			const element = projects[i];
			if (element.slug === router.query.case) {
				setElement(element);
			}
		}
	}, [element, router.isReady]);

	return (
		<CaseCSS>
			<Head>
				<title>{element.title} | Sahand Porkar</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<motion.div initial="hidden" animate="show" variants={container}>
					<main className="mt-5">
						<div className="px-6 container">
							<div className="grid grid-cols-12">
								<motion.div variants={item} className="sticky top-[2em] -z-[1] col-span-12 tracking-wide text-sm my-5 md:my-8">
									<h1 className="text-lg font-bold">{element.title}</h1>
									<div className="grid grid-cols-12">
										<div className="col-span-12">
											<h2 className="font-medium">{element.client}</h2>
											<h2 className="mt-1 font-medium text-[12px]">
												<span className="mr-3">{element.category} </span>
												{element &&
													element.subcategories.map((item: string, i: number, array: Array<string>) => {
														if (array.length - 1 === i) {
															return <span key={i++}>{item}</span>;
														}
														return (
															<span key={i++} className="mr-3">
																{item}
															</span>
														);
													})}
											</h2>
										</div>
										{element.description && (
											<div className="mt-3 sm:col-span-10 col-span-12">
												<p className="leading-6">{element.description}</p>
											</div>
										)}
									</div>
								</motion.div>
								<motion.div variants={item} className="col-span-12 bg-zinc-50">
									<div className="grid grid-cols-12 gap-[10px]">
										{element.media?.videos &&
											element.media?.videos.map((video: caseProps, index: number) => {
												return (
													<div className="col-span-12 mb-3">
														<video //
															key={index++}
															controls
															controlsList="nodownload"
															playsInline={true}
															poster={element.media?.videos[0].src}
															src={isSafari ? video.mp4 : video.webm}></video>
													</div>
												);
											})}
										{element.media?.images &&
											element.media?.images.map((image: any, index: number) => {
												return (
													<div className="col-span-12 mb-3">
														<Image //
															draggable={false}
															key={index++}
															className="w-100"
															placeholder="blur"
															blurDataURL={image?.data?.blurDataURL}
															src={image?.data?.src}
															width={image?.data?.width}
															height={image?.data?.height}
															alt={image?.desc}
														/>
														{image?.desc && <p className="mt-3 pl-2 col-span-12 font-medium text-sm">{image?.desc}</p>}
													</div>
												);
											})}
									</div>
								</motion.div>
							</div>
						</div>
					</main>
				</motion.div>
			</Layout>
		</CaseCSS>
	);
};

export default withRouter(Case);
