import { formatDate, formatDateFromNow, formatToRFC3339 } from "@/utils/time";
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
	// TODO: need a better way to handle this for SSR
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<Tooltip label={isMounted ? formatDate(date) : formatToRFC3339(date)}>
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
				{isMounted ? (
					<>
						{mode === "accurate" && formatDate(date)}
						{mode === "fromNow" && formatDateFromNow(date)}
					</>
				) : (
					formatToRFC3339(date)
				)}
			</Text>
		</Tooltip>
	);
}
