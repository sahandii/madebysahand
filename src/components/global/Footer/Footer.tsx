import { FC } from "react";

interface Props {}

export const Footer: FC<Props> = ({}) => {
	return (
		<footer className="container flex flex-row justify-between items-end pt-20 py-10">
			<div className="footer-left">
				<p className="text-sm font-medium">© 2023 Sahand Porkar</p>
			</div>
			<div className="footer-right">
				<div className="social-media--container text-right">
					<p className="title text-[13px] font-medium opacity-50">Social media</p>
					<ul className="flex flex-row pt-2">
						<li>
							<a className="hover:underline font-medium px-5 text-sm flex" href="https://instagram.com/madebysahand" target="_blank">
								Instagram
							</a>
						</li>
						<li>
							<a className="hover:underline font-medium px-5 text-sm flex" href="#" target="_blank">
								Behance
							</a>
						</li>
						<li>
							<a className="hover:underline font-medium px-5 text-sm flex -mr-5" href="#" target="_blank">
								Artstation
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};
