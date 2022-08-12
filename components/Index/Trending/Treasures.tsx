import TrendingBase from "@/components/Index/Trending/_base";
import { MintedNoteRawCard } from "@/components/card/MintedNoteCard";
import type { TrendingTreasure } from "@/components/Index/Trending/_types";

interface TrendingTreasuresProps {
  mintedNotes: TrendingTreasure[];
}

const TrendingTreasures = ({ mintedNotes }: TrendingTreasuresProps) => (
  <TrendingBase title={"Trending Treasures"} intro={"Here are the trending treasures of Crossbell"} viewMoreLink={"/"}>
    <div className={"grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"}>
      {mintedNotes.map(mintedNote => (
        <div key={`${mintedNote.crossbell_id}-${mintedNote.crossbell_id}`} className={"aspect-ratio-video"}>
          <MintedNoteRawCard character={{
            id: mintedNote.character_id,
            handle: mintedNote.character_handle,
            avatar: mintedNote.character_avatar,
            name: mintedNote.character_name,
          }} treasure={{
            id: mintedNote.crossbell_id,
            image: mintedNote.media,
            text: mintedNote.text,
            mintCount: mintedNote.mint_count,
          }} />
        </div>
      ))}
    </div>
  </TrendingBase>
);

export default TrendingTreasures;
