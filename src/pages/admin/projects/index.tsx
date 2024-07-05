// React
import { useEffect, useState, useCallback } from "react";
// Next.js
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
// Firebase
import { ref, get } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";
import { fetchProjects, addProject, updateProject, deleteProject } from "@/firebase/firebaseOperations";
// Components
import withAuth from "@/components/withAuth";
import { ProjectsTable } from "@/components/admin/ProjectsTable";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
// Data imports
import { Project } from "@/data/projects";
import { ProjectsColumns } from "@/data/projects-columns";
// Icons
import { Download, EllipsisVertical, Upload } from "lucide-react";

interface AdminProjectsPageProps {
	initialProjects: Project[];
}

const wait = (duration = 1000) => new Promise((resolve) => setTimeout(resolve, duration));

// Save row order to localStorage
const LOCAL_STORAGE_KEY = "rowOrder";

const saveRowOrder = (rowOrder: string[]) => {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rowOrder));
};

const AdminProjectsPage: React.FC<AdminProjectsPageProps> = ({ initialProjects }) => {
	const { toast } = useToast();
	const [projects, setProjects] = useState<Project[]>(initialProjects);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const unsubscribe = fetchProjects(setProjects);

		// Clean up the listener on unmount
		return () => unsubscribe();
	}, []);

	const handleAddProject = useCallback(async (project: Project) => {
		await addProject(project);
	}, []);

	const handleUpdateProject = useCallback(async (id: string, updatedProject: Project) => {
		await updateProject(id, updatedProject);
	}, []);

	const handleDeleteProject = useCallback(async (id: string) => {
		try {
			await deleteProject(id);
			console.log(`${id} deleted`);
		} catch (error) {
			console.error(`Failed to delete project with id ${id}:`, error);
		}
	}, []);

	const handleBackup = useCallback(() => {
		const dataStr = JSON.stringify(projects, null, 2);
		const blob = new Blob([dataStr], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "projects-data.json";
		a.click();
		URL.revokeObjectURL(url);
	}, [projects]);

	const handleRestore = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) return;

			const reader = new FileReader();
			reader.onload = async (e) => {
				try {
					const json = JSON.parse(e.target?.result as string);
					if (Array.isArray(json)) {
						// Assuming json is an array of projects
						setOpen(false);
						await wait(100);
						await Promise.all(json.map((project) => addProject(project)));
						await wait(250);
						setProjects(json);
						toast({
							title: "Success",
							description: `${json.length} projects imported`,
						});
						saveRowOrder(json.map((project) => project.id));
					} else {
						console.error("Invalid JSON format");
					}
				} catch (error) {
					console.error("Failed to restore projects:", error);
					toast({
						title: "Import failed",
						description: `Failed to import projects.`,
					});
				}
			};
			reader.readAsText(file);
		},
		[toast],
	);

	const DialogContentWrapper = useCallback(
		() => (
			<DialogContent className="sm:max-w-md">
				<DialogHeader className="mb-3">
					<DialogTitle>Manage Projects</DialogTitle>
					<DialogDescription className="hidden">Projects management</DialogDescription>
				</DialogHeader>
				<div className="inline-flex flex-row items-start gap-3">
					{projects.length > 0 && (
						<div className="flex items-center">
							<Button className="flex items-center" onClick={handleBackup} type="button" variant="outline">
								<Upload className="mr-2 h-4 w-4" />
								{`Backup ${projects.length} Projects`}
							</Button>
						</div>
					)}
					<Button className="p-0" type="button" variant="default">
						<Label className="flex cursor-pointer items-center px-4 py-2" htmlFor="restore">
							<Download className="mr-2 h-4 w-4" />
							Restore
							<input id="restore" type="file" accept="application/json" onChange={handleRestore} style={{ display: "none" }} />
						</Label>
					</Button>
				</div>
			</DialogContent>
		),
		[projects.length, handleBackup, handleRestore],
	);

	return (
		<>
			<Head>
				<title>Projects | Sahand Porkar</title>
				<meta name="description" content="The dashboard of all dashboards <3" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<AdminNavbar
				titleSection={
					<h2 className="flex items-center py-5 text-2xl text-primary">
						Projects
						<div className="badge ml-2 aspect-square w-[25px] items-center rounded-full bg-slate-200 text-center text-sm font-medium leading-[25px] text-primary">{projects.length}</div>
					</h2>
				}
				actionsSection={
					<div className="flex items-stretch gap-2">
						<Button>
							<Link href="./projects/new">
								+ New <span className="max-sm:hidden">project</span>
							</Link>
						</Button>
						<Dialog open={open} onOpenChange={setOpen}>
							<DialogTrigger>
								<Button variant="ghost" className="px-1">
									<EllipsisVertical className="h-5 w-5 text-zinc-600" />
								</Button>
							</DialogTrigger>
							<DialogContentWrapper />
						</Dialog>
					</div>
				}
			/>
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
				saveRowOrder={saveRowOrder}
				LOCAL_STORAGE_KEY={LOCAL_STORAGE_KEY}
			/>
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
