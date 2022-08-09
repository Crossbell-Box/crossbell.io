import {Text, Button, Progress} from "@mantine/core";
import { useCurrentCharacter } from "@/utils/apis/indexer";
import Image from "@/components/common/Image";
import { ipfsLinkToHttpLink } from "@/utils/ipfs";

interface CharacterPartProps {
  mediaTotalBytes: number;
}

const CharacterPart = ({ mediaTotalBytes }: CharacterPartProps) => {
  const { data: character, isLoading } = useCurrentCharacter();

  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"flex justify-between"}>
        <Text size={"lg"} weight={"bold"}>
          Character
        </Text>
        <Button variant={"outline"} color={"gray"} size={"xs"}>
          Change
        </Button>
      </div>
      <div className={"flex flex-row gap-7"}>
        <div className={"flex w-13 h-13 relative"}>
          <Image
            className={"rounded-full"}
            width={52} height={52}
            layout={"fill"}
            src={ipfsLinkToHttpLink(character?.metadata?.content?.avatars?.[0] || '')}
            alt={character?.handle}
          />
        </div>
        <div className={"flex flex-col"}>
          <div className={"flex"}>
            <Text weight={"bold"}>
              {character?.metadata?.content?.name}
            </Text>
          </div>
          <div className={"flex"}>
            <Text size={"sm"}>
              @{character?.handle}
            </Text>
          </div>
        </div>
      </div>
      <div className={"flex flex-col"}>
        <div className={"flex justify-end"}>
          <Text size={"lg"} weight={"bold"}>
            {(mediaTotalBytes / 1048576).toFixed(0)}MB
          </Text>
        </div>
        <Progress value={mediaTotalBytes / 5242880} color={"blue"} />
      </div>
    </div>
  )
};

export default CharacterPart;
