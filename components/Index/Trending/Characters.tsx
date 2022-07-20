import TrendingBase from "@/components/Index/Trending/_base";
import type { TrendingCharacter } from "@/components/Index/Trending/_types";
import { TrendingCharacterRawCard } from "@/components/card/TrendingCharacterCard";

interface TrendingCharactersProps {
  characters: TrendingCharacter[];
}

const TrendingCharacters = ({ characters }: TrendingCharactersProps) => (
  <TrendingBase title={"Trending Characters"} intro={"Here are the trending characters of Crossbell"} viewMoreLink={"/"}>
    <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-7"}>
      {characters.map(character => <TrendingCharacterRawCard key={character.crossbell_id} character={character} />)}
    </div>
  </TrendingBase>
);

export default TrendingCharacters;
