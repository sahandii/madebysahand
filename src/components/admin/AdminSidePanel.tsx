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
		grid-template-rows: auto 1fr 40px;
	}
	nav.toggled {
		grid-template-columns: 1fr;
	}
	nav span {
		opacity: 0;
		font-size: 0.8rem;
		padding-right: 5em;
	}
	nav.toggled span {
		opacity: 1;
	}
	nav > .navbar-bottom,
	nav > .navbar-middle {
		overflow: hidden;
	}
	nav svg {
		@media screen and (min-width: 768px) {
			height: 18px;
			min-width: 18px;
			max-width: 18px;
		}
		height: 14px;
		min-width: 14px;
		max-width: 14px;
	}
`;

const activeLink = clsx(twMerge("active-link pointer-events-none bg-black text-white"));

export const AdminSidePanel: React.FC<AdminSidePanelProps> = () => {
	const currentPath = usePathname();
	const { logout } = useAuth();
	const [opened, setOpened] = useState(false);

	const renderLink = (label?: string, func?: () => void, href?: string, icon?: React.ReactNode, additionalClasses?: string) =>
		href ? (
			<Link //
				href={href}
				className={clsx(
					additionalClasses,
					`flex items-center gap-3 rounded-lg p-[.7em] leading-[18px] text-muted-foreground hover:text-primary`, //
					{ [activeLink]: currentPath === href },
				)}
			>
				{icon}
				<span className="transition-opacity">{label}</span>
			</Link>
		) : (
			<div //
				onClick={func}
				className={clsx(
					additionalClasses,
					`flex cursor-pointer items-center gap-3 rounded-lg p-[.7em] leading-[18px] text-muted-foreground hover:text-primary`, //
					{ [activeLink]: currentPath === href },
				)}
			>
				{icon}
				<span className="transition-opacity">{label}</span>
			</div>
		);

	return (
		<AdminSidePanelCSS className="side-panel border-r bg-white">
			<nav className={`${opened ? "toggled" : " "} sidepanel h-full gap-3 p-3`}>
				<div className="navbar-top mt-1">
					<Button
						onClick={() => {
							setOpened((prev) => !prev);
						}}
						variant="ghost"
						className="aspect-square rounded-lg p-0"
					>
						<MenuIcon />
					</Button>
				</div>
				<div className="navbar-middle">
					<ul className="flex flex-col gap-3">
						<li>{renderLink("Dashboard", undefined, "/admin/dashboard", <Home />)}</li>
						<li>{renderLink("Projects", undefined, "/admin/projects", <LayoutPanelTop />)}</li>
					</ul>
				</div>
				<div className="navbar-bottom">
					<ul className="flex flex-col gap-3">
						<li>{renderLink("Sign out", logout, undefined, <LogOut />, "whitespace-nowrap text-red-500")}</li>
					</ul>
				</div>
			</nav>
		</AdminSidePanelCSS>
	);
};
