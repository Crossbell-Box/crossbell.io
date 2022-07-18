import TrendingBase from "@/components/Index/Trending/_base";
import type { TrendingCharacter } from "@/components/Index/Trending/_types";

interface TrendingCharactersProps {
  characters: TrendingCharacter[];
}

const TrendingCharacters = ({ characters }: TrendingCharactersProps) => (
  <TrendingBase title={"Trending Characters"} intro={"Here are the trending characters of Crossbell"} viewMoreLink={"/"}>
    <div className={"flex flex-row"}>
      ...Trending characters card
      {/*TODO: Character Cards*/}
    </div>
  </TrendingBase>
);

export default TrendingCharacters;
