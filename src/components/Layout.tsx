import { FC } from "react";
import { motion } from "framer-motion";
import { easeInOutQuart } from "@/assets/easings";

interface Props {
	children: React.ReactNode;
	isAnimating?: boolean | undefined;
	setIsAnimating?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const variants = {
	hidden: { opacity: 0, x: 0, y: "5vh" },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: "-10vw", y: 0 },
};

const Layout: FC<Props> = ({ children, isAnimating, setIsAnimating }) => {
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
					if (setIsAnimating) {
						setIsAnimating(true);
					}
				}}
				onAnimationComplete={(definition) => {
					if (definition === "enter") {
						if (setIsAnimating) {
							setIsAnimating(false);
						}
					}
				}}
			>
				{children}
			</motion.div>
		</>
	);
};

export default Layout;
