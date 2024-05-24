// pages/admin/projects/index.tsx
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
	};

	const handleUpdateProject = async (id: string, updatedProject: Project) => {
		await updateProject(id, updatedProject);
		// Refetch or update the state to reflect the changes
	};

	const handleDeleteProject = async (id: string) => {
		await deleteProject(id);
		console.log("test");

		// Refetch or update the state to reflect the changes
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
							{/* <Separator decorative orientation="vertical" className="h-[40px] mx-8" /> */}
							<Button>+ New project</Button>
						</div>
						<ProjectsTable //
							className="bg-white"
							columns={ProjectsColumns}
							data={projects}
							handleAddProject={handleAddProject}
							handleUpdateProject={handleUpdateProject}
							handleDeleteProject={handleDeleteProject}
						/>
					</main>
				</div>
			</AdminPageCSS>
			{/* <nav className="flex flex-row justify-between items-center w-full p-4 border-b">
					<div className="navbar-left flex">
						<h1 className="font-bold text-2xl m-0 leading-none">Dashboard</h1>
					</div>
					<div className="navbar-center">
						<AdminNavbar />
					</div>
					<div className="navbar-right">
						<Button variant={"outline"} onClick={logout}>
							<span className="text-red-500">Logout</span>
						</Button>
					</div>
				</nav> */}
		</>
	);
};
(AdminPage as any).layout = AdminLayout;

export const getServerSideProps: GetServerSideProps = async () => {
	const initialProjects = await fetchProjects();
	return { props: { initialProjects } };
};

export default AdminPage;
