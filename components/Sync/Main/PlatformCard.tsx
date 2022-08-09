import { Button, Text } from "@mantine/core";
import { ReactNode } from "react";

interface PlatformCardProps {
  platform: {
    name: string;
    icon: ReactNode;
  };
  user: {
    isSyncing: boolean;
    username?: string;
    syncedCount?: number;
    storageUsed?: number;
    lastSynced?: Date;
  }
}

const PlatformCard = ({ platform, user }: PlatformCardProps) => (
  <div className={"flex flex-col bg-[#F6F7F9] rounded-xl p-4"}>
    <div className={"flex"}>
      <Text weight={"bold"} size={"sm"}>
        {platform.name}
      </Text>
    </div>
    <div className={"flex flex-row justify-between"}>
      <div className={"flex items-center gap-2"}>
        <div className={"flex w-10 h-10 rounded-full"}>
          <div className={"w-full h-full flex bg-black rounded-full"}>
            <div className={"w-2/3 h-2/3 m-auto flex fill-white justify-center"}>
              {platform.icon}
            </div>
          </div>
        </div>
        <div className={"flex"}>
          <Text weight={"bold"}>
            {user.isSyncing ? (
              <>@{user.username}</>
            ) : (
              <>Sync to storage</>
            )}
          </Text>
        </div>
      </div>
      <div className={"flex flex-col"}>
        <div className={"flex flex-col"}>
          <div className={"flex"}>
            <Text size={"lg"} weight={"bold"}>
              {user.syncedCount || 0}
            </Text>
          </div>
          <div className={"flex"}>
            <Text size={"xs"} color={"gray"}>
              Notes synced
            </Text>
          </div>
        </div>
        <div className={"flex flex-col"}>
          <div className={"flex"}>
            <Text size={"lg"} weight={"bold"}>
              {((user.storageUsed || 0) / 1048576).toFixed(1)} MB
            </Text>
          </div>
          <div className={"flex"}>
            <Text size={"xs"} color={"gray"}>
              Storage used
            </Text>
          </div>
        </div>
      </div>
    </div>
    <div className={"flex flex-row justify-between"}>
      <div className={"flex"}>
        {user.isSyncing ? (
          <Button size={"xs"} color={"blue"} variant={"light"}>
            Unsync
          </Button>
          ) : (
          <Button size={"xs"} color={"blue"}>
            Sync
          </Button>
        )}
      </div>
      <div className={"flex self-end"}>
        {user.isSyncing && (
          <div className={"flex flex-row gap-2"}>
            <Text size={"xs"} color={"gray"}>
              Last synced
            </Text>
            <Text size={"xs"} weight={"bold"}>
              {user.lastSynced?.toLocaleDateString()}
            </Text>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default PlatformCard;
