"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Project } from "@/data/projects"; // Adjust the import path as needed
import { useResponsive, formatDate } from "@/lib/utils";
import Link from "next/link";
// UI
import { StatusDropDownMenu } from "@/components/admin/StatusDropDownMenu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ProjectColumnsProps {
	handleAddProject: (project: Project) => void;
	handleUpdateProject: (id: string, updatedProject: Project) => void;
	handleDeleteProject: (id: string, title: string) => void;
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
		cell: ({ row }) => {
			return !row.original.year ? "N/A" : row.original.year;
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
			return !row.original.categories ? "N/A" : <span className="cursor-default">{row.original.categories[0]}</span>;
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
					<Dialog>
						<DialogTrigger asChild>
							<Button className="table-delete ml-3 px-2" variant={"outline"}>
								<Trash className="hover:color-red h-4 w-4 text-red-600" />
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-md">
							<DialogHeader>
								<DialogTitle>Delete project</DialogTitle>
								<DialogDescription>
									Are you sure you want to delete <strong>'{row.original.title}'</strong>?
								</DialogDescription>
							</DialogHeader>
							<DialogFooter className="sm:justify-start">
								<Button
									onClick={() => {
										handleDeleteProject(row.original.id, row.original.title);
									}}
									type="button"
									variant="destructive"
								>
									Delete
								</Button>
								<DialogClose asChild>
									<Button type="button" variant="secondary">
										Cancel
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
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
