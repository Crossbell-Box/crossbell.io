import CharacterPart from "@/components/Sync/Main/CharacterPart";
import PlatformPart from "@/components/Sync/Main/PlatformPart";
import MediaUsagePart from "@/components/Sync/Main/MediaUsagePart";
import { Divider } from "@mantine/core";

const OperatorSyncMain = () => {
  return (
    <div className={"flex p-10 flex-col gap-4"}>
      <CharacterPart mediaTotalBytes={114514191} />
      <Divider my={"sm"} />
      <PlatformPart />
      <MediaUsagePart />
    </div>
  )
};

export default OperatorSyncMain;