import TrendingBase from "@/components/Index/Trending/_base";
import { ipfsLinkToHttpLink } from "@/utils/ipfs";
import type { TrendingCharacter, TrendingList } from "@/components/Index/Trending/_types";

export interface TrendingListWithCharacter extends TrendingList {
  characters: TrendingCharacter[];
}

interface TrendingListsProps {
  lists: TrendingListWithCharacter[];
}

// Mantine v5.0.0-alpha.19 doesn't have AvatarsGroup element
// like in previous versions (v4.2.12), and the new AvatarGroup
// doesn't support setting limitations for automatically extend,
// so we need to manually implement one here.
const AvatarsGroupWithLimit = ({ avatars, limit }: {
  avatars: string[];
  limit: number;
}) => (
  <div className={"flex flex-row items-center"}>
    <div className={"w-24 h-24 rounded-full -mt-6"} style={{
      zIndex: limit + 1
    }}>
      <img className={"w-full h-full rounded-full object-cover border border-white border-.2rem"} src={avatars[0]} />
    </div>
    {avatars.slice(1, limit).map((avatar, index) => (
      <div className={"w-18 h-18 rounded-full -ml-2rem"} key={index} style={{
        zIndex: limit - index
      }}>
        <img className={"w-full h-full rounded-full object-cover border border-white border-.2rem"} src={avatar} />
      </div>
    ))}
    {avatars.length > limit ? (
      <div className={"w-18 h-18 rounded-full -ml-2rem"} style={{
        zIndex: 0
      }}>
        <div className={"w-full h-full rounded-full bg-yellow border border-white border-.2rem font-bold text-sm flex justify-end items-center pr-3"}>
          +{avatars.length - limit}
        </div>
      </div>
    ) : (Array.from({ length: limit - avatars.length + 1 }).map((_, index) => (<div key={index} className={"w-18 h-18 rounded-full -ml-2rem"} />)))}
  </div>
)

const TrendingListCard = ({ list }: { list: TrendingListWithCharacter }) => (
  <div className={"flex flex-col md:flex-row gap-3 bg-white py-8 pl-8 rounded-2xl"}>
    <div className={"flex"}>
      <AvatarsGroupWithLimit avatars={[
        list.start_icon,
        ...list.characters.map(character => ipfsLinkToHttpLink(character.avatar)),
      ]} limit={4} />
    </div>
    <div className={"flex items-center text-2xl text-left"}>
      { list.intro }
    </div>
  </div>
);

const TrendingLists = ({ lists }: TrendingListsProps) => (
  <TrendingBase title={"Trending Lists"} intro={"Lists of characters that you may find interesting"} viewMoreLink={"/"}>
    <div className={"flex flex-col gap-8"}>
      {lists.map(list => <TrendingListCard key={list.id} list={list} />)}
    </div>
  </TrendingBase>
);

export default TrendingLists;
