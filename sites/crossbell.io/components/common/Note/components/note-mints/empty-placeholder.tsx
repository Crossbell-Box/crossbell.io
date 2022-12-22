import React from "react";
import { Text } from "@mantine/core";

import { useAccountCharacter } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";

import { Illustration } from "./empty-placeholder.illustration";

export type EmptyPlaceholderProps = {
	onMint: () => void;
};

export function EmptyPlaceholder({ onMint }: EmptyPlaceholderProps) {
	const currentCharacter = useAccountCharacter();

	return (
		<div className="flex flex-col items-center pt-15px text-22px font-400">
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

			<div className="p-24px w-full">
				<button
					onClick={onMint}
					className="flex items-center justify-center w-full gap-[8px] rounded-16px bg-[#F6C549] text-[#FFF] hover:text-[#9688F2] text-16px font-500 border-none p-20px cursor-pointer transform active:translate-y-1px"
				>
					<Text className="i-csb:mint-fill text-24px" />
					Mint
				</button>
			</div>
		</div>
	);
}
