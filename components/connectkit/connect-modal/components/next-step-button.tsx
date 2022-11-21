import React from "react";
import classNames from "classnames";

export type NextStepButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function NextStepButton({
	className,
	disabled,
	...props
}: NextStepButtonProps) {
	return (
		<button
			className={classNames(
				"transition text-black px-40px py-14px border-none rounded-16px text-14px font-500 font-roboto",
				disabled
					? "cursor-not-allowed bg-[#F6F7F9] text-[#000]"
					: "cursor-pointer bg-[#6AD991] text-[#FFF]",
				className
			)}
			disabled={disabled}
			{...props}
		/>
	);
}
