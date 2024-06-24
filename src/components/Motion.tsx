import { FC, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { easeInOutQuart } from "@/assets/easings";
import { isAnimatingContext } from "@/context/isAnimatingContext";

interface Props {
	children: React.ReactNode;
}

const variants = {
	hidden: { opacity: 0, x: 0, y: "5vh" },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: "-3vw", y: 0 },
};

const Motion: FC<Props> = ({ children }) => {
	const context = useContext(isAnimatingContext);

	if (!context) {
		throw new Error("isAnimatingContext must be used within its provider");
	}

	const { isAnimating, setIsAnimating } = context;

	return (
		<>
			<motion.div
				variants={variants} // Pass the variant object into Framer Motion
				initial="hidden" // Set the initial state to variants.hidden
				animate="enter" // Animated state to variants.enter
				exit="exit"
				transition={{
					ease: easeInOutQuart,
					duration: 0.75,
				}}
				onAnimationStart={() => {
					new Promise<void>((resolve) => {
						setIsAnimating(true);
						resolve();
					}).then(() => {
						if (window.scrollY !== 0) {
							document.body.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
						}
					});
				}}
				onAnimationComplete={() => {
					setIsAnimating(false);
					console.log("onAnimationComplete");
				}}
			>
				{children}
			</motion.div>
		</>
	);
};

export default Motion;
