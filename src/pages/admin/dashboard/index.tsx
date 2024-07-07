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
				<></>
			</AdminPageCSS>
		</>
	);
};

export default withAuth(AdminPage);
