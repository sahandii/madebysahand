import React from "react";
import { AdminSidePanel } from "../admin/AdminSidePanel";
import { useAuth } from "@/firebase/useAuth";
import styled from "styled-components";

interface props {
	children: React.ReactNode;
}
const AdminLayoutCSS = styled.div`
	body,
	html {
		margin: 0;
		padding: 0;
		height: 100%;
	}

	.wrapper {
		display: grid;
		grid-template-columns: max-content 1fr;
		height: 100vh; // Full viewport height
	}
`;
const AdminLayout: React.FC<props> = ({ children }) => {
	const { user, logout } = useAuth();
	return (
		<AdminLayoutCSS>
			<div className="wrapper">
				{user && <AdminSidePanel logout={logout} />}
				<main className={`main-content bg-slate-300 ${!user ? "w-screen" : ""}`}>{children}</main>
			</div>
			<footer>{/* Admin-specific footer content */}</footer>
		</AdminLayoutCSS>
	);
};

export default AdminLayout;
