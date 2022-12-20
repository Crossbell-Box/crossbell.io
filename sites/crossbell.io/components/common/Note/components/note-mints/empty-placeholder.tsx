import React from "react";
import { Text } from "@mantine/core";

import { useAccountCharacter } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";

import { Illustration } from "./empty-placeholder.illustration";

export function EmptyPlaceholder() {
	const currentCharacter = useAccountCharacter();

	return (
		<div className="flex flex-col items-center pt-15px pb-64px text-22px font-400">
			<Illustration className="mb-35px" />

			{currentCharacter && (
				<div className="mb-8px">
					Hi, {extractCharacterName(currentCharacter)}
				</div>
			)}

			<div>
				Nobody here, click
				<Text className="inline-block text-28px text-[#677783] i-csb:mint mx-8px transform translate-y-1/5" />
				to become the first owner.
			</div>
		</div>
	);
}
