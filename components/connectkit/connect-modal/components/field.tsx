import React from "react";
import classNames from "classnames";

export type FieldProps = {
	title: React.ReactNode;
	icon: React.ReactNode;
	tips?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Field({
	tips,
	title,
	icon,
	children,
	className,
	...props
}: FieldProps) {
	return (
		<div {...props} className={classNames(className, "")}>
			<div className="flex items-center gap-8px mb-6px whitespace-nowrap">
				<div className="flex items-center gap-8px">
					{icon}
					<span className="font-500 text-16px text-[#49454F]">{title}</span>
				</div>
				<div className="ml-auto text-12px flex-grow-0 text-ellipsis overflow-hidden">{tips}</div>
			</div>

			<div className="w-full">{children}</div>
		</div>
	);
}
