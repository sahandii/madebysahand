import AdminLayout from "@/components/layouts/AdminLayout";
import withAuth from "@/components/withAuth";
import Head from "next/head";

interface Props {}

const AdminPage: React.FC<Props> = () => {
	return (
		<>
			<Head>
				<title>Dashboard | Sahand Porkar</title>
			</Head>
			<h1>Dashboard</h1>
		</>
	);
};

export default withAuth(AdminPage);
