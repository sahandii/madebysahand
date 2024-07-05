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
	saveRowOrder: (rowOrder: string[]) => void;
	LOCAL_STORAGE_KEY: "rowOrder";
}

const { isMinWidth, isMaxWidth } = useResponsive();

const ProjectsTableCSS = styled.div`
	& {
		display: grid;
		grid-template-columns: 1fr;
	}
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
		.th-categories,
		.td-categories,
		.th-created,
		.td-created {
			display: none;
		}
		td span {
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			display: -webkit-box;
			overflow: hidden;
			word-break: break-word;
		}
	}
`;

export function ProjectsTable<TData, TValue>({ columns, data, className, handleAddProject, handleUpdateProject, handleDeleteProject, saveRowOrder, LOCAL_STORAGE_KEY, ...props }: ProjectsTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([
		{
			id: "year", // Must be equal to the accessorKey of the coulmn you want sorted by default
			desc: true,
		},
	]);

	const [sortedData, setSortedData] = useState<TData[]>(data);

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

	// This useEffect hook runs when the component mounts or when the 'data' dependency changes.
	// It attempts to restore the row order from localStorage using the provided LOCAL_STORAGE_KEY.
	// If a stored order is found, it maps the stored IDs to the corresponding data items and sets the sorted data state.
	// If no stored order is found, it sets the sorted data state to the provided data.
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

	// This useEffect hook runs when the sorting state of the table changes.
	// If there is any sorting applied, it gets the sorted rows from the table,
	// extracts their IDs, and saves the new order to localStorage.
	// It also updates the sorted data state with the sorted rows.
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
