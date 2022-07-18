import { Tooltip as Tooltip_, TooltipProps, Text } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function Tooltip({
	children,
	label,
	...props
}: PropsWithChildren<TooltipProps>) {
	return (
		<Tooltip_
			position="bottom"
			openDelay={500}
			transition="fade"
			label={typeof label === "string" ? <Text size="xs">{label}</Text> : label}
			{...props}
		>
			{children}
		</Tooltip_>
	);
}
