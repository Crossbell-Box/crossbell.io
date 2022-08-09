import { Button, Text } from "@mantine/core";
import PlatformCard from "@/components/Sync/Main/PlatformCard";
import MediumLogo from "@/components/Sync/Main/PlatformLogos/Medium";
import TikTokLogo from "@/components/Sync/Main/PlatformLogos/TikTok";

const SUPPORTED_PLATFORMS = [
  {
    name: "Medium",
    icon: (<div className={"w-full h-full flex bg-black rounded-full"}>
      <div className={"w-2/3 h-2/3 m-auto flex fill-white"}>
        <MediumLogo />
      </div>
    </div>)
  },
  {
    name: "TikTok",
    icon: (<div className={"w-full h-full flex bg-black rounded-full"}>
      <div className={"w-2/3 h-2/3 m-auto flex fill-white"}>
        <TikTokLogo />
      </div>
    </div>)
  },
];

const PlatformPart = () => (
  <div className={"flex flex-col gap-7"}>
    <div className={"flex justify-between"}>
      <Text size={"lg"} weight={"bold"}>
        Social media sync
      </Text>
      <Button variant={"outline"} color={"gray"} size={"xs"}>
        Sync all
      </Button>
    </div>
    <div className={"grid grid-cols-2 gap-4"}>
      {SUPPORTED_PLATFORMS.map(platform =>
        <PlatformCard key={platform.name} platform={platform} user={{
          isSyncing: true,
          username: "User",
          syncedCount: 114,
          storageUsed: 1919810,
          lastSynced: new Date(),
        }} />
      )}
    </div>
    <div className={"flex justify-center"}>
      <Text size={"md"} weight={"bold"} color={"gray"}>
        To be continued
      </Text>
    </div>
  </div>
);

export default PlatformPart;