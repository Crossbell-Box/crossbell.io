import React from "react";
import { Text } from "@mantine/core";

import { useAccountCharacter } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";

import { Illustration } from "./empty-placeholder.illustration";

export type EmptyPlaceholderProps = {
	onLike: () => void;
};

export function EmptyPlaceholder({ onLike }: EmptyPlaceholderProps) {
	const currentCharacter = useAccountCharacter();

	return (
		<div className="flex flex-col items-center pt-17px text-22px font-400">
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

			<div className="p-24px w-full">
				<button
					onClick={onLike}
					className="flex items-center justify-center w-full gap-[8px] rounded-16px bg-[#F6C549] text-[#FFF] hover:text-[#E65040] text-16px font-500 border-none p-20px cursor-pointer transform active:translate-y-1px"
				>
					<Text className="i-csb:favorite-fill text-24px" />
					Like
				</button>
			</div>
		</div>
	);
}
