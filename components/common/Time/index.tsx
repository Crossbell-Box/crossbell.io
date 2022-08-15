import { formatDate, formatDateFromNow } from "@/utils/time";
import { Tooltip, Text, TextProps } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useEffect, useState } from "react";

export default function Time({
	href,
	date,
	mode = "accurate",
	...props
}: {
	href?: string;
	date: string;
	mode?: "fromNow" | "accurate";
} & TextProps) {
	// TODO: need a better way to handle this
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return isMounted ? (
		<Tooltip label={formatDate(date)}>
			{/* @ts-ignore */}
			<Text
				{...(href ? { component: NextLink, href, variant: "link" } : {})}
				// component={NextLink}
				// href={href}
				// variant="link"
				color="dimmed"
				size="sm"
				{...props}
			>
				{mode === "accurate" && formatDate(date)}
				{mode === "fromNow" && formatDateFromNow(date)}
			</Text>
		</Tooltip>
	) : null;
}
