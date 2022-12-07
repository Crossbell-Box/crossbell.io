import {
	ScrollArea,
	LoadingOverlay,
	Checkbox,
	Space,
	Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

import { useAccountState, useAccountCharacters } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";
import { composeCharacterHref } from "@/utils/url";
import LoadMore from "@/components/common/LoadMore";
import Avatar from "@/components/common/Avatar";

import MenuItem from "./_MenuItem";

export default function AccountList() {
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

	const [shouldNavigate, shouldNavigateHandles] = useDisclosure(true); // FIXME: a closure bug?
	const router = useRouter();

	const hasNoResult = !isLoading && characters.length === 0;

	return (
		<ScrollArea.Autosize maxHeight="50vh">
			{isLoading && (
				<div className="h-100px">
					<LoadingOverlay visible={isLoading} />
				</div>
			)}
			{characters.map((character, i) => (
				<MenuItem
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
								<div>
									Are you sure you want to switch to this character?
									<Checkbox
										label={
											<Text color="dimmed">
												Navigate to the character page after switching
											</Text>
										}
										size="xs"
										className="my-2"
										checked={shouldNavigate}
										onChange={(event) => {
											if (event.currentTarget.checked) {
												shouldNavigateHandles.open();
											} else {
												shouldNavigateHandles.close();
											}
										}}
									/>
								</div>
							),
							labels: { confirm: "Switch", cancel: "Cancel" },
							onConfirm: () => {
								switchCharacter(character);
								showNotification({
									message: `Switched to @${character.handle}`,
								});
								if (shouldNavigate) {
									setTimeout(() => {
										router.push(composeCharacterHref(character.handle));
									}, 1000);
								}
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
				</MenuItem>
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
				<MenuItem>
					<Text color="dimmed">No characters</Text>
				</MenuItem>
			)}
		</ScrollArea.Autosize>
	);
}
