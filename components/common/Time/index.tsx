import { formatDate, formatDateFromNow } from "@/utils/time";
import { Tooltip, Text, TextProps } from "@mantine/core";
import { NextLink } from "@mantine/next";

export default function Time({
	href,
	date,
	mode = "accurate",
	...props
}: {
	href: string;
	date: string;
	mode?: "fromNow" | "accurate";
} & TextProps) {
	return (
		<Tooltip label={formatDate(date)}>
			<Text
				component={NextLink}
				href={href}
				color="dimmed"
				size="sm"
				variant="link"
				{...props}
			>
				{mode === "accurate" && formatDate(date)}
				{mode === "fromNow" && formatDateFromNow(date)}
			</Text>
		</Tooltip>
	);
}
