// Higher Order Components and Hooks
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
// Firebase imports
import { ref, get } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";
import { addProject, updateProject } from "@/firebase/firebaseOperations";
// Data models
import { Project } from "@/data/projects";
// Utility functions
import { debounce, slugify } from "@/lib/utils";
// UI components
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { StatusDropDownMenu } from "@/components/admin/StatusDropDownMenu"; // Import the shared component
import { CategoryPanel } from "@/components/admin/CategoryPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MediaUploader from "../MediaUploader";
// Icons
import { LoaderCircle } from "lucide-react";

const ProjectForm: React.FC<{ projectId?: string }> = ({ projectId }) => {
	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [year, setYear] = useState("");
	const [categories, setCategories] = useState<string[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [client, setClient] = useState("");
	const [description, setDescription] = useState<string | undefined>("");
	const [status, setStatus] = useState<Project["status"] | null>("draft");
	const [search, setSearch] = useState("");
	const [project, setProject] = useState<Project | null>(null);
	const [slugLoading, setSlugLoading] = useState(false);
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);

	const router = useRouter();

	useEffect(() => {
		if (projectId) {
			// Fetch the project data and populate the form fields
			const fetchProjectData = async () => {
				const projectRef = ref(db, `projects/${projectId}`);
				const snapshot = await get(projectRef);
				if (snapshot.exists()) {
					const projectData: Project = snapshot.val();
					setProject(projectData);
					setTitle(projectData.title);
					setSlug(projectData.slug);
					setYear(projectData.year);
					setSelectedCategories(projectData.categories || []);
					setClient(projectData.client);
					setDescription(projectData.description);
					setStatus(projectData.status);
				}
			};
			fetchProjectData();
		}
	}, [projectId]);

	const handleCategorySelect = (category: string) => {
		setSelectedCategories((prev) => {
			if (prev.includes(category)) {
				return prev.filter((cat) => cat !== category);
			}
			return [...prev, category];
		});
	};

	const handleClear = () => {
		setSelectedCategories([]);
	};

	const handleUpdateProject = (id: string, updatedProject: Project) => {
		// Update the local state or make additional API calls if necessary
		setProject(updatedProject);
		setStatus(updatedProject.status);
	};

	const debouncedSetSlug = useCallback(
		debounce((value: string) => {
			setSlug(slugify(value));
			setSlugLoading(false); // Stop loading after slug is set
		}, 500),
		[],
	);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setTitle(value);
		setSlugLoading(true); // Start loading when title changes
		debouncedSetSlug(value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const timestamp = Date.now();
		const id = projectId || `${slug}`;
		const newProject: Project = {
			id,
			title,
			slug,
			year,
			categories: selectedCategories,
			client,
			description,
			status,
			created: project ? project.created : timestamp,
			updated: timestamp,
		};

		try {
			if (projectId) {
				await updateProject(id, newProject);
				alert("Project updated successfully!");
			} else {
				await addProject(newProject);
				alert("Project created successfully!");
			}
			const rowOrder = JSON.parse(localStorage.getItem("rowOrder") || "[]");
			rowOrder.unshift(id);
			localStorage.setItem("rowOrder", JSON.stringify(rowOrder));
			router.push("/admin/projects");
		} catch (error) {
			console.error("Error saving project: ", error);
			alert("Error saving project. Please try again.");
		}
	};

	return (
		<div>
			<form className="w-full" onSubmit={handleSubmit}>
				<AdminNavbar
					titleSection={<input className="w-full py-5 text-2xl outline-none" type="text" placeholder="Project title" value={title} onChange={handleTitleChange} required />}
					actionsSection={
						<div className="flex">
							<div className="mr-2">
								<StatusDropDownMenu
									projectId={projectId || ""}
									currentStatus={status || "draft"}
									handleUpdateProject={handleUpdateProject}
									setStatus={setStatus} // Pass the setStatus function to update local state
									project={project} // Pass the full project object
								/>
							</div>
							<Button className="min-w-[6rem]" disabled={title === ""} type="submit">
								Save
							</Button>
						</div>
					}
				/>
				<div className="bg-white px-5 pb-20">
					<div className="grid gap-6 pt-10">
						<div className="grid grid-cols-3 gap-4">
							<div className="grid gap-3">
								<Label htmlFor="slug">URL ID</Label>
								<div className="relative flex items-center">
									<Input value={slug} onChange={(e) => setSlug(slugify(e.target.value))} required id="slug" type="text" />
									{slugLoading && <LoaderCircle className="absolute right-0 mr-2 w-5 animate-spin stroke-slate-500" />}
								</div>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="client">Client</Label>
								<Input value={client} onChange={(e) => setClient(e.target.value)} id="client" type="text" />
							</div>
							<div className="grid gap-3">
								<Label htmlFor="year">Year</Label>
								<Input value={year} onChange={(e) => setYear(e.target.value)} id="year" type="text" />
							</div>
						</div>
						<div className="grid grid-cols-3 gap-4">
							<div className="grid grid-rows-[auto_1fr] content-start gap-3">
								<Label htmlFor="description">Thumbnail</Label>
								<Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write a short description of the project/work" className="min-h-32" />
							</div>
							<div className="grid grid-rows-[auto_1fr] content-start gap-3">
								<Label htmlFor="description">Description</Label>
								<Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write a short description of the project/work" className="min-h-32" />
							</div>
							<div className="grid content-start gap-3">
								<div className="flex justify-between">
									<Label htmlFor="categories">Categories</Label>
									<span onClick={handleClear} className="cursor-pointer text-[10px] font-medium uppercase tracking-wide text-red-500">
										Clear
									</span>
								</div>
								<CategoryPanel search={search} setSearch={setSearch} setCategories={setCategories} selectedCategories={selectedCategories} handleCategorySelect={handleCategorySelect} categories={categories} />
							</div>
						</div>
					</div>
					<div className="my-10 grid gap-3">
						<Label htmlFor="images">Images</Label>
						<MediaUploader uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} projectSlug={project?.slug} />
					</div>
				</div>
			</form>
		</div>
	);
};

export default ProjectForm;
