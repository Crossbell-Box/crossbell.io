import TrendingCharacters from "@/components/Index/Trending/Characters";
import TrendingTreasures from "@/components/Index/Trending/Treasures";
import TrendingLists from "@/components/Index/Trending/Lists";
import { useTrending } from "@/utils/apis/trending";

import type { TrendingListWithCharacter } from "@/components/Index/Trending/Lists";
import type { TrendingCharacter, TrendingTreasure } from "@/components/Index/Trending/_types";
import {LoadingOverlay} from "@mantine/core";

type TrendingData = {
  character: TrendingCharacter[];
  treasure: TrendingTreasure[];
  list: TrendingListWithCharacter[];
}

const IndexTrending = () => {

  const { isLoading: trendingLoading, data: trendingRawData } = useTrending();
  const trendingData: TrendingData = {
    character: trendingRawData?.character.filter(character => character.list_id <= 0) || [],
    treasure: trendingRawData?.treasure || [],
    list: trendingRawData?.list.map(list => ({
      ...list,
      characters: trendingRawData?.character.filter(character => character.list_id === list.id)
    })) || [],
  };

  return (
    <>
      <LoadingOverlay visible={trendingLoading} />
      <div className={"m-auto max-w-340 px-8"}>
        <TrendingCharacters characters={trendingData.character} />
        <TrendingTreasures mintedNotes={trendingData.treasure} />
        <TrendingLists lists={trendingData.list} />
      </div>
    </>
  )
}

export default IndexTrending;
