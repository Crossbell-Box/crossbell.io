import { Card, Title } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function BaseSection({
	title,
	children,
}: PropsWithChildren<{ title: string }>) {
	return (
		<Card style={{ boxShadow: "0px 0px 10px rgba(38, 108, 158, 0.1)" }}>
			<Title order={6} className="text-[#687792]">
				{title}
			</Title>

			<Card.Section>{children}</Card.Section>
		</Card>
	);
}
