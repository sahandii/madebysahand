import { usePathname } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import { useAuth } from "@/firebase/useAuth";
import { Button } from "../ui/button";
import { Home, LayoutPanelTop, Settings2 } from "lucide-react";

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
		<AdminSidePanelCSS className="side-panel bg-white w-[250px] border-r">
			<div className="flex flex-col justify-between h-full p-3">
				<nav className="p-3 grid items-start text-sm font-medium">
					<ul>
						<li>
							<Link href="/admin" className={`flex items-center gap-2 rounded-lg p-3 pr-10 text-muted-foreground transition-all hover:text-primary ${pathname === "/admin" ? "text-primary pointer-events-none" : ""}`}>
								<Home className="mt-[-2px] w-5 h-5" />
								Dashboard
							</Link>
						</li>
						<li>
							<Link href="/admin/projects" className={`flex items-center gap-2 rounded-lg p-3 pr-10 text-muted-foreground transition-all hover:text-primary ${pathname === "/admin/projects" ? "text-primary bg-zinc-200 pointer-events-none" : ""}`}>
								<LayoutPanelTop className="mt-[-2px] w-5 h-5" />
								Projects
							</Link>
						</li>
						{/* <li>
							<Link href="#" className={`flex items-center gap-2 rounded-lg p-3 pr-10 text-muted-foreground transition-all hover:text-primary ${pathname === "/admin/settings" ? "text-primary bg-zinc-200 pointer-events-none" : ""}`}>
								<Settings2 className="mt-[-2px] w-5 h-5" />
								Settings
							</Link>
						</li> */}
					</ul>
				</nav>
				<Button variant={"outline"} onClick={logout}>
					<span className="text-red-500">Logout</span>
				</Button>
			</div>
		</AdminSidePanelCSS>
	);
};
