// firebase/firebaseOperations.ts
import { ref, get, set, update, remove } from "firebase/database";
import { db } from "./firebaseConfig";
import { Project } from "@/data/projects";

export const fetchProjects = async (): Promise<Project[]> => {
	const projectsRef = ref(db, "projects");
	const snapshot = await get(projectsRef);
	const projects: Project[] = [];
	snapshot.forEach((childSnapshot) => {
		const projectData = childSnapshot.val();
		const project: Project = {
			id: childSnapshot.key as string,
			...projectData,
		};
		projects.push(project);
	});
	return projects;
};

export const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
	const projectsRef = ref(db, "projects");
	const snapshot = await get(projectsRef);
	let project: Project | null = null;
	snapshot.forEach((childSnapshot) => {
		const data = childSnapshot.val();
		if (data.slug === slug) {
			project = {
				id: childSnapshot.key as string,
				...data,
			} as Project;
		}
	});
	return project;
};

export const addProject = async (project: Project) => {
	const newProjectRef = ref(db, `projects/${project.id}`);
	await set(newProjectRef, project);
};

export const updateProject = async (id: string, updatedProject: Project) => {
	const projectRef = ref(db, `projects/${id}`);
	await update(projectRef, updatedProject);
};

export const deleteProject = async (id: string) => {
	const projectRef = ref(db, `projects/${id}`);
	await remove(projectRef);
};
