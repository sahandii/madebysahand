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
		<div className={`menu-bar bg-white border-b px-5 flex items-center justify-between ${className}`} {...props}>
			<div className="menu-bar--right flex-1">{titleSection}</div>
			<div className="menu-bar--left">{actionsSection}</div>
		</div>
	);
};
