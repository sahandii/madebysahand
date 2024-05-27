import { useAuth } from "@/firebase/useAuth";
import { useRouter } from "next/router";
import { useEffect, ComponentType, ReactElement, ReactNode } from "react";
import { Loader2 } from "lucide-react";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
	const ComponentWithAuth = (props: P) => {
		const { user, loading } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!loading && !user) {
				router.push("/admin");
			}
		}, [user, loading, router]);

		if (loading) {
			return (
				<div className="flex flex-col w-screen h-screen items-center justify-center">
					<div className="text-center bg-white rounded-md shadow-2xl shadow-slate-300 py-10 pb-8 px-20">
						<div className="inline-flex scale-[1.8]">
							<Loader2 className="text-black animate-spin" />
						</div>
						<p className="mt-3">Loading</p>
					</div>
				</div>
			);
		}

		if (!user) {
			return null;
		}

		return <WrappedComponent {...props} />;
	};

	return ComponentWithAuth;
};

export default withAuth;
