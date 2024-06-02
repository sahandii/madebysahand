"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Project } from "@/data/projects"; // Adjust the import path as needed
import { useResponsive, formatDate } from "@/lib/utils";
import { addProject, updateProject, deleteProject, fetchProjects } from "@/firebase/firebaseOperations";
import Link from "next/link";
// UI
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Delete, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ProjectColumnsProps {
	// status: "published" | "draft" | "hidden";
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
				<Link className="hover:underline" title={`Edit "${row.original.title}"`} href="">
					{row.original.title}
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
		accessorKey: "category",
		header: ({ column }) => {
			return (
				<Button className="px-0 hover:bg-transparent" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Category
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
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
			return isMinWidth("lg") ? (
				<TooltipProvider>
					<Tooltip delayDuration={0}>
						<TooltipTrigger>{formatDate(timestamp, "date", "live")}</TooltipTrigger>
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
			// const payment = row.original;
			return (
				<div className="flex items-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={"outline"} className="p-3">
								Published
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{/* <DropdownMenuLabel>Change status</DropdownMenuLabel> */}
							<DropdownMenuItem disabled>Published</DropdownMenuItem>
							<DropdownMenuItem>Draft</DropdownMenuItem>
							<DropdownMenuItem>Hide</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button
						className="table-delete px-3 ml-3"
						onClick={() => {
							handleDeleteProject(row.original.id);
						}}
						variant={"outline"}
					>
						<Trash className="text-red-600 hover:color-red h-5 w-5" />
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
