import { useState, useEffect } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { SquareCheck, Square, PlusSquareIcon, LoaderCircle } from "lucide-react";
import { addCategory } from "@/firebase/firebaseOperations";
import { ref, get } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";
import styled from "styled-components";

const CategoryPanelCSS = styled.div`
	[cmdk-list] {
		max-height: 120px;
	}
`;

interface CategoryPanelProps {
	search: string | undefined;
	setSearch: ((search: string) => void) | undefined;
	categories: string[];
	selectedCategories: string[];
	handleCategorySelect: (category: string) => void;
	setCategories: (category: string[]) => void;
}

export const CategoryPanel: React.FC<CategoryPanelProps> = ({ search, setSearch, categories, selectedCategories, handleCategorySelect }) => {
	const [localCategories, setLocalCategories] = useState<string[]>(categories);
	const [loading, setLoading] = useState<boolean>(!categories.length);

	useEffect(() => {
		setLocalCategories(categories);
	}, [categories]);

	const fetchCategories = async () => {
		setLoading(true);
		const categoriesRef = ref(db, "categories");
		const snapshot = await get(categoriesRef);
		if (snapshot.exists()) {
			setLocalCategories(snapshot.val());
		}
		setLoading(false);
	};

	useEffect(() => {
		if (!categories.length) {
			fetchCategories();
		}
	}, []);

	const handleAddCategory = async () => {
		try {
			if (search) {
				await addCategory(search);
				console.log("Added new category:", search);
				await fetchCategories(); // Fetch updated categories
				if (setSearch) setSearch(""); // Clear the input field
			}
		} catch (error) {
			console.error("Error adding category:", error);
		}
	};

	const sortedCategories = localCategories.map((category, index) => ({ category, index })).sort((a, b) => a.category.localeCompare(b.category));

	return (
		<CategoryPanelCSS>
			<Command loop className="rounded-md border">
				<CommandInput value={search} onValueChange={setSearch} placeholder="Search/Add a Category" />
				<CommandList>
					{loading ? (
						<LoaderCircle className="m-5 w-5 animate-spin stroke-slate-500" />
					) : (
						<>
							<CommandEmpty>
								<span onClick={handleAddCategory} className="cursor-pointer hover:underline">
									<small className="flex items-center">
										<PlusSquareIcon className="mr-2 w-4" /> Create '<b>{search}</b>'
									</small>
								</span>
							</CommandEmpty>
							<CommandGroup>
								{sortedCategories.map(({ category, index }) => (
									<CommandItem onSelect={() => handleCategorySelect(category)} className="cursor-pointer" key={index}>
										{selectedCategories.includes(category) ? ( //
											<SquareCheck className="mr-2 w-4" />
										) : (
											<Square className="mr-2 w-4 opacity-10" />
										)}
										<small>{category}</small>
										{selectedCategories.includes(category) && ( //
											<div className={`${selectedCategories.indexOf(category) === 0 ? "bg-teal-500 text-white" : "bg-slate-300"} badge ml-2 rounded-full px-2 py-[.025rem] transition-all`}>
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
		</CategoryPanelCSS>
	);
};
