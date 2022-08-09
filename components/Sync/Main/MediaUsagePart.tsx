import { Divider, Text } from "@mantine/core";
import VideosIcon from "@/components/Sync/Main/DashboardIcons/Videos";
import ArticlesIcon from "@/components/Sync/Main/DashboardIcons/Articles";
import NotesIcon from "@/components/Sync/Main/DashboardIcons/Notes";
import TypedNoteCard from "@/components/Sync/Main/TypedNoteCard";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const allTypeArray = [
  {
    id: "video",
    icon: <VideosIcon />,
    label: "Videos",
    color: "#5FBE64",
    count: 222,
  }, {
    id: "article",
    icon: <ArticlesIcon />,
    label: "Articles",
    color: "#4F8CF7",
    count: 333,
  }, {
    id: "note",
    icon: <NotesIcon />,
    label: "Notes",
    color: "#E83B56",
    count: 444,
  }
];

const CountCardPart = () => (
  <div className={"grid grid-cols-3 gap-4"}>
    {allTypeArray.map(t => <TypedNoteCard key={t.id} icon={t.icon} bg={t.color} label={t.label} count={t.count}/>)}
  </div>
);

const GraphCardPart = () => (
  <div className={"flex flex-row"}>
    <ResponsiveContainer width={"100%"} height={300}>
      <PieChart>
        <Pie
          data={allTypeArray}
          dataKey={"count"}
          innerRadius={80}
          outerRadius={120}
        >
          {allTypeArray.map((entry) => (
            <Cell key={entry.id} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const MediaUsagePart = () => (
  <div className={"flex flex-col bg-white rounded-xl border-1px border-solid border-[#E1E8F7] px-8 py-6 gap-6"}>
    <div className={"flex"}>
      <Text size={"lg"} weight={"bold"}>
        Dashboard
      </Text>
    </div>
    <div className={"flex flex-col gap-2"}>
      <CountCardPart />
      <Divider my={"sm"} />
      <GraphCardPart />
    </div>
  </div>
);

export default MediaUsagePart;
