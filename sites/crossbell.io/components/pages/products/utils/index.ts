import { useHotkeys, useViewportSize, useWindowScroll } from "@mantine/hooks";
import { useScroll } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

export const draw = {
	hidden: { pathLength: 0, opacity: 0 },
	visible: (i: number) => {
		const delay = 1 + i * 0.5;
		return {
			pathLength: 1,
			opacity: 1,
			transition: {
				pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
				opacity: { delay, duration: 0.01 },
			},
		};
	},
};

export const useScroller = (maxIndex: number) => {
	const { scrollYProgress } = useScroll();

	const [_, scrollTo] = useWindowScroll();
	const { height } = useViewportSize();

	const [indexValue, setIndexValue] = useState(0);

	const setIndex = useCallback(
		(i: number | ((prevI: number) => number)) => {
			if (typeof i === "number") {
				scrollTo({ y: i * height });
			} else {
				const currentIndex = indexValue;
				const nextIndex = i(currentIndex);
				scrollTo({ y: nextIndex * height });
			}
		},
		[height, scrollTo, indexValue]
	);

	useHotkeys([
		["ArrowUp", () => setIndex((index) => (index === 0 ? 0 : index - 1))],
		[
			"ArrowDown",
			() => setIndex((index) => (index === maxIndex ? maxIndex : index + 1)),
		],
	]);

	useEffect(() => {
		scrollYProgress.onChange((v) => {
			const newIndex = Math.round(v * maxIndex);
			setIndexValue(newIndex);
		});

		return () => {
			scrollYProgress.clearListeners();
		};
	}, [scrollYProgress]);

	// console.log({ indexValue });

	return { index: indexValue, setIndex };
};
