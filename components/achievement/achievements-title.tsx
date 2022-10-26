import { Text } from "@mantine/core";
import React from "react";
import classNames from "classnames";

export type AchievementTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
	children?: React.ReactNode;
};

export function AchievementsTitle({
	children,
	className,
	...props
}: AchievementTitleProps) {
	return (
		<h3
			className={classNames(
				"text-center text-18px font-600 m-0 flex items-end justify-center",
				className
			)}
			{...props}
		>
			<Text className="i-csb:two-stars text-18px text-purple-primary" />
			<span className="mx-4px">{children}</span>
			<Text className="i-csb:two-stars text-18px text-purple-primary" />
		</h3>
	);
}
