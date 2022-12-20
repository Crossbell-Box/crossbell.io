import React from "react";
import { ScrollArea, LoadingOverlay, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

import { useAccountState, useAccountCharacters } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";
import { LoadMore } from "~/shared/components/load-more";
import { Avatar } from "~/shared/components/avatar";
import classNames from "classnames";

export function AccountList() {
	const account = useAccountState((s) => s.computed.account);
	const switchCharacter = useAccountState((s) => s.switchCharacter);
	const {
		isLoading,
		characters,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	} = useAccountCharacters();

	const modals = useModals();

	const hasNoResult = !isLoading && characters.length === 0;

	return (
		<ScrollArea.Autosize maxHeight="50vh">
			{isLoading && (
				<div className="h-100px">
					<LoadingOverlay visible={isLoading} />
				</div>
			)}
			{characters.map((character) => {
				const isSelected = character.characterId === account?.characterId;
				const characterName = extractCharacterName(character, {
					fallbackToHandle: false,
				});
				const handle = `@${character.handle}`;
				return (
					<button
						className="flex items-center border-none w-full bg-transparent py-8px px-12px ux-overlay"
						key={character.characterId}
						onClick={() => {
							if (!isSelected) {
								modals.openConfirmModal({
									title: `Switch to @${character.handle}?`,
									children: (
										<div>
											Are you sure you want to switch to this character?
										</div>
									),
									labels: { confirm: "Switch", cancel: "Cancel" },
									zIndex: 20,
									onConfirm: () => {
										switchCharacter(character);
										showNotification({
											message: `Switched to @${character.handle}`,
										});
									},
								});
							}
						}}
					>
						<div
							className={classNames(
								"flex items-center gap-[8px] w-full",
								isSelected ? "text-[#5B89F7]" : "text-[#082135]"
							)}
							key={character.characterId}
						>
							<div className="relative">
								{character && <Avatar size={40} character={character} />}
								<div
									className={classNames(
										"rounded-full border-3 border-[#5B89F7] absolute inset-0",
										isSelected ? "opacity-100" : "opacity-0"
									)}
								/>
							</div>

							<div className="font-roboto text-start flex-1 w-0 overflow-hidden">
								<div
									title={characterName}
									className="text-14px font-500 truncate"
								>
									{characterName}
								</div>

								<div
									title={handle}
									className="text-14px font-500 truncate mt-2px"
								>
									{handle}
								</div>
							</div>

							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className={classNames(
									"ml-auto mr-12px sm:hidden",
									isSelected ? "opacity-100" : "opacity-0"
								)}
							>
								<g clipPath="url(#clip0_5191_20475)">
									<circle cx="12" cy="12" r="12" fill="currentColor" />
									<path
										d="M9.4501 17.8496L3.8501 12.2496L4.9251 11.1746L9.4501 15.6996L19.0501 6.09961L20.1251 7.17461L9.4501 17.8496Z"
										fill="#FFF"
									/>
								</g>
								<defs>
									<clipPath id="clip0_5191_20475">
										<rect width="24" height="24" fill="white" />
									</clipPath>
								</defs>
							</svg>
						</div>
					</button>
				);
			})}

			<LoadMore
				onLoadMore={() => fetchNextPage()}
				hasNextPage={Boolean(hasNextPage)}
				isLoading={isFetchingNextPage}
			>
				Loading
			</LoadMore>

			{hasNoResult && (
				<div className="text-center">
					<Text color="dimmed">No characters</Text>
				</div>
			)}
		</ScrollArea.Autosize>
	);
}
