import { useState, useEffect } from "react";
import { useAuth } from "@/firebase/useAuth";
import AdminLayout from "@/components/layouts/AdminLayout";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/assets/icons/google.svg";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = ({}) => {
	const { user, login, register, logout } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isRegistering, setIsRegistering] = useState(false);
	useEffect(() => {
		// Optionally, set up real-time updates if necessary
	}, []);

	const handleLogin = async () => {
		await login(email, password);
	};

	// const handleRegister = async () => {
	// 	await register(email, password);
	// };

	if (!user) {
		return (
			<>
				<Head>
					<title>Log in | Sahand Porkar</title>
					<meta name="description" content="The dashboard of all dashboards <3" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 sm:p-8 flex flex-col items-center">
							<a href="./admin" className="text-center block w-100 mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
								madebysahand
							</a>
							<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-4 p-3 border border-gray-300 rounded" />
							<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-4 p-3 border border-gray-300 rounded" />
							<Button className="py-7 w-full" onClick={handleLogin}>
								Login
							</Button>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Head>
				<title>Dashboard | Sahand Porkar</title>
				<meta name="description" content="The dashboard of all dashboards <3" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="more-to-come"></div>
		</>
	);
};

(AdminPage as any).layout = AdminLayout;

export default AdminPage;
