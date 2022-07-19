import TrendingCharacters from "@/components/Index/Trending/Characters";
import TrendingTreasures from "@/components/Index/Trending/Treasures";
import TrendingLists from "@/components/Index/Trending/Lists";
import type { TrendingListWithCharacter } from "@/components/Index/Trending/Lists";
import type { TrendingCharacter, TrendingTreasure } from "@/components/Index/Trending/_types";

type TrendingData = {
  character: TrendingCharacter[];
  treasure: TrendingTreasure[];
  list: TrendingListWithCharacter[];
}

const getTrendingData = (): TrendingData => {

  const trendingData: TrendingData = {
    character: [],
    treasure: [],
    list: [],
  };

  // TODO: Get data from server (https://recommend.crossbell.io/recommends)

  // Generate mock data
  for (let i = 0; i < 8; i++) {
    trendingData.character.push({
      crossbell_id: i * 9,
      handle: `demo_${i}`,
      avatar: `https://http.cat/40${i}`,
      name: `Demo ${i}`,
      bio: i % 2 === 0 ? '' : `Demo ${i} Boris Johnson suffered a fresh ministerial resignation this morning as the Prime Minister struggles to stabil...`,
      banner: `https://http.cat/40${i}`,
    });
  }
  for (let i = 0; i < 8; i++) {
    trendingData.treasure.push({
      character_name: `Demo ${i}`,
      character_handle: `demo_${i}`,
      character_avatar: `https://http.cat/40${i}`,

      crossbell_id: `${i}`,
      media: `https://http.cat/40${i}`,
      text: i % 2 === 0 ? '' : '“Coding is the love of my life :)”',
      mint_count: i * 9,
    });
  }
  const tList1: TrendingListWithCharacter = {
    intro: "See if any of your Twitter followings are already on Crossbell",
    start_icon: "https://http.cat/100",
    characters: [],
  };
  for (let i = 1; i < 3; i++) {
    tList1.characters.push({
      crossbell_id: i,
      handle: `1_${i}`,
      avatar: `https://http.cat/10${i}`,
      name: `Demo 1 - ${i}`,
      bio: `Demo 1 - ${i}`,
      banner: "",
    });
  }
  const tList2: TrendingListWithCharacter = {
    intro: "Check out the follow list of @joshua",
    start_icon: "https://http.cat/200",
    characters: [],
  };
  for (let i = 1; i < 5; i++) {
    tList2.characters.push({
      crossbell_id: i,
      handle: `2_${i}`,
      avatar: `https://http.cat/20${i}`,
      name: `Demo 2 - ${i}`,
      bio: `Demo 2 - ${i}`,
      banner: "",
    });
  }
  const tList3: TrendingListWithCharacter = {
    intro: "Check out the most popular characteres in Crossbell",
    start_icon: "https://http.cat/300",
    characters: [],
  };
  for (let i = 1; i < 6; i++) {
    tList3.characters.push({
      crossbell_id: i,
      handle: `3_${i}`,
      avatar: `https://http.cat/30${i}`,
      name: `Demo 3 - ${i}`,
      bio: `Demo 3 - ${i}`,
      banner: "",
    });
  }
  trendingData.list.push(tList1, tList2, tList3);

  return trendingData;

}

const IndexTrending = () => {

  const trendingData = getTrendingData();

  return (
    <div className={"m-auto max-w-340 px-8"}>
      <TrendingCharacters characters={trendingData.character} />
      <TrendingTreasures mintedNotes={trendingData.treasure} />
      <TrendingLists lists={trendingData.list} />
    </div>
  )
}

export default IndexTrending;
