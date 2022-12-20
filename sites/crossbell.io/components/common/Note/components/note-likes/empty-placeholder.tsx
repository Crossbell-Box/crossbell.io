import React from "react";
import { Text } from "@mantine/core";

import { useAccountCharacter } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";

import { Illustration } from "./empty-placeholder.illustration";

export function EmptyPlaceholder() {
	const currentCharacter = useAccountCharacter();

	return (
		<div className="flex flex-col items-center pt-17px pb-64px text-22px font-400">
			<Illustration className="mb-22px" />

			{currentCharacter && (
				<div className="mb-8px">
					Hi, {extractCharacterName(currentCharacter)}
				</div>
			)}

			<div>
				Nobody here, click
				<Text className="inline-block text-28px text-[#677783] i-csb:like mx-8px transform translate-y-1/5" />
				to encourage creation.
			</div>
		</div>
	);
}
