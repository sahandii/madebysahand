import { useState, useEffect } from "react";
import { ColumnDef, SortingState, flexRender, getSortedRowModel, getCoreRowModel, useReactTable, Updater } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import styled from "styled-components";
import { sortingFns } from "@/data/projects-columns";
import { Project } from "@/data/projects";
import { useResponsive } from "@/lib/utils";

interface ProjectsTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	className?: string;
	handleAddProject: (project: Project) => Promise<void>;
	handleUpdateProject: (id: string, updatedProject: Project) => Promise<void>;
	handleDeleteProject: (id: string) => Promise<void>;
}

const { isMinWidth, isMaxWidth } = useResponsive();

const ProjectsTableCSS = styled.div`
	tr:hover .table-delete {
		opacity: 1;
	}
	.table-delete {
		opacity: 0;
	}
	.th-delete {
		opacity: 0;
	}
	.td-year,
	.td-category {
		cursor: default;
	}
	@media screen and (max-width: 767px) {
		table * {
			font-size: 12px !important;
		}
		.th-year,
		.td-year,
		.th-created,
		.td-created {
			display: none;
		}
	}
`;

// Save row order to localStorage
const LOCAL_STORAGE_KEY = "rowOrder";

const saveRowOrder = (rowOrder: string[]) => {
	console.log("Saving row order:", rowOrder);
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rowOrder));
};

export function ProjectsTable<TData, TValue>({ columns, data, className, handleAddProject, handleUpdateProject, handleDeleteProject, ...props }: ProjectsTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [sortedData, setSortedData] = useState<TData[]>(data);

	// Restore row order from storage or use default
	useEffect(() => {
		const storedOrder = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (storedOrder) {
			const order = JSON.parse(storedOrder);
			const orderedData = order.map((id: string) => data.find((item) => (item as any).id === id)).filter(Boolean) as TData[];
			setSortedData(orderedData);
		} else {
			setSortedData(data);
		}
	}, [data]);

	const handleSortingChange = (updater: Updater<SortingState>) => {
		setSorting((old) => {
			const newSorting = typeof updater === "function" ? updater(old) : updater;
			return newSorting;
		});
	};

	const table = useReactTable({
		data: sortedData,
		sortDescFirst: true,
		columns,
		state: {
			sorting,
		},
		onSortingChange: handleSortingChange,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		sortingFns,
	});

	useEffect(() => {
		if (table.getState().sorting.length > 0) {
			const sortedRows = table.getSortedRowModel().rows;
			const newOrder = sortedRows.map((row) => (row.original as any).id);
			saveRowOrder(newOrder);
			setSortedData(sortedRows.map((row) => row.original));
		}
	}, [table.getState().sorting]);

	return (
		<ProjectsTableCSS className={`projects-table ${className}`} {...props}>
			<Table className={`projects-table`}>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id} className={`th-${header.column.id} transition-colors hover:bg-slate-100`}>
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className={`td-${cell.column.id}`}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</ProjectsTableCSS>
	);
}

export default ProjectsTable;
