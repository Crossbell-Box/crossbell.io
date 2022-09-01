import { useCharacters, useCurrentCharacterId } from "@/utils/apis/indexer";
import { extractCharacterName } from "@/utils/metadata";
import { composeCharacterHref } from "@/utils/url";
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
import { Fragment } from "react";
import { useAccount } from "wagmi";
import LoadMore from "@/components/common/LoadMore";
import Avatar from "@/components/common/Avatar";
import MenuItem from "./_MenuItem";

export default function AccountList() {
	const { address } = useAccount();
	const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useCharacters(address);

	const [curCid, setCurCid] = useCurrentCharacterId();

	const modals = useModals();

	const [shouldNavigate, shouldNavigateHandles] = useDisclosure(true); // FIXME: a closure bug?
	const router = useRouter();

	const hasNoResult = !isLoading && !data?.pages.some((page) => page.count > 0);

	return (
		<ScrollArea.Autosize maxHeight="50vh">
			{isLoading && (
				<div className="h-100px">
					<LoadingOverlay visible={isLoading} />
				</div>
			)}
			{data?.pages.map((page, i) => (
				<Fragment key={i}>
					{page?.list.map((c) => (
						<MenuItem
							rightSection={
								c.characterId === curCid ? (
									<Text className="i-csb:tick" color="brand" />
								) : null
							}
							key={c.characterId}
							onClick={() => {
								if (c.characterId === curCid) {
									return;
								}
								modals.openConfirmModal({
									title: `Switch to @${c.handle}?`,
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
										setCurCid(c.characterId);
										showNotification({ message: `Switched to @${c.handle}` });
										if (shouldNavigate) {
											setTimeout(() => {
												router.push(composeCharacterHref(c.handle));
											}, 1000);
										}
									},
								});
							}}
						>
							<div className="flex items-center" key={c.characterId}>
								{/* avatar */}
								{c && <Avatar size={32} character={c} />}

								<Space w="xs" />

								<div className="flex flex-col">
									{/* name */}
									<Text className="text-sm font-semibold overflow-hidden text-ellipsis max-w-8em">
										{extractCharacterName(c, { fallbackToHandle: false })}
									</Text>

									{/* handle */}
									<Text className="text-xs overflow-hidden text-ellipsis max-w-8em">
										@{c.handle}
									</Text>
								</div>
							</div>
						</MenuItem>
					))}
				</Fragment>
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
