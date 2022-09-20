import React from "react";
import { Card, Text, CardProps } from "@mantine/core";
import classNames from "classnames";

export type BaseSectionProps = CardProps & {
	title: React.ReactNode;
};

export default function BaseSection({
	title,
	children,
	className,
	...props
}: BaseSectionProps) {
	return (
		<Card
			className={classNames(
				"border border-solid border-[#E1E8F7] rounded-12px bg-[#FCFDFF]",
				className
			)}
			{...props}
		>
			{typeof title === "string" ? (
				<Text className="text-[#687792] text-16px leading-24px font-500 tracking-0.15px mb-8px">
					{title}
				</Text>
			) : (
				title
			)}

			<Card.Section>{children}</Card.Section>
		</Card>
	);
}
