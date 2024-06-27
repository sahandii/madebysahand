import { FC, useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { isAnimatingContext } from "@/context/isAnimatingContext";

interface Props {
	isAnimating?: boolean;
	setIsAnimating?: (isAnimating: boolean) => void;
}

const FooterCSS = styled.div``;

export const Footer: FC<Props> = ({}) => {
	const context = useContext(isAnimatingContext);
	if (!context) {
		throw new Error("isAnimatingContext must be used within its provider");
	}
	const { isAnimating, setIsAnimating } = context;

	return (
		<AnimatePresence>
			{!isAnimating && (
				<motion.footer //
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					key={"footer"}
					transition={{ duration: 0.25, ease: "easeOut" }}
					className="container px-6 py-10 pt-20"
				>
					<FooterCSS className="flex flex-col justify-between md:flex-row md:items-end">
						<div className="footer-left">
							<p className="text-sm font-medium">© 2024 madebysahand</p>
						</div>
						<div className="footer-right">
							<div className="social-media--container max-md:pt-5 md:text-right">
								<p className="text-sm font-medium text-zinc-400">Social media</p>
								<ul className="flex flex-row pt-1">
									<li>
										<a className="flex text-sm font-medium hover:underline max-md:mr-5 md:px-5" href="https://instagram.com/madebysahand" target="_blank">
											Instagram
										</a>
									</li>
									<li>
										<a className="flex text-sm font-medium hover:underline max-md:mr-5 md:px-5" href="https://behance.net/sporkar" target="_blank">
											Behance
										</a>
									</li>
									<li>
										<a className="-mr-5 flex text-sm font-medium hover:underline max-md:mr-5 md:px-5" href="#" target="_blank">
											Artstation
										</a>
									</li>
								</ul>
							</div>
						</div>
					</FooterCSS>
				</motion.footer>
			)}
		</AnimatePresence>
	);
};
