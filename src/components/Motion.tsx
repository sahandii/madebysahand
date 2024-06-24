import { FC, useContext } from "react";
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

	const scrollToTop = () => {
		if (window.scrollY !== 0) {
			const handleScroll = () => {
				if (window.scrollY === 0) {
					window.removeEventListener("scroll", handleScroll);
				}
			};
			window.addEventListener("scroll", handleScroll);
			document.documentElement.scrollIntoView({ behavior: "smooth" });
		} else return;
	};

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
						scrollToTop();
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
