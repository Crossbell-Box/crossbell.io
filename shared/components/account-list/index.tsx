import React from "react";
import { ScrollArea, LoadingOverlay, Space, Text, Menu } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

import { useAccountState, useAccountCharacters } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";
import { LoadMore } from "~/shared/components/load-more";
import { Avatar } from "~/shared/components/avatar";

export type AccountListProps = {
	itemClassName?: string;
};

export function AccountList({ itemClassName }: AccountListProps) {
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
			{characters.map((character) => (
				<Menu.Item
					className={itemClassName}
					rightSection={
						character.characterId === account?.characterId ? (
							<Text className="i-csb:tick" color="brand" />
						) : null
					}
					key={character.characterId}
					onClick={() => {
						if (character.characterId === account?.characterId) {
							return;
						}
						modals.openConfirmModal({
							title: `Switch to @${character.handle}?`,
							children: (
								<div>Are you sure you want to switch to this character?</div>
							),
							labels: { confirm: "Switch", cancel: "Cancel" },
							onConfirm: () => {
								switchCharacter(character);
								showNotification({
									message: `Switched to @${character.handle}`,
								});
							},
						});
					}}
				>
					<div className="flex items-center" key={character.characterId}>
						{/* avatar */}
						{character && <Avatar size={32} character={character} />}

						<Space w="xs" />

						<div className="flex flex-col">
							{/* name */}
							<Text className="text-sm font-semibold overflow-hidden text-ellipsis max-w-8em">
								{extractCharacterName(character, { fallbackToHandle: false })}
							</Text>

							{/* handle */}
							<Text className="text-xs overflow-hidden text-ellipsis max-w-8em">
								@{character.handle}
							</Text>
						</div>
					</div>
				</Menu.Item>
			))}

			<LoadMore
				onLoadMore={() => fetchNextPage()}
				hasNextPage={Boolean(hasNextPage)}
				isLoading={isFetchingNextPage}
			>
				{/* {Array(3)
					.fill(0)
					.map((_, i) => (
						<Skeleton key={i} />
					))} */}
			</LoadMore>

			{hasNoResult && (
				<Menu.Item className={itemClassName}>
					<Text color="dimmed">No characters</Text>
				</Menu.Item>
			)}
		</ScrollArea.Autosize>
	);
}
