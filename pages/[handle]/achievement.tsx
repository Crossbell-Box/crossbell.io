import { Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Head from "next/head";
import type { CharacterEntity } from "crossbell.js";

import { getLayout } from "@/components/layouts/AppLayout";
import { useCharacterByHandle } from "@/utils/apis/indexer";
import { extractCharacterName } from "@/utils/metadata";
import { useCharacterRouterQuery } from "@/utils/url";
import Header from "@/components/layouts/Header";
import {
	AchievementsTitle,
	Badge,
	ComingSoon,
	BadgeDetail,
	BadgeLevelInfo,
} from "@/components/achievement";

import { getServerSideProps } from "./index";

export { getServerSideProps };

type PageProps = {
	character: CharacterEntity | null;
};

const levels: BadgeLevelInfo[] = [
	{
		id: "base",
		title: "Popular NFT",
		img: "ipfs://bafkreihxutrvld37t4lxf2pjnmq5siajl52kv75pojooyx4pmwdjmi4pca",
		description: "description",
		unitDesc: "Being minted",
		progressDesc: "1234/4535",
		mintId: null,
		minted: 3234,
	},
	{
		id: "bronze",
		title: "Popular NFT",
		img: "ipfs://bafkreihxutrvld37t4lxf2pjnmq5siajl52kv75pojooyx4pmwdjmi4pca",
		description: "description",
		unitDesc: "Being minted",
		progressDesc: "1234/4535",
		mintId: null,
		minted: 3234,
	},
	{
		id: "silver",
		title: "Popular NFT",
		img: "ipfs://bafkreihxutrvld37t4lxf2pjnmq5siajl52kv75pojooyx4pmwdjmi4pca",
		description: "description",
		unitDesc: "Being minted",
		progressDesc: "1234/4535",
		mintId: null,
		minted: 3234,
	},
	{
		id: "gold",
		title: "Popular NFT",
		img: "ipfs://bafkreihxutrvld37t4lxf2pjnmq5siajl52kv75pojooyx4pmwdjmi4pca",
		description: "description",
		unitDesc: "Being minted",
		progressDesc: "1234/4535",
		mintId: 230,
		minted: 3234,
	},
	{
		id: "special",
		title: "Popular NFT",
		img: "ipfs://bafkreihxutrvld37t4lxf2pjnmq5siajl52kv75pojooyx4pmwdjmi4pca",
		description: "description",
		unitDesc: "Being minted",
		progressDesc: "1234/4535",
		mintId: null,
		minted: 3234,
	},
];

export default function Page(props: PageProps) {
	const { character, handle } = useCharacterInfo(props);
	const [isDisplayModal, { toggle: toggleIsDisplayModal }] =
		useDisclosure(true);

	if (!character) {
		return null;
	}

	return (
		<div>
			<Head>
				<title>{`${extractCharacterName(character)} (@${handle})`}</title>
			</Head>

			<Header hasBackButton>Achievement</Header>

			<Modal
				withCloseButton={false}
				opened={isDisplayModal}
				onClose={toggleIsDisplayModal}
				padding={0}
				radius={12}
				size="500px"
			>
				<button
					onClick={toggleIsDisplayModal}
					className="bg-[#312F39] hover:bg-white/20 transition absolute right-16px top-16px w-32px h-32px border-none rounded-full flex items-center justify-center outline-none cursor-pointer"
				>
					<Text className="i-csb:close text-white text-24px" />
				</button>
				<BadgeDetail
					levels={levels}
					currentLevelId={"gold"}
					circleHash={character.owner}
				/>
			</Modal>

			<div className="mt-32px">
				<AchievementsTitle>Beginner journey</AchievementsTitle>
				<div className="mt-16px flex flex-wrap justify-between">
					{renderBadge(character)}
					{renderBadge(character)}
					{renderBadge(character)}
					{renderBadge(character)}
					{renderBadge(character)}
					{renderLayoutPlaceholder()}
				</div>
			</div>

			<ComingSoon />
		</div>
	);
}

Page.getLayout = getLayout;

function renderBadge(character: CharacterEntity) {
	return (
		<div className="my-16px mx-8px min-w-163px">
			<Badge
				levels={levels}
				currentLevelId="gold"
				circleHash={character.owner}
			/>
		</div>
	);
}

function renderLayoutPlaceholder() {
	return (
		<>
			{Array.from({ length: 8 }).map((_, key) => (
				<div key={key} />
			))}
		</>
	);
}

function useCharacterInfo(props: PageProps) {
	const { handle } = useCharacterRouterQuery();
	const { data: character } = useCharacterByHandle(handle, {
		initialData: props.character,
	});

	return { character, handle };
}
