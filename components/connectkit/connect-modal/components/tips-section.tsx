import React from "react";
import classNames from "classnames";

export type TipsSectionProps = React.HTMLAttributes<HTMLDivElement>;

export function TipsSection({
	className,
	children,
	...props
}: TipsSectionProps) {
	return (
		<div
			{...props}
			className={classNames(
				className,
				"relative pl-8px font-400 text-14px text-[#999]"
			)}
		>
			<div className="absolute bg-#6AD991 w-3px left-0 top-0 bottom-0 rounded-full" />
			{children}
		</div>
	);
}
