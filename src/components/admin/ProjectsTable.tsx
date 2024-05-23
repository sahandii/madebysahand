"use client";

import { useState } from "react";
import { ColumnDef, SortingState, flexRender, getSortedRowModel, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import styled from "styled-components";

interface ProjectsTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

const ProjectsTableCSS = styled.div`
	.th-edit {
		opacity: 0;
		pointer-events: none;
	}
	.td-edit {
		opacity: 0;
	}
	.projects-table tr:hover .td-edit {
		opacity: 1;
	}
`;

export function ProjectsTable<TData, TValue>({ columns, data }: ProjectsTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	return (
		<ProjectsTableCSS className="rounded-md border">
			<Table className="projects-table">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead //
										key={header.id}
										className={`th-${header.column.id}`}
									>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow //
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<>
										<TableCell //
											key={cell.id}
											className={`td-${cell.column.id}`}
										>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									</>
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
