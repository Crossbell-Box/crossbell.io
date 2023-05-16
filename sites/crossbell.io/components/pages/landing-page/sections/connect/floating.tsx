import React from "react";
import { motion, Variants } from "framer-motion";

type FloatVariantsOptions = {
	x: number;
	y: number;
	duration: number;
	delay: number;
};

const floatVariants = ({
	x,
	y,
	duration,
	delay,
}: FloatVariantsOptions): Variants => ({
	up: {
		y: -y,
		x: -x,
		transition: { duration, delay, repeat: Infinity, repeatType: "mirror" },
	},
	down: {
		y: y,
		x: x,
		transition: { duration, delay, repeat: Infinity, repeatType: "mirror" },
	},
});

export type FloatingProps = Partial<FloatVariantsOptions> & {
	children: React.ReactNode;
};

export const Floating = ({
	children,
	x = 0,
	y = 10,
	duration = 2,
	delay = 0,
}: FloatingProps) => {
	return (
		<motion.div
			initial="up"
			animate="down"
			variants={floatVariants({ x, y, duration, delay })}
		>
			{children}
		</motion.div>
	);
};
