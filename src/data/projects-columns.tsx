"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Project } from "@/data/projects"; // Adjust the import path as needed
import { useResponsive, formatDate, capitalizeFirstLetter } from "@/lib/utils";
import { updateProject } from "@/firebase/firebaseOperations";
import Link from "next/link";
// UI
import { StatusDropDownMenu } from "@/components/admin/StatusDropDownMenu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Delete, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ProjectColumnsProps {
	handleAddProject: (project: Project) => void;
	handleUpdateProject: (id: string, updatedProject: Project) => void;
	handleDeleteProject: (id: string) => void;
}
const { isMinWidth, isMaxWidth } = useResponsive();

export const ProjectsColumns: (props: ProjectColumnsProps) => ColumnDef<Project>[] = ({ handleAddProject, handleUpdateProject, handleDeleteProject }) => [
	{
		accessorKey: "title",
		header: ({ column }) => {
			return (
				<Button className="px-0 hover:bg-transparent" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Title
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<Link className="hover:underline" title={`Edit "${row.original.title}"`} href={`./projects/edit/${row.original.id}`}>
					<span className="font-medium">{row.original.title}</span>
				</Link>
			);
		},
	},
	{
		accessorKey: "year",
		header: ({ column }) => {
			return (
				<Button className="px-0 hover:bg-transparent" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Year
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "categories",
		header: ({ column }) => {
			return (
				<Button className="px-0 hover:bg-transparent" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Category
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return row.original.categories[0];
		},
	},
	{
		accessorKey: "updated",
		header: ({ column }) => {
			return (
				<Button className="px-0 hover:bg-transparent" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Modified
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const timestamp = row.original.updated;
			return isMinWidth("xl") ? (
				<TooltipProvider>
					<Tooltip delayDuration={0}>
						<TooltipTrigger>{formatDate(timestamp, "date", "live")}</TooltipTrigger>
						<TooltipContent side="bottom">{formatDate(timestamp, "full")}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			) : (
				<Popover>
					<PopoverTrigger>{formatDate(timestamp, "date", "live")}</PopoverTrigger>
					<PopoverContent>{formatDate(timestamp, "full")}</PopoverContent>
				</Popover>
			);
		},
		sortingFn: "datetime", // Custom sorting function
	},
	{
		accessorKey: "created",
		header: ({ column }) => {
			return (
				<Button className="px-0 hover:bg-transparent" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Created
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const timestamp = row.original.created;
			return isMinWidth("lg") ? (
				<TooltipProvider>
					<Tooltip delayDuration={0}>
						<TooltipTrigger>{formatDate(timestamp, "date")}</TooltipTrigger>
						<TooltipContent side="bottom">{formatDate(timestamp, "full")}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			) : (
				<Popover>
					<PopoverTrigger>{formatDate(timestamp, "date")}</PopoverTrigger>
					<PopoverContent>{formatDate(timestamp, "full")}</PopoverContent>
				</Popover>
			);
		},
		sortingFn: "datetime", // Custom sorting function
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			return (
				<div className="flex items-center">
					<StatusDropDownMenu projectId={row.original.id} currentStatus={row.original.status} handleUpdateProject={handleUpdateProject} setStatus={(status) => handleUpdateProject(row.original.id, { ...row.original, status })} project={row.original} />
					<Button
						className="table-delete ml-3 px-3"
						onClick={() => {
							handleDeleteProject(row.original.id);
						}}
						variant={"outline"}
					>
						<Trash className="hover:color-red h-5 w-5 text-red-600" />
					</Button>
				</div>
			);
		},
	},
	// {
	// 	accessorKey: "edit",
	// 	cell: ({ row }) => {
	// 		return <Button variant={"link"}>Edit</Button>;
	// 	},
	// },
];

export const sortingFns = {
	datetime: (rowA: Row<Project>, rowB: Row<Project>, columnId: string): number => {
		const dateA = rowA.original[columnId as keyof Project] as unknown as number;
		const dateB = rowB.original[columnId as keyof Project] as unknown as number;
		return dateA - dateB;
	},
};
