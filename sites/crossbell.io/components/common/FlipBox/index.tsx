import React from "react";
import classNames from "classnames";

export type FlipBoxProps = React.HTMLAttributes<HTMLDivElement> & {
	width: string;
	height: string;
	perspective?: string;
	frontSide: React.ReactNode;
	backSide: React.ReactNode;
	isFlipped: boolean;
};

export function FlipBox({
	width,
	height,
	style: style_,
	className,
	frontSide,
	backSide,
	isFlipped,
	...props
}: FlipBoxProps) {
	const style = React.useMemo(
		(): React.CSSProperties => ({ width, height, ...style_ }),
		[width, height, style_]
	);

	return (
		<div
			style={style}
			className={classNames(isFlipped && "children:rotate-y-180", className)}
			{...props}
		>
			<div className="relative w-full h-full transition duration-500 transform preserve-3d">
				<div className="absolute w-full h-full backface-hidden">
					{frontSide}
				</div>
				<div className="absolute w-full h-full backface-hidden transform rotate-y-180">
					{backSide}
				</div>
			</div>
		</div>
	);
}
