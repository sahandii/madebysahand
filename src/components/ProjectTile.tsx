import styled from "styled-components";
import { Project } from "@/data/projects";
import { useEffect } from "react";

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
		backdrop-filter: blur(20px);
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
export function ProjectTile({ ...project }: Project) {
	const { title, client, poster, category } = project;
	return (
		<ProjectTileCSS>
			<li className={`project-tile cursor-pointer grid-item aspect-video bg-slate-200 flex flex-col justify-center`}>
				<div className="project-description flex justify-center flex-col p-10">
					<h4 className="text-2xl font-bold uppercase">{title}</h4>
					<h5 className="text-2xl font-bold uppercase">
						<small className="flex flex-col leading-tight">
							<span className="opacity-60">{client}</span>
							<span className="opacity-30">{category}</span>
						</small>
					</h5>
				</div>
				<img //
					src={poster?.src}
					className="flex-1"
					draggable="false"
					alt={title}
				/>
			</li>
		</ProjectTileCSS>
	);
}
