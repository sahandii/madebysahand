// components/StatusDropDownMenu.tsx

import React from "react";
import { updateProject } from "@/firebase/firebaseOperations"; // Import the updateProject function
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Project } from "@/data/projects"; // Adjust the import path as needed

interface StatusDropDownMenuProps {
	projectId: string;
	currentStatus: Project["status"];
	handleUpdateProject: (id: string, updatedProject: Project) => void;
	setStatus: (status: Project["status"]) => void; // Pass the setStatus function to update local state
	project: Project; // Include the full project object
}

export const StatusDropDownMenu: React.FC<StatusDropDownMenuProps> = ({ projectId, currentStatus, handleUpdateProject, setStatus, project }) => {
	const handleStatusChange = async (newStatus: Project["status"]) => {
		// Create an updated project object with the new status
		const updatedProject: Project = { ...project, status: newStatus };

		// Update the project status in Firebase
		await updateProject(projectId, updatedProject);

		// Call the provided update function to handle state update
		handleUpdateProject(projectId, updatedProject);

		// Update the local status state
		setStatus(newStatus);

		// Optionally handle revalidation or deletion
		if (newStatus === "publish" || newStatus === "private") {
			await fetch(`/api/admin/revalidate?id=${projectId}`);
		}
		if (newStatus === "draft") {
			await fetch(`/api/admin/delete?id=${projectId}`);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"outline"} className="min-w-[75px] p-3">
					{capitalizeFirstLetter(currentStatus)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => handleStatusChange("publish")} disabled={currentStatus === "publish"}>
					Publish
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleStatusChange("draft")} disabled={currentStatus === "draft"}>
					Draft
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleStatusChange("private")} disabled={currentStatus === "private"}>
					Private
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
