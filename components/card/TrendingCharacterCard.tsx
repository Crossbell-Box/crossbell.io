import { Button } from "@mantine/core";
import type { Character } from "crossbell.js";
import {ipfsLinkToHttpLink} from "@/utils/ipfs";

type TrendingCharacter = {
  avatar: string;
  name: string;
  bio: string;
  banner: string;
  handle: string;
}

type TrendingCharacterRawProps = {
  character: TrendingCharacter;
}

type TrendingCharacterProps = {
  character: Character;
}

export const TrendingCharacterRawCard = ({ character }: TrendingCharacterRawProps) => (
  <div className={"flex flex-col rounded-lg text-white p-4 w-full h-full justify-between bg-cover bg-center"} style={{
    backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${character.banner})`,
    aspectRatio: "203/264",
  }}>
    <div className={"text-left text-sm"}>
      <span style={{
        overflow: "hidden",
        display: "-webkit-box",
        // @ts-ignore: Custom CSS Styles for components to work properly
        "-webkit-box-orient": "vertical",
        "-webkit-line-clamp": "3",
      }}>{ character.bio }</span>
    </div>
    <div className={"flex flex-col"}>
      <div className={"flex flex-col gap-5"}>
        <div className={"flex w-12 h-12 rounded-full border border-white border-2 self-center"}>
          <img className={"w-full h-full rounded-full object-fit"} src={character.avatar} alt={character.handle} />
        </div>
        <div className={"flex flex-col gap-1"}>
          <span className={"font-bold text-sm"}>{character.name}</span>
          <span className={"font-bold text-xs"}>@{character.handle}</span>
        </div>
      </div>
      <div className={"mt-2"}>
        <Button className={"w-full"}>
          <span className={"text-[#082135]"}>Follow</span>
        </Button>
      </div>
    </div>
  </div>
);

const TrendingCharacterCard = ({ character }: TrendingCharacterProps) => (
  <TrendingCharacterRawCard character={{
    avatar: ipfsLinkToHttpLink(character.metadata?.avatars?.[0] || ""), // TODO: Default fallback image
    name: character.metadata?.name || "",
    bio: character.metadata?.bio || "",
    banner: "", // Not defined here?!
    handle: character.handle || "",
  }} />
);

export default TrendingCharacterCard;
