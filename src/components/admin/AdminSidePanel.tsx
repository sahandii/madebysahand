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

const AdminSidePanelCSS = styled.div`
	nav {
		transition: grid-template-columns 0.3s ease-in-out 0s;
		display: grid;
		grid-template-columns: 0fr;
		grid-template-rows: 40px 1fr 40px;
	}
	nav.toggled {
		grid-template-columns: 1fr;
	}
	nav span {
		opacity: 0;
		font-size: 0.8rem;
	}
	nav.toggled span {
		opacity: 1;
	}
	nav > .navbar-bottom,
	nav > .navbar-middle {
		overflow: hidden;
	}
`;

const activeLink = clsx(twMerge("active-link pointer-events-none bg-black text-white"));

export const AdminSidePanel: React.FC<AdminSidePanelProps> = () => {
	const currentPath = usePathname();
	const { logout } = useAuth();
	const [opened, setOpened] = useState(false);

	const renderLink = (label?: string, func?: () => Promise<void>, href?: string, icon?: React.ReactNode) =>
		href ? (
			<Link //
				href={href}
				className={clsx(
					`flex items-center gap-3 rounded-lg p-[.7em] leading-[18px] text-muted-foreground hover:text-primary`, //
					{ [activeLink]: currentPath === href },
				)}
			>
				{icon}
				<span className="transition-opacity">{label}</span>
			</Link>
		) : (
			<div //
				onClick={() => {
					func;
				}}
				className={clsx(
					`flex items-center gap-3 rounded-lg p-[.7em] leading-[18px] text-muted-foreground hover:text-primary`, //
					{ [activeLink]: currentPath === href },
				)}
			>
				{icon}
				<span className="transition-opacity">{label}</span>
			</div>
		);

	return (
		<AdminSidePanelCSS className="side-panel border-r bg-white">
			<nav className={`${opened ? "toggled" : " "} sidepanel h-full p-3`}>
				<div className="navbar-top">
					<Button
						onClick={() => {
							setOpened((prev) => !prev);
						}}
						variant="ghost"
						className="aspect-square rounded-lg p-0"
					>
						<MenuIcon className="mt-[-2px] h-5 w-5" />
					</Button>
					<div className="h-[1px] w-full border-b"></div>
				</div>
				<div className="navbar-middle">
					<ul className="mt-4 flex flex-col gap-3">
						<li>{renderLink("Dashboard", undefined, "/admin/dashboard", <Home className="h-5 min-w-5 max-w-5" />)}</li>
						<li>{renderLink("Projects", undefined, "/admin/projects", <LayoutPanelTop className="h-5 min-w-5 max-w-5" />)}</li>
					</ul>
				</div>
				<div className="navbar-bottom">
					<ul className="flex flex-col gap-3">
						<li>{renderLink("Logout", logout, undefined, <LogOut className="h-5 min-w-5 max-w-5" />)}</li>
					</ul>
				</div>
			</nav>
		</AdminSidePanelCSS>
	);
};
