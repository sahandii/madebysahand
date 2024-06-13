// src/firebase/firebaseOperations.ts
import { ref, set, push, get, update, remove, onValue, off } from "firebase/database";
import { db } from "./firebaseConfig";
import { Project } from "@/data/projects";

/**
 * Fetch projects once for static generation.
 * @returns {Promise<Project[]>} - Promise resolving to an array of projects.
 */
export const fetchProjectsOnce = async (): Promise<Project[]> => {
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

/**
 * Fetch projects with a real-time listener.
 * @param {Function} callback - Callback function to handle projects data.
 * @returns {Function} - Unsubscribe function to stop the listener.
 */
export const fetchProjects = (callback: (projects: Project[]) => void) => {
	const projectsRef = ref(db, "projects");
	const listener = onValue(
		projectsRef,
		(snapshot) => {
			const projects: Project[] = [];
			snapshot.forEach((childSnapshot) => {
				const projectData = childSnapshot.val();
				const project: Project = {
					id: childSnapshot.key as string,
					...projectData,
				};
				projects.push(project);
			});
			callback(projects);
		},
		(error) => {
			console.error("Error fetching projects: ", error);
		},
	);

	// Return a function to unsubscribe from the listener
	return () => off(projectsRef, "value", listener);
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

export const addCategory = async (category: string) => {
	try {
		const categoriesRef = ref(db, "categories");
		const snapshot = await get(categoriesRef);
		let categories = [];

		if (snapshot.exists()) {
			categories = snapshot.val();
		}

		if (Array.isArray(categories)) {
			categories.push(category);
			await set(categoriesRef, categories);
		} else {
			console.error("Categories is not an array");
		}
	} catch (error) {
		console.error("Error adding category: ", error);
		throw error;
	}
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
	console.log(`Deleting project with id: ${id} from Firebase`);
	try {
		const projectRef = ref(db, `projects/${id}`);
		await remove(projectRef);
		console.log(`${id} successfully deleted from Firebase`);
	} catch (error) {
		console.error(`Failed to delete project with id ${id}:`, error);
		throw error;
	}
};
