import React from "react";
import { useScrollState } from "scrollex";

import { FlipCard } from "../../../components/flip-card";
import { Front } from "./front";
import { Back } from "./back";
import { useMediaQuery } from "@mantine/hooks";
import { breakpoints } from "~/scripts/unocss/breakpoints";

export function Illustration() {
	const [isFlipped, setIsFlipped] = React.useState(false);
	const isMD = useMediaQuery(`(min-width: ${breakpoints.md}px)`);

	const ableToAutoFlip = useScrollState(({ position, section, container }) => {
		const threshold =
			section.topAt("container-center") +
			(isMD ? container.height / 3 : container.height / 4);

		if (position > threshold) {
			return true;
		} else {
			return false;
		}
	});

	React.useEffect(() => {
		if (ableToAutoFlip) {
			setIsFlipped(true);

			const timeout = setTimeout(() => setIsFlipped(false), 2000);

			return () => clearTimeout(timeout);
		}
	}, [ableToAutoFlip]);

	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<FlipCard
			front={<Front isActive={!isFlipped} />}
			back={<Back isActive={isFlipped} />}
			width={isMD ? 327 : 156}
			height={isMD ? 440 : 210}
			isFlipped={isFlipped}
			onClick={handleClick}
			className="mt-[140px] mb-[54px] md:my-0"
		/>
	);
}
