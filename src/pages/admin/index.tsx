import { useState, useEffect } from "react";
import { useAuth } from "@/firebase/useAuth";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = () => {
	const { user, login } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push("/admin/dashboard");
		}
	}, [user, router]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(email, password);
			router.push("/admin/dashboard");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Head>
				<title>Log in | Sahand Porkar</title>
				<meta name="description" content="The dashboard of all dashboards <3" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{!user && (
				<div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
					<div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
						<div className="flex flex-col items-center p-6 sm:p-8">
							<a href="./admin" className="w-100 mb-6 block text-center text-2xl font-semibold text-gray-900 dark:text-white">
								madebysahand
							</a>
							<form onSubmit={handleLogin}>
								<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-4 w-full rounded border border-gray-300 p-3" />
								<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 w-full rounded border border-gray-300 p-3" />
								<Button className="w-full py-7" type="submit">
									Login
								</Button>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default AdminPage;
