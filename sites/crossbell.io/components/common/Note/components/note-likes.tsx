import React from "react";
import {
	ScrollArea,
	Text,
	Avatar as BaseAvatar,
	Modal,
	CloseButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useNoteLikes } from "@crossbell/indexer";
import { extractCharacterName } from "@crossbell/util-metadata";

import { Avatar } from "~/shared/components/avatar";
import { LoadMore } from "~/shared/components/load-more";
import { FollowButton } from "~/shared/components/follow-button";
import config from "~/shared/config";
import dayjs from "dayjs";
import { composeScanTxHref } from "~/shared/url";

export type NoteLikesProps = {
	characterId: number;
	noteId: number;
};

export function NoteLikes({ characterId, noteId }: NoteLikesProps) {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useNoteLikes(
		characterId,
		noteId
	);
	const items = React.useMemo(
		() => data?.pages.flatMap(({ list }) => list) ?? [],
		[data?.pages]
	);

	const total = data?.pages[0]?.count ?? 0;
	const thumbnailCount = total > 3 ? 3 : total;
	const remainingCount = total - thumbnailCount;
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
					<BaseAvatar.Group spacing="sm">
						{items
							.slice(0, thumbnailCount)
							.map(({ linklistId, fromCharacter }) => {
								return (
									<Avatar
										size={24}
										radius="xl"
										key={linklistId}
										character={fromCharacter}
									/>
								);
							})}
						{remainingCount > 0 && (
							<BaseAvatar radius="xl" size={24}>
								+{remainingCount}
							</BaseAvatar>
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
						{items.map(
							({ linklistId, fromCharacter, createdAt, transactionHash }) => {
								if (!fromCharacter) return null;

								const bio = fromCharacter.metadata?.content?.bio;
								const link = `${config.xChar.domain}/${fromCharacter.handle}`;
								const characterName = extractCharacterName(fromCharacter);

								return (
									<div
										key={linklistId}
										className="flex items-center gap-[8px] py-12px"
									>
										<a href={link} target="_blank" rel="noreferrer">
											<Avatar size={48} radius="xl" character={fromCharacter} />
										</a>
										<div className="flex-1 w-0 self-start">
											<div className="mb-2px truncate">
												<a
													href={link}
													target="_blank"
													rel="noreferrer"
													className="hover:underline text-14px font-500"
													title={characterName}
												>
													{characterName}
												</a>
											</div>
											{bio && (
												<div
													className="text-12px font-400 truncate leading-16px mb-2px"
													title={bio}
												>
													{bio}
												</div>
											)}
											<div
												className="text-11px font-500 text-[#687792]"
												title={createdAt}
											>
												Liked {dayjs(createdAt).fromNow()} on
												<a
													href={composeScanTxHref(transactionHash)}
													target="_blank"
													rel="noreferrer"
													className="hover:underline text-[#F6C549]"
												>
													<Text className="i-csb:logo inline-block transform translate-y-1/7 ml-4px mr-2px" />
													Crossbell Chain
												</a>
											</div>
										</div>
										<FollowButton character={fromCharacter} />
									</div>
								);
							}
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
