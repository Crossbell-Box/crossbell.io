import { formatDate, formatDateFromNow, formatToISO } from "~/shared/time";
import { Tooltip, Text, TextProps } from "@mantine/core";
import Link from "next/link";
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

	const Content = isMounted ? (
		<>
			{mode === "accurate" && formatDate(date)}
			{mode === "fromNow" && formatDateFromNow(date)}
		</>
	) : (
		formatToISO(date)
	);

	return (
		<Tooltip label={isMounted ? formatDate(date) : formatToISO(date)}>
			{href ? (
				<Text
					variant="link"
					component={Link}
					href={href}
					color="dimmed"
					size="sm"
					{...props}
				>
					{Content}
				</Text>
			) : (
				<Text color="dimmed" size="sm" {...props}>
					{Content}
				</Text>
			)}
		</Tooltip>
	);
}
