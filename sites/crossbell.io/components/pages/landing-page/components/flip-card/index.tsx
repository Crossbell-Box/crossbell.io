import React from "react";

import styles from "./index.module.css";
import classNames from "classnames";

export type FlipCardProps = {
	front: React.ReactNode;
	back: React.ReactNode;
	isFlipped: boolean;
	width: number;
	height: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const FlipCard: React.FC<FlipCardProps> = ({
	front,
	back,
	width,
	height,
	isFlipped,
	...props
}) => {
	const className = classNames(
		props.className,
		styles.flipCard,
		isFlipped && styles.flipped
	);

	const cardStyle = {
		...props.style,
		width: `${width}px`,
		height: `${height}px`,
	};

	return (
		<div {...props} className={className} style={cardStyle}>
			<div className={styles.flipCardInner}>
				<div className={styles.flipCardFront}>{front}</div>
				<div className={styles.flipCardBack}>{back}</div>
			</div>
		</div>
	);
};
