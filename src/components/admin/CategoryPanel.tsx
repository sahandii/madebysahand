import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { SquareCheck, Square, CheckIcon, PlusSquareIcon, LoaderCircle } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { CommandLoading } from "cmdk";

interface CategoryPanelProps {
	search: string | undefined;
	setSearch: ((search: string) => void) | undefined;
	categories: string[];
	selectedCategories: string[];
	handleCategorySelect: (category: string) => void;
}

export const CategoryPanel: React.FC<CategoryPanelProps> = ({ search, setSearch, categories, selectedCategories, handleCategorySelect }) => {
	const sortedCategories = categories.map((category, index) => ({ category, index })).sort((a, b) => a.category.localeCompare(b.category));

	return (
		<Command loop className="border rounded-md">
			<CommandInput value={search} onValueChange={setSearch} placeholder="Search/Add a Category" />
			<CommandList>
				{!categories.length ? (
					<LoaderCircle className="stroke-slate-500 m-5 animate-spin w-5" />
				) : (
					<>
						<CommandEmpty>
							<span
								onClick={() => {
									console.log("Add new category:", search);
								}}
								className="cursor-pointer hover:underline"
							>
								<small className="flex items-center">
									<PlusSquareIcon className="w-4 mr-2" /> Create '<b>{search}</b>'
								</small>
							</span>
						</CommandEmpty>
						<CommandGroup>
							{sortedCategories.map(({ category, index }) => (
								<CommandItem onSelect={() => handleCategorySelect(category)} className="cursor-pointer" key={index}>
									{selectedCategories.includes(category) ? ( //
										<SquareCheck className="w-4 mr-2" />
									) : (
										<Square className="opacity-10 w-4 mr-2" />
									)}
									<small>{category}</small>
									{selectedCategories.includes(category) && ( //
										<div className={`${selectedCategories.indexOf(category) === 0 ? "bg-teal-500 text-white" : "bg-slate-300"} badge ml-2   px-2 py-[.025rem] rounded-full transition-all`}>
											<small className="text-[8px] font-medium uppercase tracking-wide">{selectedCategories.indexOf(category) === 0 ? "main" : "secondary"}</small>
										</div>
									)}
								</CommandItem>
							))}
						</CommandGroup>
					</>
				)}
			</CommandList>
		</Command>
	);
};
