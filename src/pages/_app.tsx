import { useState, ReactElement, ReactNode, ComponentType } from "react";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/firebase/useAuth";
import "@/styles/globals.css";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useRouter } from "next/router";

type NextPageWithLayout<P = {}> = ComponentType<P> & {
	layout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const App = ({ Component, pageProps, router }: AppPropsWithLayout): JSX.Element => {
	const [isAnimating, setIsAnimating] = useState<boolean>(false);

	const getLayout = (Component: NextPageWithLayout): ((page: ReactElement) => ReactNode) => {
		if (router.pathname.startsWith("/admin")) {
			return (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;
		}
		return Component.layout || ((page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>);
	};

	const Layout = getLayout(Component);

	return <AuthProvider>{Layout(<Component {...pageProps} isAnimating={isAnimating} setIsAnimating={setIsAnimating} key={router.asPath} />)}</AuthProvider>;
};

export default App;
