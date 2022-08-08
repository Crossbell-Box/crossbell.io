import CharacterPart from "@/components/Sync/Main/CharacterPart";
import PlatformPart from "@/components/Sync/Main/PlatformPart";
import MediaUsagePart from "@/components/Sync/Main/MediaUsagePart";

const OperatorSyncMain = () => {
  return (
    <div className={"flex"}>
      <CharacterPart />
      <PlatformPart />
      <MediaUsagePart />
    </div>
  )
};

export default OperatorSyncMain;