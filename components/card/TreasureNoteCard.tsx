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

const TreasurePart = ({ treasure, character }: TreasureCardProps) => (
  <div className={"relative"}>
    <div className={"bg-cover h-30 rounded-t-lg text-white flex items-center p-2"} style={{
      backgroundImage: `${
        treasure.text ? `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), ` : ''
      }url(${treasure.image})`,
    }}>
      {(
        treasure.text && <span className={"font-bold mt-6"} style={{
          fontFamily: 'Product Sans',
        }}>{ treasure.text }</span>
      )}
    </div>
    <div className={"absolute top-0 w-full"}>
      <div className={"absolute left-0 m-2"}>
      <div className={"w-9 h-9 rounded-full"}>
        <img
        className={"w-full h-full rounded-full object-cover"} style={{
            border: '2px solid white',
        }}
          src={character.avatar}
          alt={character.name}
        />
      </div>
      </div>
      <div className={`absolute right-0 m-2 flex flex-row justify-center gap-1 ${
        treasure.text ? 'bg-[#000000] text-[#FFFFFF]' : 'bg-[#F3F7FB] text-[#142C3F]'
      } px-2 py-1 min-w-12 text-center rounded-full text-sm font-bold`} style={{
        fontFamily: 'Kamerik 105 Cyrillic',
      }}>
        <span>#{ treasure.id }</span>
      </div>
    </div>
  </div>
);

const CharacterPart = ({ treasure, character }: TreasureCardProps) => (
  <div className={"flex flex-row justify-between bg-white p-2 rounded-b-lg"}>
    <div className={"flex flex-col justify-around text-[#687792]"}>
        <span className={"text-sm font-bold"} style={{
          fontFamily: 'Product Sans',
        }}>{ character.name }</span>
      <span className={"text-xs"} style={{
        fontFamily: 'Product Sans',
      }}>@{ character.handle }</span>
    </div>
    <div className={"flex flex-col"}>
      <span className={"text-xs font-semibold text-[#082135] self-end"} style={{
          fontFamily: 'Lexend Deca',
      }}>{ treasure.mintCount }</span>
      <span className={"text-xs font-light text-[#687792]"} style={{
          fontFamily: 'Lexend Deca',
      }}>Mint</span>
    </div>
  </div>
);

const TreasureNoteCard = ({ character, treasure }: TreasureCardProps) => (
  <div className={"w-full relative"}>
    <TreasurePart treasure={treasure} character={character}/>
    <CharacterPart treasure={treasure} character={character} />
  </div>
);

export default TreasureNoteCard;
