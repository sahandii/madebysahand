import { FC } from "react";

interface Props {}

export const Nav: FC<Props> = ({}) => {
	return (
		<nav className="z-[99] sticky top-0 navbar bg-zinc-50">
			<div className="container flex flex-row justify-between min-h-[70px] items-center">
				<div className="navbar-left">
					<h5 className="navbar-logo font-bold text-2xl">Made by Sahand</h5>
				</div>
				<div className="navbar-right">
					<ul className="navbar-menu flex flex-row text-md mt-1">
						<li>
							<a href="#" className="hover:underline flex px-5">
								About
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline flex px-5 -mr-5">
								Contact
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
