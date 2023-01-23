import Link from "next/link";
import { FC } from "react";

interface Props {}

export const Nav: FC<Props> = ({}) => {
	return (
		// z-[99] sticky top-0
		<nav className="navbar bg-zinc-50">
			<div className="px-6 container flex flex-row justify-between min-h-[70px] items-center">
				<div className="navbar-left">
					<Link scroll={false} href="/">
						<h5 className="navbar-logo font-bold text-2xl">Sahand Porkar</h5>
					</Link>
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
