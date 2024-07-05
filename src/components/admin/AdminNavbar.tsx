import Link from "next/link";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface AdminNavbarProps {
	titleSection: ReactNode;
	actionsSection: ReactNode;
	className?: string;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ titleSection, actionsSection, className, ...props }) => {
	return (
		<div className={`menu-bar flex items-center justify-between border-b bg-white px-3 ${className}`} {...props}>
			<div className="menu-bar--right flex-1">{titleSection}</div>
			<div className="menu-bar--left">{actionsSection}</div>
		</div>
	);
};
