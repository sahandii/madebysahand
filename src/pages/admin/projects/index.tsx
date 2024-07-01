import { ref, get } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { fetchProjects, addProject, updateProject, deleteProject } from "@/firebase/firebaseOperations";
import { Project } from "@/data/projects";
import { ProjectsTable } from "@/components/admin/ProjectsTable";
import Head from "next/head";
import { ProjectsColumns } from "@/data/projects-columns";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { Button } from "@/components/ui/button";
import styled from "styled-components";
import withAuth from "@/components/withAuth";
import Link from "next/link";
import { Download, EllipsisVertical, ImportIcon, Upload } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface AdminProjectsPageProps {
	initialProjects: Project[];
}

const AdminProjectsPageCSS = styled.div``;

const AdminProjectsPage: React.FC<AdminProjectsPageProps> = ({ initialProjects }) => {
	const { toast } = useToast();
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
	const dialogTitle = "Backup/Restore Projects";

	const handleBackup = () => {
		const dataStr = JSON.stringify(projects, null, 2);
		const blob = new Blob([dataStr], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "projects-data.json";
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleRestore = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = async (e) => {
			try {
				const json = JSON.parse(e.target?.result as string);
				if (Array.isArray(json)) {
					// Assuming json is an array of projects
					for (const project of json) {
						await addProject(project);
					}
					setProjects(json);
					toast({
						title: "Import completed",
						description: `${json.length} projects were successfully imported.`,
					});
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
	};

	const BackupRestoreDialog = () => {
		return (
			<DialogContent className="sm:max-w-md">
				<DialogHeader className="mb-3">
					<DialogTitle>{dialogTitle}</DialogTitle>
					<DialogDescription className="hidden">Projects management</DialogDescription>
				</DialogHeader>
				<div className="inline-flex flex-col items-start gap-5">
					{projects.length > 0 && (
						<>
							<div className="flex items-center">
								<Button className="flex items-center" onClick={handleBackup} type="button" variant="outline">
									<Upload className="mr-1 h-4 w-4" />
									Backup
								</Button>
								<span className="ml-4 text-[.75rem]">{`${projects.length}`} projects in total.</span>
							</div>
							<Separator />
						</>
					)}
					<Button className="p-0" type="button" variant="default">
						<Label className="flex cursor-pointer items-center px-4 py-2" htmlFor="restore">
							<Download className="mr-1 h-4 w-4" />
							Restore
							<input id="restore" type="file" accept="application/json" onChange={handleRestore} style={{ display: "none" }} />
						</Label>
					</Button>
				</div>
			</DialogContent>
		);
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
								<Link href="./projects/new">+ New project</Link>
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="px-1">
										<EllipsisVertical className="h-5 w-5 text-zinc-600" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<Dialog>
										<DialogTrigger asChild>
											<DropdownMenuItem
												onSelect={(e) => {
													e.preventDefault();
												}}
											>
												{dialogTitle}
											</DropdownMenuItem>
										</DialogTrigger>
										<BackupRestoreDialog />
									</Dialog>
								</DropdownMenuContent>
							</DropdownMenu>
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
