// src/pages/admin/projects/index.tsx
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useAuth } from "@/firebase/useAuth";
import { fetchProjects, addProject, updateProject, deleteProject } from "@/firebase/firebaseOperations";
import { Project } from "@/data/projects";
import AdminLayout from "@/components/layouts/AdminLayout";
import { AdminSidePanel } from "@/components/admin/AdminSidePanel";
import { ProjectsTable } from "@/components/admin/ProjectsTable";
import Head from "next/head";
import { ProjectsColumns } from "@/data/projects-columns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import styled from "styled-components";

interface AdminPageProps {
	initialProjects: Project[];
}

const AdminPageCSS = styled.div`
	body,
	html {
		margin: 0;
		padding: 0;
		height: 100%;
	}

	.wrapper {
		display: grid;
		grid-template-columns: max-content 1fr;
		height: 100vh; // Full viewport height
	}
`;

const AdminPage: React.FC<AdminPageProps> = ({ initialProjects }) => {
	const [projects, setProjects] = useState<Project[]>(initialProjects);
	const { user, login, logout } = useAuth();

	useEffect(() => {
		// Optionally, set up real-time updates if necessary
	}, []);

	const handleAddProject = async (project: Project) => {
		await addProject(project);
		// Refetch or update the state to include the new project
		setProjects(await fetchProjects());
	};

	const handleUpdateProject = async (id: string, updatedProject: Project) => {
		await updateProject(id, updatedProject);
		// Refetch or update the state to reflect the changes
		setProjects(await fetchProjects());
	};

	const handleDeleteProject = async (id: string) => {
		try {
			await deleteProject(id);
			console.log(`${id} deleted`);
			// Refetch or update the state to reflect the changes
			setProjects(await fetchProjects());
			console.log(projects);
		} catch (error) {
			console.error(`Failed to delete project with id ${id}:`, error);
		}
	};

	if (!user) {
		return <button onClick={login}>Login</button>;
	}

	return (
		<>
			<Head>
				<title>Projects | Sahand Porkar</title>
				<meta name="description" content="The dashboard of all dashboards <3" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AdminPageCSS>
				<div className="wrapper">
					<AdminSidePanel logout={logout} />
					<main className="main-content bg-slate-100">
						<div className="menu-bar bg-white border-b p-5 flex justify-between">
							<h2 className="text-2xl text-primary flex items-center">
								Projects
								<div className="ml-2 text-primary font-medium badge rounded-full bg-slate-200 aspect-square w-[25px] text-sm items-center text-center leading-[25px]">{projects.length}</div>
							</h2>
							<Button>+ New project</Button>
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
					</main>
				</div>
			</AdminPageCSS>
		</>
	);
};
(AdminPage as any).layout = AdminLayout;

export const getServerSideProps: GetServerSideProps = async () => {
	const initialProjects = await fetchProjects();
	return { props: { initialProjects } };
};

export default AdminPage;
