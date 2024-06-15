import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import { useAuth } from "@/firebase/useAuth";
import { Button } from "../ui/button";
import { Home, LayoutPanelTop, LogOut, MenuIcon } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface AdminSidePanelProps {
	menuItems?: number;
	logout: () => void;
}

const AdminSidePanelCSS = styled.div``;

const activeLink = clsx(twMerge("active-link pointer-events-none bg-black text-white"));

export const AdminSidePanel: React.FC<AdminSidePanelProps> = () => {
	const currentPath = usePathname();
	const { logout } = useAuth();
	const [opened, setOpened] = useState(false);

	const renderLink = (href: string, label: string, icon: React.ReactNode) => (
		<Link //
			href={href}
			className={clsx(
				"mb-2 flex items-center gap-3 rounded-lg p-[.7em] leading-[18px] text-muted-foreground hover:text-primary", //
				{ [activeLink]: currentPath === href },
			)}
		>
			{icon}
			<span className={`${!opened ? "hidden" : ""} text-[12px]`}>{label}</span>
		</Link>
	);

	return (
		<AdminSidePanelCSS className="side-panel border-r bg-white">
			<nav className={`${opened ? "w-[200px] px-5" : "w-[64px]"} sidepanel flex h-full flex-col justify-between p-3 transition-all`}>
				<div className="grid text-sm font-medium">
					<Button
						onClick={() => {
							setOpened((prev) => !prev);
						}}
						variant="ghost"
						className="aspect-square rounded-full p-0"
					>
						<MenuIcon className="mt-[-2px] h-5 w-5" />
					</Button>
					<ul className="mt-4">
						<li>{renderLink("/admin/dashboard", "Dashboard", <Home className="mt-[-2px] h-5 w-5" />)}</li>
						<li>{renderLink("/admin/projects", "Projects", <LayoutPanelTop className="mt-[-2px] h-5 w-5" />)}</li>
					</ul>
				</div>
				<Button variant="outline" onClick={logout}>
					<span className="flex items-center text-red-500">
						<LogOut className="h-4 w-4" /> {opened && <span className="ml-2">Logout</span>}
					</span>
				</Button>
			</nav>
		</AdminSidePanelCSS>
	);
};
