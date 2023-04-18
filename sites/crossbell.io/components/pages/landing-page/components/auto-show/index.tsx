import React, { ReactHTML, useEffect, useRef } from "react";
import { HTMLMotionProps, motion, useAnimation } from "framer-motion";

export type AutoShowProps<T extends keyof ReactHTML> = HTMLMotionProps<T> & {
	as?: T;
};

export function AutoShow<T extends keyof ReactHTML = "div">({
	children,
	as,
	...props
}: AutoShowProps<T>) {
	const controls = useAnimation();
	const ref = useRef<HTMLDivElement>(null);
	const [isActive, setIsActive] = React.useState(false);
	// @ts-expect-error
	const MotionComponent = motion[as ?? "div"];

	useEffect(() => {
		const elm = ref.current;

		if (!elm) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsActive(true);
					observer.disconnect();
				}
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: 0.1,
			}
		);

		observer.observe(elm);

		return () => {
			observer.disconnect();
		};
	}, [controls]);

	return (
		<MotionComponent
			ref={ref}
			initial={false}
			animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 50 }}
			transition={{ duration: 0.5, delay: 0.3 }}
			{...props}
		>
			{children}
		</MotionComponent>
	);
}
