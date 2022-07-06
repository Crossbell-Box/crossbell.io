import IconMint from "@/icons/mint.svg";

interface Character {
  avatar: string;
  name: string;
  handle: string;
}

interface Treasure {
  id: string;
  text?: string;
  image: string;
  mintCount: number;
}

type TreasurePartProps = {
  treasure: Treasure;
}

type CharacterPartProps = {
  character: Character;
}

export type TreasureCardProps = TreasurePartProps & CharacterPartProps;

const TreasurePart = ({ treasure }: TreasurePartProps) => (
  <div className={"relative"}>
    <div className={"bg-cover h-30 rounded-t-lg text-white flex items-center p-2"} style={{
      backgroundImage: `${
        treasure.text ? `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), ` : ''
      }url(${treasure.image})`,
    }}>
      {(
        treasure.text && <span>{ treasure.text }</span>
      )}
    </div>
    <div className={"absolute top-0 w-full"}>
      <div className={"absolute left-0 m-2"}>
          <span className={`${
            treasure.text ? 'text-[#E7E7E7]' : 'text-[#545454]'
          } italic text-sm`} style={{
            fontFamily: 'Product Sans',
          }}>#{ treasure.id }</span>
      </div>
      <div className={`absolute right-0 m-2 flex flex-row justify-center gap-1 ${
        treasure.text ? 'bg-[#000000] text-[#FFFFFF]' : 'bg-[#F3F7FB] text-[#142C3F]'
      } px-2 py-1 min-w-12 text-center rounded-full text-sm font-bold`} style={{
        fontFamily: 'Kamerik 105 Cyrillic',
      }}>
        <span>{ treasure.mintCount }</span>
        <span className={"flex"}>
            <IconMint className={"w-3.5"} />
          </span>
      </div>
    </div>
  </div>
);

const CharacterPart = ({ character }: CharacterPartProps) => (
  <div className={"flex flex-row gap-3 bg-white p-2 rounded-b-lg"}>
    <div className={"w-10 h-10 rounded-full"}>
      <img
        className={"w-full h-full rounded-full object-cover"}
        src={character.avatar}
        alt={character.name}
      />
    </div>
    <div className={"flex flex-col justify-around text-[#687792]"}>
        <span className={"text-sm font-bold"} style={{
          fontFamily: 'Product Sans',
        }}>{ character.name }</span>
      <span className={"text-xs"} style={{
        fontFamily: 'Product Sans',
      }}>@{ character.handle }</span>
    </div>
  </div>
);

const TreasureCard = ({ character, treasure }: TreasureCardProps) => (
  <div className={"w-full relative"}>
    <TreasurePart treasure={treasure} />
    <CharacterPart character={character} />
  </div>
);

export default TreasureCard;
