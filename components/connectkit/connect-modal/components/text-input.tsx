import React from "react";
import classNames from "classnames";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	rightSection?: React.ReactNode;
};

export function TextInput({
	rightSection,
	className,
	...props
}: TextInputProps) {
	return (
		<div className={classNames(className, "h-44px relative")}>
			<input
				className={
					"transition h-full w-full rounded-12px border-none px-12px bg-[#1C1B1F] bg-opacity-4 focus:bg-opacity-6 outline-none"
				}
				{...props}
			/>
			<div className="absolute right-0 top-1/2 h-full transform -translate-y-1/2">
				{rightSection}
			</div>
		</div>
	);
}
