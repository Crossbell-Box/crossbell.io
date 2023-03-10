import { Tooltip as Tooltip_, TooltipProps, Text } from "@mantine/core";
import React from "react";

export function Tooltip({
	children,
	label,
	helpText,
	...props
}: React.PropsWithChildren<TooltipProps> & {
	/** if true, the text passed in will be rendered as a hoverable help text */
	helpText?: boolean;
}) {
	return (
		<Tooltip_
			multiline
			classNames={{
				tooltip: "max-w-80vw",
			}}
			position="bottom"
			openDelay={500}
			transitionProps={{ transition: "fade" }}
			label={typeof label === "string" ? <Text size="xs">{label}</Text> : label}
			{...props}
		>
			{helpText ? (
				<Text className="inline border-b-1 border-b-dashed border-b-black/20 hover:border-b-black cursor-help transition-border-color">
					{children}
				</Text>
			) : (
				children
			)}
		</Tooltip_>
	);
}
