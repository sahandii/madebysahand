import AdminLayout from "@/components/layouts/AdminLayout";
import withAuth from "@/components/withAuth";
import Head from "next/head";
import styled from "styled-components";

interface Props {}

const AdminPageCSS = styled.div`
	.legend {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
	}
	.ordered-list {
		position: relative;
	}
	.ordered-list li:after {
		content: counter(ordered-list);
		display: block;
		aspect-ratio: 1 / 1;
		background-color: red;
		position: absolute;
	}
`;

const AdminPage: React.FC<Props> = () => {
	return (
		<>
			<Head>
				<title>Dashboard | Sahand Porkar</title>
			</Head>
			<AdminPageCSS>
				<div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
					<div className="rounded-2xl bg-white p-8">
						<h5 className="legend font-medium">Total visits</h5>
						<p className="text-6xl font-medium">60</p>
					</div>
					<div className="rounded-2xl bg-white p-8">
						<h5 className="legend mb-4 font-medium">Most viewed page</h5>
						<ol className="ordered-list space-y-2">
							<li className="border-b py-2">http://......com</li>
							<li className="border-b py-2">http://......com</li>
							<li className="border-b py-2">http://......com</li>
							<li className="border-b py-2">http://......com</li>
							<li className="border-b py-2">http://......com</li>
						</ol>
					</div>
				</div>
			</AdminPageCSS>
		</>
	);
};

export default withAuth(AdminPage);
