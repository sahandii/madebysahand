// src/components/ProjectForm.tsx
import { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";
import { useRouter } from "next/router";
import { Project } from "@/data/projects";
import { addProject, updateProject } from "@/firebase/firebaseOperations";
import { AdminNavbar } from "@/components/admin/AdminNavbar";
import { Button } from "@/components/ui/button";
import { CategoryPanel } from "@/components/admin/CategoryPanel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { capitalizeFirstLetter } from "@/lib/utils";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const ProjectForm: React.FC<{ projectId?: string }> = ({ projectId }) => {
	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [year, setYear] = useState("");
	const [categories, setCategories] = useState<string[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [client, setClient] = useState("");
	const [description, setDescription] = useState<string | undefined>("");
	const [status, setStatus] = useState<Project["status"] | null>(null);
	const [search, setSearch] = useState("");

	const router = useRouter();

	useEffect(() => {
		if (projectId) {
			// Fetch the project data and populate the form fields
			const fetchProjectData = async () => {
				const projectRef = ref(db, `projects/${projectId}`);
				const snapshot = await get(projectRef);
				if (snapshot.exists()) {
					const project: Project = snapshot.val();
					setTitle(project.title);
					setSlug(project.slug);
					setYear(project.year);
					setSelectedCategories([project.category, ...project.subcategories]);
					setClient(project.client);
					setDescription(project.description);
					setStatus(project.status);
				}
			};
			fetchProjectData();
		}
	}, [projectId]);

	// Fetch categories from Firebase
	useEffect(() => {
		const fetchCategories = async () => {
			const categoriesRef = ref(db, "categories");
			const snapshot = await get(categoriesRef);
			if (snapshot.exists()) {
				setCategories(snapshot.val());
			}
		};
		fetchCategories();
	}, []);

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const timestamp = Date.now();
		const id = projectId || `${slug}-${timestamp}`;
		const newProject: Project = {
			id,
			title,
			slug,
			year,
			category: selectedCategories[0] || "",
			subcategories: selectedCategories.slice(1),
			client,
			description,
			status,
			created: projectId ? Date.parse(new Date().toISOString()) : timestamp,
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
					titleSection={<input className="py-5 text-2xl w-full outline-none" type="text" placeholder="Project title" value={title} onChange={(e) => setTitle(e.target.value)} required />}
					actionsSection={
						<div className="flex">
							<div className="mr-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant={"outline"}
											className={twMerge(
												clsx({
													"border-green-600": status === "publish",
													"border-black": status !== "publish",
												}),
											)}
										>
											<div className="flex flex-row items-center">
												{!status ? (
													<>
														Set status <ChevronDown className="ml-2 w-4" />
													</>
												) : (
													<div
														className={twMerge(
															"flex flex-row items-center",
															clsx({
																"text-green-600": status === "publish",
															}),
														)}
													>
														<p className="mr-2">●</p>
														<p className="flex items-center">
															{capitalizeFirstLetter(status)} <ChevronDown className="ml-2 w-4" />
														</p>
													</div>
												)}
											</div>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										{status && (
											<>
												<DropdownMenuLabel>Status</DropdownMenuLabel>
												<DropdownMenuSeparator />
											</>
										)}
										<DropdownMenuItem
											onClick={() => {
												setStatus("publish");
											}}
										>
											Publish
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => {
												setStatus("draft");
											}}
										>
											Draft
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => {
												setStatus("private");
											}}
										>
											Private
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							<Button className="min-w-[6rem]" disabled={!status && true} type="submit">
								Save
							</Button>
						</div>
					}
				/>
				<div className="bg-white px-5 pb-20">
					<div className="grid gap-6 pt-10">
						<div className="grid grid-cols-3 gap-4">
							<div className="grid gap-3">
								<Label htmlFor="slug">Slug</Label>
								<Input value={slug} onChange={(e) => setSlug(e.target.value)} required id="slug" type="text" />
							</div>
							<div className="grid gap-3">
								<Label htmlFor="client">Client</Label>
								<Input value={client} onChange={(e) => setClient(e.target.value)} required id="client" type="text" />
							</div>
							<div className="grid gap-3">
								<Label htmlFor="year">Year</Label>
								<Input value={year} onChange={(e) => setYear(e.target.value)} required id="year" type="text" />
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-3 content-start">
								<Label htmlFor="description">Description</Label>
								<Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Write a short description of the project/work" className="min-h-32" />
							</div>
							<div className="grid gap-3 content-start">
								<Label htmlFor="categories">Categories</Label>
								<CategoryPanel search={search} setSearch={setSearch} selectedCategories={selectedCategories} handleCategorySelect={handleCategorySelect} categories={categories} />
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ProjectForm;
