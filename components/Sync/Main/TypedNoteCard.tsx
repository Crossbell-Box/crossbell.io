import { ReactNode } from "react";
import { Text } from "@mantine/core";

interface TypedNoteCardProps {
  icon: ReactNode;
  bg: string;
  label: string;
  count: number;
}

const TypedNoteCard = ({ icon, bg, label, count }: TypedNoteCardProps) => (
  <div className={"flex flex-row rounded-lg justify-between px-3 py-2 bg-[#F6F7F9]"}>
    <div className={"flex w-8 h-8 rounded-full"} style={{
      backgroundColor: bg,
    }}>
      <div className={"fill-white"}>
        {icon}
      </div>
    </div>
    <div className={"flex items-center"}>
      <Text weight={"bold"}>
        {label}
      </Text>
    </div>
    <div className={"flex items-center"}>
      <Text weight={"bold"} size={"lg"}>
        {count}
      </Text>
    </div>
  </div>
)

export default TypedNoteCard;
