import React from "react";
import {
	ScrollArea,
	Avatar as BaseAvatar,
	Modal,
	CloseButton,
	LoadingOverlay,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useNoteMints, usePrimaryCharacter } from "@crossbell/indexer";
import { HooksRenderer } from "@crossbell/ui";

import { Avatar } from "~/shared/components/avatar";
import { LoadMore } from "~/shared/components/load-more";

import { NoteModel } from "../../hooks/use-note-model";

import { Item } from "./item";
import { ItemTop3 } from "./item.top3";
import { ItemTop1 } from "./item.top1";
import { CurrentRank } from "./current-rank";
import { EmptyPlaceholder } from "./empty-placeholder";

import {
	AvatarsPlaceholder,
	maxThumbnailCount,
} from "../note-likes/avatars-placeholder";

export type NoteMintsProps = {
	model: NoteModel;
};

export function NoteMints({ model }: NoteMintsProps) {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useNoteMints(
		model.characterId,
		model.noteId
	);
	const items = React.useMemo(() => {
		return (
			data?.pages
				.flatMap(({ list }) => list)
				.sort((a, b) => a.tokenId - b.tokenId) ?? []
		);
	}, [data?.pages]);

	const total = data?.pages[0]?.count ?? 0;
	const highlightMode = total > 3 ? "top-3" : "top-1";
	const thumbnailCount = total > maxThumbnailCount ? maxThumbnailCount : total;
	const [isModalOpened, modal] = useDisclosure(false);

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
					{total === 0 ? (
						<AvatarsPlaceholder />
					) : (
						<BaseAvatar.Group spacing="sm" className="flex-row-reverse">
							{items
								.slice(0, thumbnailCount)
								.reverse()
								.map(({ tokenId, owner }) => {
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
													className="border-none"
												/>
											)}
										</HooksRenderer>
									);
								})}
						</BaseAvatar.Group>
					)}
				</div>
			</div>

			<Modal
				radius={28}
				padding={0}
				withCloseButton={false}
				opened={isModalOpened}
				onClose={modal.close}
				size="lg"
				zIndex={11}
			>
				<div className="flex items-center gap-[8px] px-24px pt-24px">
					<MintIcon className="text-24px" />
					<span className="text-22px font-500">Mint List</span>

					<CloseButton size={28} className="ml-auto" onClick={modal.close} />
				</div>

				{total === 0 ? (
					<div>
						<EmptyPlaceholder onMint={model.mint} />
						<LoadingOverlay visible={model.isLoading} />
					</div>
				) : (
					<ScrollArea.Autosize mah="80vh">
						{((): JSX.Element => {
							switch (highlightMode) {
								case "top-1": {
									const [first, ...restItems] = items;
									return (
										<div>
											<div className="px-24px py-12px">
												<ItemTop1 entity={first} />
											</div>

											<CurrentRank
												characterId={model.characterId}
												noteId={model.noteId}
											/>

											<div className="px-24px pt-12px pb-24px">
												{restItems.map((item) => (
													<Item key={item.tokenId} entity={item} />
												))}
											</div>
										</div>
									);
								}
								case "top-3": {
									const [first, second, third, ...restItems] = items;
									return (
										<div>
											<div className="flex justify-between w-450px max-w-3/4 mx-auto">
												<ItemTop3 entity={second} />
												<ItemTop3 entity={first} />
												<ItemTop3 entity={third} />
											</div>

											<CurrentRank
												characterId={model.characterId}
												noteId={model.noteId}
											/>

											<div className="px-24px pt-12px pb-24px">
												{restItems.map((item) => (
													<Item key={item.tokenId} entity={item} />
												))}
											</div>
										</div>
									);
								}
							}
						})()}

						<LoadMore
							onLoadMore={() => fetchNextPage()}
							hasNextPage={!!hasNextPage}
							isLoading={isFetchingNextPage}
						>
							<p className="text-center">Loading...</p>
						</LoadMore>
					</ScrollArea.Autosize>
				)}
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
