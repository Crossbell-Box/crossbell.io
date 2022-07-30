import { Button, Skeleton, Text } from "@mantine/core";
import type { CharacterEntity } from "crossbell.js";
import {
	useFollowCharacter,
	useUnfollowCharacter,
} from "@/utils/apis/contract";
import { useModals } from "@mantine/modals";
import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import {
	useCharacterFollowRelation,
	useCurrentCharacter,
} from "@/utils/apis/indexer";
import Avatar from "../common/Avatar";
import { extractCharacterName } from "@/utils/metadata";
import { CharacterName } from "../common/Character";

const FollowCharacterCard = ({ character }: { character: CharacterEntity }) => {
	const { data: currentCharacter } = useCurrentCharacter();

	const { data: followRelation, isLoading: isLoadingFollowRelation } =
		useCharacterFollowRelation(
			currentCharacter?.characterId,
			character?.characterId
		);

	const follow = useFollowCharacter(character.characterId!);
	const unfollow = useUnfollowCharacter(character.characterId!);

	const modals = useModals();
	const handleFollow = () => {
		follow.mutate();
	};
	const handleUnfollow = () => {
		modals.openConfirmModal({
			title: `Unfollow @${character.handle}?`,
			children:
				"Their activities will no longer show up in your home timeline. You can still view their profile. ",
			labels: { confirm: "Unfollow", cancel: "Cancel" },
			confirmProps: { color: "red" },
			onConfirm: () => {
				unfollow.mutate();
			},
		});
	};

	const characterName = extractCharacterName(character);

	return (
		<div className="flex flex-row w-full items-start gap-4 p-4">
			{/* left - avatar */}
			<div>
				<Avatar
					size={64}
					characterId={character.characterId}
					address={character.owner}
					alt={characterName}
				/>
			</div>

			{/* right */}
			<div className="flex-1">
				{/* top */}
				<div className="flex flex-row justify-between">
					{/* top-left - name & handle */}
					<div>
						<div>
							<CharacterName characterId={character.characterId} />
						</div>
						<div>
							<Text className="text-gray">@{character.handle}</Text>
						</div>
					</div>

					{/* top-right - follow button */}
					<div className="flex w-24">
						{isLoadingFollowRelation ? (
							<Button radius={"md"} fullWidth p={0} color="dark" loading>
								Follow
							</Button>
						) : followRelation?.isFollowing ? (
							<Button
								radius="md"
								fullWidth
								p={0}
								variant="outline"
								color="dark"
								loading={unfollow.isLoading}
								onClick={handleUnfollow}
							>
								Following
							</Button>
						) : (
							<Button
								radius="md"
								fullWidth
								p={0}
								color="dark"
								loading={follow.isLoading}
								onClick={handleFollow}
							>
								Follow
							</Button>
						)}
					</div>
				</div>

				{/* bottom - biio */}
				<div>
					<Text lineClamp={2}>{character.metadata?.content?.bio}</Text>
				</div>
			</div>
		</div>
	);
};

export const FollowCharacterSkeleton = () => (
	<div className="flex flex-row w-full items-center gap-4 p-4">
		<Skeleton circle height={60} width={60} />
		<div className="flex flex-col flex-1">
			<Skeleton height={16} width={60} />
			<Skeleton height={14} width={72} mt={4} />
			<Skeleton height={12} mt={4} />
			<Skeleton height={12} mt={2} />
		</div>
		<Skeleton height={30} width={96} />
	</div>
);

export default FollowCharacterCard;
