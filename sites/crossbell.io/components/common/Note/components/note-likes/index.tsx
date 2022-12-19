import React from "react";
import {
	ScrollArea,
	Text,
	Avatar as BaseAvatar,
	Modal,
	CloseButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ListResponse, LinkEntity, CharacterEntity } from "crossbell.js";

import { useNoteLikes } from "@crossbell/indexer";
import { useAccountCharacter } from "@crossbell/connect-kit";

import { Avatar } from "~/shared/components/avatar";
import { LoadMore } from "~/shared/components/load-more";

import { NoteModel } from "../../hooks/use-note-model";
import { Item } from "./item";

export type NoteLikesProps = {
	model: NoteModel;
};

enum LocalItemStatus {
	common = "common",
	showCurrentCharacter = "showCurrentCharacter",
}

export function NoteLikes({ model }: NoteLikesProps) {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useNoteLikes(
		model.characterId,
		model.noteId
	);
	const currentCharacter = useAccountCharacter();
	const [items, status] = useItems(data?.pages, currentCharacter, model);

	const total = model.likeCount ?? 0;
	const thumbnailCount =
		total > 4
			? status === LocalItemStatus.showCurrentCharacter
				? 3
				: 4
			: total;
	const [isModalOpened, modal] = useDisclosure(false);

	if (total === 0) return null;

	return (
		<>
			<div
				className="py-10px px-28px flex items-center gap-[12px] rounded-12px bg-[#F2F4F6] cursor-pointer ux-overlay"
				onClick={modal.open}
			>
				<div className="flex items-center gap-[4px]">
					<Text className="i-csb:favorite-fill text-[#E65040]" />
					<span className="text-16px font-400">{total}</span>
				</div>
				<div>
					<BaseAvatar.Group spacing="sm" className="flex-row-reverse">
						{items
							.slice(0, thumbnailCount)
							.reverse()
							.map(({ linklistId, fromCharacter }) => {
								return (
									<Avatar
										size={24}
										radius="xl"
										key={linklistId}
										character={fromCharacter}
										className="border-none"
									/>
								);
							})}
						{status === LocalItemStatus.showCurrentCharacter && (
							<Avatar
								size={24}
								radius="xl"
								character={currentCharacter}
								className="border-none"
							/>
						)}
					</BaseAvatar.Group>
				</div>
			</div>

			<Modal
				radius={28}
				padding={0}
				withCloseButton={false}
				opened={isModalOpened}
				onClose={modal.close}
				classNames={{ modal: "w-600px max-w-90vw" }}
			>
				<div className="flex items-center gap-[8px] px-24px pt-24px">
					<Text className="i-csb:favorite-fill text-24px text-[#E65040]" />
					<span className="text-22px font-500">Like List</span>

					<CloseButton size={28} className="ml-auto" onClick={modal.close} />
				</div>

				<ScrollArea.Autosize maxHeight="80vh">
					<div className="px-24px pt-12px pb-24px">
						{status === LocalItemStatus.showCurrentCharacter && (
							<Item character={currentCharacter} />
						)}

						{items.map(
							({ linklistId, fromCharacter, createdAt, transactionHash }) => (
								<Item
									key={linklistId}
									character={fromCharacter}
									transactionHash={transactionHash}
									createdAt={createdAt}
								/>
							)
						)}

						<LoadMore
							onLoadMore={() => fetchNextPage()}
							hasNextPage={!!hasNextPage}
							isLoading={isFetchingNextPage}
						>
							<p className="text-center">Loading...</p>
						</LoadMore>
					</div>
				</ScrollArea.Autosize>
			</Modal>
		</>
	);
}

function useItems(
	pages: ListResponse<LinkEntity>[] | undefined,
	currentCharacter: CharacterEntity | undefined,
	{ isLiked, isLoading }: NoteModel
): [LinkEntity[], LocalItemStatus] {
	return React.useMemo(() => {
		const items: LinkEntity[] = [];
		let currentCharacterIndex = -1;

		pages?.forEach(({ list }) => {
			list.forEach((item) => {
				if (item.fromCharacterId === currentCharacter?.characterId) {
					currentCharacterIndex = items.length;
				}

				items.push(item);
			});
		});

		if (isLiked && currentCharacterIndex === -1) {
			return [items, LocalItemStatus.showCurrentCharacter];
		}

		if (!isLiked && currentCharacterIndex !== -1) {
			items.splice(currentCharacterIndex, 1);
			return [items, LocalItemStatus.common];
		}

		return [items, LocalItemStatus.common];
	}, [pages, isLiked, currentCharacter, isLoading]);
}
