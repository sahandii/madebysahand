import { useRouter } from "next/router";
import ProjectForm from "@/components/admin/ProjectForm";
import Head from "next/head";
import { Project } from "@/data/projects";
import { ref, get } from "firebase/database";
import { db } from "@/firebase/firebaseConfig";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

interface Props {
	project: Project | null;
}

interface Params extends ParsedUrlQuery {
	id: string;
}

const EditProject: React.FC<Props> = ({ project }) => {
	const router = useRouter();
	const { id } = router.query; // Fetch the project ID from the URL

	if (!project) {
		return <p>Loading...</p>; // Or handle it as you like
	}

	return (
		<>
			<Head>
				<title>✏️ {project.title} | Sahand Porkar</title>
				<meta name="description" content={`Editing project ${project.title}`} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ProjectForm projectId={id as string} />
		</>
	);
};

export default EditProject;

export const getServerSideProps: GetServerSideProps<Props, Params> = async (context: GetServerSidePropsContext<Params>) => {
	const { id } = context.params!;
	const projectRef = ref(db, `projects/${id}`);
	const snapshot = await get(projectRef);

	if (!snapshot.exists()) {
		return {
			notFound: true,
		};
	}

	const project: Project = snapshot.val();

	return {
		props: {
			project,
		},
	};
};
