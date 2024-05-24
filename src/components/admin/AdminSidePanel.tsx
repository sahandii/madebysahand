import { usePathname } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import { useAuth } from "@/firebase/useAuth";
import { Button } from "../ui/button";

interface AdminSidePanelProps {
	menuItems?: number;
	logout: () => void;
}

const AdminSidePanelCSS = styled.div`
	/* a.active {
		backgro
	} */
`;

export const AdminSidePanel: React.FC<AdminSidePanelProps> = () => {
	const pathname = usePathname();
	const { logout } = useAuth();
	return (
		<AdminSidePanelCSS className="side-panel bg-white w-full min-w-[250px] border-r">
			<div className="flex flex-col justify-between h-full p-3">
				<nav className="grid items-start text-sm font-medium">
					<ul>
						<li>
							<Link href="/admin" className={`text-2xl flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === "/admin" ? "text-primary pointer-events-none" : ""}`}>
								Dashboard
							</Link>
						</li>
						<li className="mt-2">
							<Link href="/admin/projects" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === "/admin/projects" ? "text-primary bg-zinc-200 pointer-events-none" : ""}`}>
								Projects
							</Link>
						</li>
						<li>
							<Link href="#" className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname === "/admin/settings" ? "text-primary bg-zinc-200 pointer-events-none" : ""}`}>
								Settings
							</Link>
						</li>
					</ul>
				</nav>
				<Button variant={"outline"} onClick={logout}>
					<span className="text-red-500">Logout</span>
				</Button>
			</div>
		</AdminSidePanelCSS>
	);
};
