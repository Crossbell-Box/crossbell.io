import React from "react";
import {
	ScrollArea,
	Text,
	Avatar as BaseAvatar,
	Modal,
	CloseButton,
	LoadingOverlay,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	useAccountCharacter,
	useIsNoteLiked,
	useNoteLikeList,
} from "@crossbell/connect-kit";

import { Avatar } from "~/shared/components/avatar";
import { LoadMore } from "~/shared/components/load-more";

import { NoteModel } from "../../hooks/use-note-model";

import { EmptyPlaceholder } from "./empty-placeholder";
import { Item } from "./item";
import {
	AvatarsPlaceholder,
	avatarStyles,
	maxThumbnailCount,
} from "./avatars-placeholder";

export type NoteLikesProps = {
	model: NoteModel;
};

export function NoteLikes({ model }: NoteLikesProps) {
	const [list, { fetchNextPage, hasNextPage, isFetchingNextPage }] =
		useNoteLikeList(model);

	const total = model.likeCount ?? 0;
	const [isModalOpened, modal] = useDisclosure(false);

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
					{total === 0 ? (
						<AvatarsPlaceholder />
					) : (
						<BaseAvatar.Group spacing="sm" className="flex-row-reverse">
							{list
								.slice(0, maxThumbnailCount)
								.reverse()
								.map(({ character, transactionHash }, key) => {
									return (
										<Avatar
											{...avatarStyles}
											key={transactionHash ?? key}
											character={character}
										/>
									);
								})}
						</BaseAvatar.Group>
					)}
				</div>
			</div>

			<Modal
				radius={28}
				size="lg"
				padding={0}
				zIndex={11}
				withCloseButton={false}
				opened={isModalOpened}
				onClose={modal.close}
				closeOnClickOutside={!model.isLoading}
				closeOnEscape={!model.isLoading}
			>
				<div className="flex items-center gap-[8px] px-24px pt-24px">
					<Text className="i-csb:favorite-fill text-24px text-[#E65040]" />
					<span className="text-22px font-500">Like List</span>

					<CloseButton size={28} className="ml-auto" onClick={modal.close} />
				</div>

				{total === 0 ? (
					<div>
						<LoadingOverlay visible={model.isLoading} />
						<EmptyPlaceholder onLike={model.like} />
					</div>
				) : (
					<ScrollArea.Autosize mah="80vh">
						<div className="px-24px pt-12px pb-24px">
							{list.map(({ character, transactionHash, entity }) => (
								<Item
									key={transactionHash}
									character={character}
									transactionHash={transactionHash}
									createdAt={entity?.createdAt}
								/>
							))}

							<LoadMore
								onLoadMore={() => fetchNextPage()}
								hasNextPage={!!hasNextPage}
								isLoading={isFetchingNextPage}
							>
								<p className="text-center">Loading...</p>
							</LoadMore>
						</div>
					</ScrollArea.Autosize>
				)}
			</Modal>
		</>
	);
}
