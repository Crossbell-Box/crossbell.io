import dayjs from "dayjs";
import React from "react";
import {
	ScrollArea,
	Text,
	Avatar as BaseAvatar,
	Modal,
	CloseButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useNoteMints, usePrimaryCharacter } from "@crossbell/indexer";
import { extractCharacterName } from "@crossbell/util-metadata";
import { HooksRenderer } from "@crossbell/ui";

import config from "~/shared/config";
import { Avatar } from "~/shared/components/avatar";
import { LoadMore } from "~/shared/components/load-more";
import { FollowButton } from "~/shared/components/follow-button";
import { composeScanTxHref } from "~/shared/url";

export type NoteMintsProps = {
	characterId: number;
	noteId: number;
};

export function NoteMints({ characterId, noteId }: NoteMintsProps) {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useNoteMints(
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
	const [isModalOpened, modal] = useDisclosure(true);

	if (total === 0) return null;

	return (
		<>
			<div
				className="py-10px px-28px flex items-center gap-[12px] rounded-12px bg-[#F2F4F6] cursor-pointer ux-overlay"
				onClick={modal.open}
			>
				<div className="flex items-center gap-[4px]">
					<MintIcon />
					<span className="text-16px font-400">{total}</span>
				</div>
				<div>
					<BaseAvatar.Group spacing="sm">
						{items.slice(0, thumbnailCount).map(({ tokenId, owner }) => {
							return (
								<HooksRenderer
									key={tokenId}
									hooks={usePrimaryCharacter}
									params={[owner]}
								>
									{({ data: character }) => (
										<Avatar
											size={24}
											radius="xl"
											key={tokenId}
											character={character}
										/>
									)}
								</HooksRenderer>
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
				zIndex={11}
			>
				<div className="flex items-center gap-[8px] px-24px pt-24px">
					<MintIcon className="text-24px" />
					<span className="text-22px font-500">Mint List</span>

					<CloseButton size={28} className="ml-auto" onClick={modal.close} />
				</div>

				<ScrollArea.Autosize maxHeight="80vh">
					<div className="px-24px pt-12px pb-24px">
						{items.map(({ tokenId, createdAt, owner, transactionHash }) => (
							<HooksRenderer
								key={tokenId}
								hooks={usePrimaryCharacter}
								params={[owner]}
							>
								{({ data: character }) => {
									if (!character) return null;

									const bio = character.metadata?.content?.bio;
									const link = `${config.xChar.domain}/${character.handle}`;
									const characterName = extractCharacterName(character);

									return (
										<div
											key={tokenId}
											className="flex items-center gap-[8px] py-12px"
										>
											<a href={link} target="_blank" rel="noreferrer">
												<Avatar size={48} radius="xl" character={character} />
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
													Minted {dayjs(createdAt).fromNow()} on
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
											<FollowButton character={character} />
										</div>
									);
								}}
							</HooksRenderer>
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
			</Modal>
		</>
	);
}

function MintIcon(props: React.SVGAttributes<SVGSVGElement>) {
	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<rect x="7" y="6" width="12" height="10" fill="#F6C549" />
			<path
				d="M12 15.4L13.225 12.725L15.9 11.5L13.225 10.275L12 7.6L10.775 10.275L8.1 11.5L10.775 12.725L12 15.4ZM3.5 19C3.1 19 2.75 18.85 2.45 18.55C2.15 18.25 2 17.9 2 17.5V5.5C2 5.1 2.15 4.75 2.45 4.45C2.75 4.15 3.1 4 3.5 4H20.5C20.9 4 21.25 4.15 21.55 4.45C21.85 4.75 22 5.1 22 5.5V17.5C22 17.9 21.85 18.25 21.55 18.55C21.25 18.85 20.9 19 20.5 19H3.5Z"
				fill="#9688F2"
			/>
		</svg>
	);
}
