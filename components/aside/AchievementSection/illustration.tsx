import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { Button, Text } from "@mantine/core";

import { useCharacterRouterQuery } from "@/utils/url";
import BaseSection from "@/components/aside/BaseSection";

export type IllustrationProps = {
	url: StaticImageData;
	buttonText: string;
};

export function Illustration({ url, buttonText }: IllustrationProps) {
	const { handle } = useCharacterRouterQuery();

	return (
		<BaseSection title={null}>
			<div className="relative z-0">
				<div className="pointer-events-none leading-0">
					<Image src={url} alt={`${buttonText} Illustration`} />
				</div>

				<div className="absolute left-0 top-0 w-full h-full flex flex-col items-center">
					<Text className="text-[#687792] text-16px leading-24px font-500 tracking-0.15px mb-8px self-stretch p-16px">
						Achievement
					</Text>
					<Link href={`/@${handle}/achievement`} passHref>
						<Button
							className="mt-auto mb-16px px-24px"
							color="purple"
							radius="xl"
							size="md"
						>
							{buttonText}
						</Button>
					</Link>
				</div>
			</div>
		</BaseSection>
	);
}
