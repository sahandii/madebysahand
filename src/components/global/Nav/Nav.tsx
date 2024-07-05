import { Button } from "@/components/ui/button";
import { useAuth } from "@/firebase/useAuth";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { motion } from "framer-motion";

interface Props {}

export const Nav: FC<Props> = ({}) => {
	const { user } = useAuth();
	const dashboardVariants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.5,
				type: "tween",
				ease: "anticipate",
			},
		},
	};

	return (
		// z-[99] sticky top-0
		<nav className="navbar bg-zinc-50">
			<div className="container flex min-h-[70px] flex-row items-center justify-between border-b border-zinc-400 px-4">
				<div className="navbar-left flex flex-row">
					<Link scroll={false} className="flex" href="/">
						<h5 className="navbar-logo text-2xl font-bold">Sahand Porkar</h5>
					</Link>
				</div>
				<div className="navbar-right">
					<ul className="navbar-menu mt-[.4rem] flex flex-row text-sm">
						{user && (
							<motion.div variants={dashboardVariants} initial="hidden" animate="visible">
								<li>
									<Link scroll={false} target="_blank" href="/admin/dashboard" className="flex px-3 font-medium hover:underline md:px-5">
										Admin
									</Link>
								</li>
							</motion.div>
						)}
						<li>
							<Link scroll={false} href="/about" className="flex px-3 font-medium hover:underline md:px-5">
								About me
							</Link>
						</li>
						<li>
							<Link scroll={false} href="mailto:hello@sporkar.com" target="_blank" className="-mr-3 flex px-3 font-medium hover:underline md:-mr-5 md:px-5">
								Contact
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
