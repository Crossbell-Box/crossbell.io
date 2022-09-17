import { Card, Title, CardProps } from "@mantine/core";

export type BaseSectionProps = CardProps & {
	title: string;
};

export default function BaseSection({
	title,
	style,
	children,
	...props
}: BaseSectionProps) {
	return (
		<Card
			{...props}
			style={{ boxShadow: "0px 0px 10px rgba(38, 108, 158, 0.1)", ...style }}
		>
			<Title order={6} className="text-[#687792]">
				{title}
			</Title>

			<Card.Section>{children}</Card.Section>
		</Card>
	);
}
