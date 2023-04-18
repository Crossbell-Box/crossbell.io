import React from "react";
import { motion, Variants } from "framer-motion";

export type CirclesBgProps = React.SVGAttributes<SVGSVGElement>;

const circleVariants: Variants = {
	hidden: (i: number) => ({
		opacity: 0,
		transition: {
			delay: i * 0.1,
			duration: 1,
			repeat: Infinity,
			repeatType: "reverse",
		},
	}),
	visible: (i: number) => ({
		opacity: (24 - i) / 24,
		transition: {
			delay: i * 0.1,
			duration: 1,
			repeat: Infinity,
			repeatType: "reverse",
		},
	}),
};

export function CirclesBg(props: CirclesBgProps) {
	return (
		<svg
			fill="none"
			height="1024"
			viewBox="0 0 1024 1024"
			width="1024"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g stroke="#e1e8f7" strokeOpacity=".5">
				{[...Array(24)].map((_, i) => (
					<motion.circle
						key={i}
						cx="512"
						cy="512"
						r={(i + 1) * 20.8478}
						custom={i}
						initial="hidden"
						animate="visible"
						variants={circleVariants}
					/>
				))}
			</g>
		</svg>
	);
}
