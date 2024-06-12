import { useRouter } from "next/router";
import ProjectForm from "@/components/admin/ProjectForm";

const EditProject: React.FC = () => {
	const router = useRouter();
	const { id } = router.query; // Fetch the project ID from the URL

	return <ProjectForm projectId={id as string} />;
};

export default EditProject;
