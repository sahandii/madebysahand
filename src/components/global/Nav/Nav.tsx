import { Button } from "@/components/ui/button";
import { useAuth } from "@/firebase/useAuth";
import Link from "next/link";
import { FC } from "react";

interface Props {}

export const Nav: FC<Props> = ({}) => {
	const { user } = useAuth();
	return (
		// z-[99] sticky top-0
		<nav className="navbar bg-zinc-50">
			<div className="px-6 container flex flex-row justify-between min-h-[70px] items-center border-b border-zinc-400">
				<div className="navbar-left flex flex-row">
					<Link className="flex" scroll={false} href="/">
						<h5 className="navbar-logo font-bold text-2xl leading-[38px]">Sahand Porkar</h5>
					</Link>
					{user && (
						<Button className="ms-4">
							<Link href="./admin" target="_blank">
								Dashboard ↘
							</Link>
						</Button>
					)}
				</div>
				<div className="navbar-right">
					<ul className="navbar-menu flex flex-row text-sm mt-[.4rem]">
						<li>
							<Link scroll={false} href="/about" className="font-medium hover:underline flex px-3 md:px-5">
								About
							</Link>
						</li>
						<li>
							<Link href="mailto:hello@sporkar.com" target="_blank" className="font-medium hover:underline flex px-3 md:px-5 -mr-3 md:-mr-5">
								Contact
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
