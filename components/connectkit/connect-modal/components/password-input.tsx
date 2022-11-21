import React from "react";
import classNames from "classnames";

import { Text } from "@mantine/core";

export type PasswordInputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"type"
> & {
	visible: boolean;
	onVisibleChange: (visible: boolean) => void;
};

export function PasswordInput({
	visible,
	onVisibleChange,
	className,
	...props
}: PasswordInputProps) {
	return (
		<div className={classNames(className, "h-44px relative")}>
			<input
				className={
					"transition h-full w-full rounded-12px border-none px-12px bg-[#1C1B1F] bg-opacity-4 focus:bg-opacity-6 outline-none"
				}
				type={visible ? "text" : "password"}
				{...props}
			/>
			<div className="transition absolute cursor-pointer right-8px p-8px top-1/2 transform -translate-y-1/2 text-16px text-[#999] hover:text-[#000]">
				{visible ? (
					<Text
						className="i-csb:eye-close"
						onClick={() => onVisibleChange(false)}
					/>
				) : (
					<Text
						className="i-csb:eye-open"
						onClick={() => onVisibleChange(true)}
					/>
				)}
			</div>
		</div>
	);
}
