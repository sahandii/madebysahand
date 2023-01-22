import { FC } from "react";
import styled from "styled-components";

interface Props {
	isAnimating?: boolean;
	setIsAnimating?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const FooterCSS = styled.div`
	&.show {
		opacity: 1;
	}

	& {
		will-change: opacity;
		transition: opacity 0.25s linear 0s;
		opacity: 0;
	}
`;

export const Footer: FC<Props> = ({ isAnimating }) => {
	return (
		<footer className="px-6 container pt-20 py-10">
			<FooterCSS className={`${isAnimating ? "" : "show"} flex flex-col md:flex-row justify-between md:items-end`}>
				<div className="footer-left">
					<p className="text-sm font-medium">© 2023 Sahand Porkar</p>
				</div>
				<div className="footer-right">
					<div className="social-media--container max-md:pt-5 md:text-right">
						<p className="title text-[13px] font-medium opacity-50">Social media</p>
						<ul className="flex flex-row pt-1">
							<li>
								<a className="hover:underline font-medium max-md:mr-5 md:px-5 text-sm flex" href="https://instagram.com/sahandporkar" target="_blank">
									Instagram
								</a>
							</li>
							<li>
								<a className="hover:underline font-medium max-md:mr-5 md:px-5 text-sm flex" href="https://behance.net/sporkar" target="_blank">
									Behance
								</a>
							</li>
							<li>
								<a className="hover:underline font-medium max-md:mr-5 md:px-5 text-sm flex -mr-5" href="#" target="_blank">
									Artstation
								</a>
							</li>
						</ul>
					</div>
				</div>
			</FooterCSS>
		</footer>
	);
};
