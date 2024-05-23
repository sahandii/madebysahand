import React from "react";

interface props {
	children: React.ReactNode;
}

const AdminLayout: React.FC<props> = ({ children }) => {
	return (
		<div>
			<header>{/* Admin-specific header content */}</header>
			<main>{children}</main>
			<footer>{/* Admin-specific footer content */}</footer>
		</div>
	);
};

export default AdminLayout;
