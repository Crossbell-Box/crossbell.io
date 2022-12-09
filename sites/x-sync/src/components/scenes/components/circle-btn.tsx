import React from "react";
import classNames from "classnames";

export type CircleBtnProps = React.HTMLAttributes<HTMLButtonElement> & {
	size?: number;
};

export function CircleBtn({
	size = 64,
	style: style_,
	className,
	...props
}: CircleBtnProps) {
	const style = React.useMemo(
		(): React.CSSProperties => ({ width: size, height: size, ...style_ }),
		[size, style_]
	);

	return (
		<button
			{...props}
			className={classNames(
				"flex items-center justify-center rounded-full cursor-pointer transition",
				"text-[#A9B4CF] border border-solid border-1 border-[#E1E8F7] backdrop-filter backdrop-blur-7.5px",
				"bg-[#E1E8F7] bg-opacity-30 hover:bg-opacity-40 active:bg-opacity-60",
				className
			)}
			style={style}
		/>
	);
}
