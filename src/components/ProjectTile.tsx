import { FC } from "react";
import styled from "styled-components";
import { Project } from "@/data/projects";
import Link from "next/link";
import { useRouter } from "next/router";
import { useScrollTo } from "react-use-window-scroll";

interface ProjectTileProps {}

type Props = ProjectTileProps & Project;

const ProjectTileCSS = styled.div`
	.project-tile {
		overflow: hidden;
		position: relative;
	}
	.project-description {
		transition: 100ms linear 0s;
		transition-property: transform, opacity;
		will-change: transform, opacity;
	}
	.project-description {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(60px);
		-webkit-backdrop-filter: blur(60px);
		filter: grayscale(0.5);
		color: white;
	}
	h4 {
		transform: translateX(-25px);
		transition: transform 0.25s cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
		will-change: transform;
	}
	h5 {
		opacity: 0;
		transition: opacity 0.2s linear 0.1s;
		will-change: opacity;
	}
	.project-tile:hover {
		.project-description {
			transform: none;
			opacity: 1;
		}
		h4 {
			transform: none;
		}
		h5 {
			opacity: 1;
		}
	}
`;

export const ProjectTile: FC<Props> = (props) => {
	const { ...project } = props as Project;
	const router = useRouter();
	const scrollTo = useScrollTo();

	return (
		<Link //
			className="z-50 block"
			href="./case/[slug]"
			as={`./case/${project.slug}`}
			scroll={false}
		>
			<ProjectTileCSS>
				<li style={{ backgroundImage: `url(${project.thumbnail})` }} className={`project-tile grid-item flex aspect-video cursor-pointer flex-col justify-center bg-slate-200 bg-cover`}>
					<div className="project-description flex flex-col justify-center p-10">
						<h4 className="text-2xl font-bold">{project.title}</h4>
						<h5 className="text-2xl font-bold">
							<small className="flex flex-col leading-tight">
								{/* <span className="opacity-60">{project.client}</span> */}
								<span className="text-[.9rem] font-normal tracking-wider opacity-50">{project.categories ? project.categories[0] : " "}</span>
							</small>
						</h5>
					</div>
				</li>
			</ProjectTileCSS>
		</Link>
	);
};
