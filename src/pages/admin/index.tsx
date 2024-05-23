import { AdminSidePanel } from "./../../components/admin/AdminSidePanel";
// pages/admin/index.tsx
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useAuth } from "@/firebase/useAuth";
import { fetchProjects, addProject, updateProject, deleteProject } from "@/firebase/firebaseOperations";
import { Project } from "@/data/projects";
import AdminLayout from "@/components/layouts/AdminLayout";
import { ProjectsTable } from "./../../components/admin/ProjectsTable";
import Head from "next/head";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { ProjectsColumns } from "@/data/projects-columns";
import { Button } from "@/components/ui/button";
import styled from "styled-components";
import Link from "next/link";

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
		// Refetch or update the state to remove the deleted project
	};

	if (!user) {
		return <button onClick={login}>Login</button>;
	}

	return (
		<>
			<Head>
				<title>Dashboard | Sahand Porkar</title>
				<meta name="description" content="The dashboard of all dashboards <3" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AdminPageCSS>
				<div className="wrapper">
					<AdminSidePanel logout={logout} />
					<main className="main-content p-5">
						<h2 className="text-2xl mb-5">Hello Sahand</h2>
						<ProjectsTable columns={ProjectsColumns} data={projects} />
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
