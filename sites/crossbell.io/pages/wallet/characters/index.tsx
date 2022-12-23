import { Grid, Menu, Title, Text, ActionIcon } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { CharacterEntity } from "crossbell.js";
import Link from "next/link";

import { Avatar } from "~/shared/components/avatar";
import { LoadingOverlay } from "~/shared/components/loading-overlay";
import { LoadMore } from "~/shared/components/load-more";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import { NextPageWithLayout } from "@/pages/_app";
import { useCharacterFollowStats } from "@crossbell/indexer";
import { extractCharacterName } from "@crossbell/util-metadata";
import {
	composeCharacterHref,
	composeWalletCharacterEditHref,
	WalletCharacterNewHref,
} from "~/shared/url";
import {
	useAccountCharacters,
	useAccountState,
	useSetPrimaryCharacter,
} from "@crossbell/connect-kit";

const Page: NextPageWithLayout = () => {
	const { characters, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useAccountCharacters();

	return (
		<div>
			<Header>Manage Characters</Header>

			<div className="mt-4">
				<Grid justify="space-around" gutter="xs">
					{characters.map((character) => (
						<CharacterCard key={character.characterId} character={character} />
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

					{/* mint new */}
					<Grid.Col md={4} lg={3} p={0}>
						<Link
							href={WalletCharacterNewHref}
							className="flex min-h-full items-center justify-center px-4 py-7 m-2 border cursor-pointer align-middle rounded-xl flex-col text-center relative overflow-hidden border-dark/10 shadow-sm bg-white hover:shadow-md transition-shadow"
						>
							<Title order={6} className="font-bold">
								Mint new character
							</Title>
							<div className="w-20 h-20 bg-slate-200 text-white rounded-full leading-none my-8">
								<div className="text-7xl bottom-1">+</div>
							</div>
						</Link>
					</Grid.Col>
				</Grid>
			</div>
		</div>
	);
};

function CharacterCard({ character }: { character: CharacterEntity }) {
	const { data: followingStats } = useCharacterFollowStats(
		character.characterId
	);
	const account = useAccountState((s) => s.computed.account);

	const setPrimary = useSetPrimaryCharacter();

	const handleSetPrimary = () => {
		setPrimary.mutate(character, {
			onSuccess: () => {
				showNotification({
					message: `Character @${character.handle} is now your primary character.`,
				});
			},
		});
	};

	return (
		<Grid.Col md={4} lg={3} p={0}>
			<Link
				href={composeCharacterHref(character.handle)}
				target="_blank"
				key={character.characterId}
				className="flex items-center justify-center min-h-full px-4 py-7 m-2 border cursor-pointer align-middle rounded-xl flex-col text-center relative overflow-hidden border-dark/10 shadow-sm bg-white hover:shadow-md transition-shadow"
			>
				<LoadingOverlay visible={setPrimary.isLoading} />

				{/* blurred bg */}
				{character.primary && (
					<Avatar
						characterId={character.characterId}
						character={character}
						radius={0}
						size={100}
						className="w-full h-full absolute top-0 left-0 right-0 bottom-0 scale-120 blur-32 opacity-70 z-0"
					/>
				)}

				{/* name */}
				<Text className="font-bold truncate w-full overflow-hidden text-ellipsis max-w-10em">
					{extractCharacterName(character)}
				</Text>
				<Text className="truncate w-full text-sm mt-1 overflow-hidden text-ellipsis max-w-10em">
					@{character.handle}
				</Text>

				{/* avatar */}
				<Avatar
					className="border-4 border-slate-200 w-20 h-20 rounded-full my-5"
					characterId={character.characterId}
					character={character}
					alt={extractCharacterName(character)}
				/>

				{/* following stats */}
				<div className="flex w-full">
					<div className="flex-1 border-r border-slate-200 text-sm">
						<Text className="font-bold">
							{followingStats?.followersCount ?? "..."}
						</Text>

						<Text className="text-xs text-slate-500">Followers</Text>
					</div>
					<div className="flex-1 text-sm">
						<Text className="font-bold">
							{followingStats?.followingCount ?? "..."}
						</Text>
						<Text className="text-xs text-slate-500">Following</Text>
					</div>
				</div>

				{/* menu */}
				<Menu>
					<Menu.Target>
						<ActionIcon
							className="absolute right-2 top-2"
							onClick={(event: any) => event.preventDefault()}
						>
							<Text className="i-csb:more" />
						</ActionIcon>
					</Menu.Target>

					<Menu.Dropdown className="w-fit shadow-md">
						<Menu.Item
							component={Link}
							href={composeWalletCharacterEditHref(character.characterId)}
						>
							Edit
						</Menu.Item>

						{account?.type === "wallet" && (
							<Menu.Item
								onClick={handleSetPrimary}
								disabled={character.primary}
							>
								Set as primary
							</Menu.Item>
						)}
					</Menu.Dropdown>
				</Menu>
			</Link>
		</Grid.Col>
	);
}

Page.getLayout = getLayout;

export default Page;
