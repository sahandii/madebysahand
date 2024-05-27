import { ref, get } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { fetchProjects, addProject, updateProject, deleteProject } from "@/firebase/firebaseOperations";
import { Project } from "@/data/projects";
import { ProjectsTable } from "@/components/admin/ProjectsTable";
import Head from "next/head";
import { ProjectsColumns } from "@/data/projects-columns";
import { Button } from "@/components/ui/button";
import styled from "styled-components";
import withAuth from "@/components/withAuth";

interface AdminProjectsPageProps {
	initialProjects: Project[];
}

const AdminProjectsPageCSS = styled.div``;

const AdminProjectsPage: React.FC<AdminProjectsPageProps> = ({ initialProjects }) => {
	const [projects, setProjects] = useState<Project[]>(initialProjects);

	useEffect(() => {
		const unsubscribe = fetchProjects((projects) => {
			setProjects(projects);
		});

		// Clean up the listener on unmount
		return () => unsubscribe();
	}, []);

	const handleAddProject = async (project: Project) => {
		await addProject(project);
	};

	const handleUpdateProject = async (id: string, updatedProject: Project) => {
		await updateProject(id, updatedProject);
	};

	const handleDeleteProject = async (id: string) => {
		try {
			await deleteProject(id);
			console.log(`${id} deleted`);
		} catch (error) {
			console.error(`Failed to delete project with id ${id}:`, error);
		}
	};

	return (
		<>
			<Head>
				<title>Projects | Sahand Porkar</title>
				<meta name="description" content="The dashboard of all dashboards <3" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AdminProjectsPageCSS>
				<div className="menu-bar bg-white border-b p-5 flex justify-between">
					<h2 className="text-2xl text-primary flex items-center">
						Projects
						<div className="ml-2 text-primary font-medium badge rounded-full bg-slate-200 aspect-square w-[25px] text-sm items-center text-center leading-[25px]">{projects.length}</div>
					</h2>
					<div className="menu-bar--left">
						<Button className="mr-3">+ New project</Button>
					</div>
				</div>
				<ProjectsTable
					className="bg-white"
					columns={ProjectsColumns({
						handleAddProject,
						handleUpdateProject,
						handleDeleteProject,
					})}
					data={projects}
					handleAddProject={handleAddProject}
					handleUpdateProject={handleUpdateProject}
					handleDeleteProject={handleDeleteProject}
				/>
			</AdminProjectsPageCSS>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const projectsRef = ref(db, "projects");
	const snapshot = await get(projectsRef);
	const initialProjects: Project[] = [];
	snapshot.forEach((childSnapshot) => {
		const projectData = childSnapshot.val();
		const project: Project = {
			id: childSnapshot.key as string,
			...projectData,
		};
		initialProjects.push(project);
	});
	return { props: { initialProjects } };
};

export default withAuth(AdminProjectsPage);
