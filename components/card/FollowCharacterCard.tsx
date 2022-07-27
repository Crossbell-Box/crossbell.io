import { Button, Skeleton, Text } from "@mantine/core";
import type { CharacterEntity } from "crossbell.js";
import { useFollowCharacter, useUnfollowCharacter } from "@/utils/apis/contract";
import { useModals } from "@mantine/modals";
import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import { useCharacterFollowRelation, useCurrentCharacter } from "@/utils/apis/indexer";

type FollowCharacterInfo = {
  characterId: number;
  avatar: string;
  handle: string;
  name: string;
  bio: string;
  // fromWhen: Date;
}

interface FollowCharacterRawCardProps {
  character: FollowCharacterInfo;
}

const FollowCharacterRawCard = ({ character }: FollowCharacterRawCardProps) => {
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

  return (
    <div className={"flex flex-row w-full items-center gap-4 p-4"}>
      <div className={"rounded-full w-15 h-15"}>
        <img className={"rounded-full w-full h-full object-fit"} src={character.avatar} alt={character.name}/>
      </div>
      <div className={"flex flex-col flex-1"}>
        <div className={"flex flex-row"}>
          <Text>
            {character.name}
          </Text>
        </div>
        <div>
          <Text>
            @{character.handle}
          </Text>
        </div>
        <div>
          <Text lineClamp={2}>
            {character.bio}
          </Text>
        </div>
      </div>
      <div className={"flex w-24"}>
        {isLoadingFollowRelation ? (
          <Button radius={"md"} className={"w-full"} color={"dark"} loading={true} />
        ) : followRelation?.isFollowing ? (
          <Button radius={"md"} className={"w-full"} variant={"outline"} color={"dark"} onClick={handleUnfollow}>
            Following
          </Button>
        ) : (
          <Button radius={"md"} className={"w-full"} color={"dark"} onClick={handleFollow}>
            Follow
          </Button>
        )}
      </div>
    </div>
  )
}

interface FollowCharacterCardProps {
  character: CharacterEntity;
}

const FollowCharacterCard = ({ character }: FollowCharacterCardProps) => (
  <FollowCharacterRawCard character={{
    characterId: character.characterId,
    avatar: ipfsLinkToHttpLink(character.metadata?.content?.avatars?.[0] || ''),
    handle: character.handle,
    name: character.metadata?.content?.name || '',
    bio: character.metadata?.content?.bio || '',
  }} />
);

export const FollowCharacterSkeleton = () => (
  <div className={"flex flex-row w-full items-center gap-4 p-4"}>
    <Skeleton circle height={60} width={60} />
    <div className={"flex flex-col flex-1"}>
      <Skeleton height={16} width={60} />
      <Skeleton height={14} width={72} mt={4} />
      <Skeleton height={12} mt={4} />
      <Skeleton height={12} mt={2} />
    </div>
    <Skeleton height={30} width={96} />
  </div>
);

export default FollowCharacterCard;
