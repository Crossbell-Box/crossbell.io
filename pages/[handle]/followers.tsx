import LoadMore from "@/components/common/LoadMore";
import { getLayout } from "@/components/layouts/AppLayout";
import Header from "@/components/layouts/Header";
import type { NextPageWithLayout } from "@/pages/_app";
import {
  useCharacter,
  useCharacterByHandle, useCurrentCharacter,
} from "@/utils/apis/indexer";
import { extractCharacterName } from "@/utils/metadata";
import { useCharacterRouterQuery } from "@/utils/url";
import { Fragment } from "react";
import { useRouter } from "next/router";
import FollowCharacterCard, { FollowCharacterSkeleton } from "@/components/card/FollowCharacterCard";
import { useFollowerCharactersOfCharacter } from "@/utils/apis/indexer/follow";
import { Text } from "@mantine/core";

interface FollowCharacterCardFromIdProps {
  characterId: number;
}
const FollowCharacterCardFromId = ({ characterId }: FollowCharacterCardFromIdProps) => {
  const { data: targetCharacter, isLoading } = useCharacter(characterId);

  return isLoading ? (
    <FollowCharacterSkeleton />
  ) : (
    <FollowCharacterCard
      character={targetCharacter!}
    />
  )
}

const Followers = () => {
  const { data: character } = useCurrentCharacter();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useFollowerCharactersOfCharacter(character?.characterId);

  return (
    <>
      {/* links */}
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.list.map((link, i) =>
            <FollowCharacterCardFromId
              key={link.fromCharacterId}
              characterId={link.fromCharacterId!}
            />
          )}
        </Fragment>
      ))}
      {isLoading &&
        Array(10)
          .fill(0)
          .map((_, i) => <FollowCharacterSkeleton key={i}/>)}

      {/* load more */}
      <LoadMore
        onLoadMore={() => fetchNextPage()}
        hasNextPage={Boolean(hasNextPage)}
        isLoading={isFetchingNextPage}
      >
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <FollowCharacterSkeleton key={i}/>
          ))}
      </LoadMore>
    </>
  )
};

const Page: NextPageWithLayout = () => {
  const { handle, name } = useCharacterRouterQuery();
  const { data: character } = useCharacterByHandle(handle);

  const router = useRouter();

  const headerText =
    name ?? extractCharacterName(character) ?? handle ?? "Character";

  return (
    <div>
      <Header hasBackButton>{headerText}</Header>

      <div className={"flex flex-col mt-6 mb-4"}>
        <div className={"flex flex-row border-bottom border-b-1px border-[#E1E8F7] w-full justify-around z-1"}>
          <div className={"p-2 border-b-2px border-[#FFCF55]"}>
            <Text size={"lg"} weight={600}>
              Followers
            </Text>
          </div>
          <div className={"p-2 cursor-pointer"} onClick={() => router.push(`${router.asPath}/../followings`)}>
            <Text size={"lg"}>
              Following
            </Text>
          </div>
        </div>
        <Followers />
      </div>
    </div>
  );
};

Page.getLayout = getLayout;

export default Page;
