import { getLayout } from "@/components/layouts/AppLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import TreasureNoteCard, {TreasureCardProps} from "@/components/card/TreasureNoteCard";
import {Tabs} from "@mantine/core";
import { useState } from "react";

const mockCards: TreasureCardProps[] = [];
for (let i = 0; i < 12; i++) {
  mockCards.push({
    character: {
      avatar: `https://http.cat/${400+i}`,
      name: `Demo ${i}`,
      handle: `demo${i}`,
    },
    treasure: {
      id: `${i}`,
      ...(i % 2 === 0 && {text: `Demo ${i} "Coding is the love of my life :)"`}),
      image: `https://http.cat/${400+i}`,
      mintCount: i * 9 + 1,
    },
  })
}

const TreasuresList = () => (
  <div className={"grid grid-cols-3 gap-4"}>
    {
      mockCards.map((card) => (
        <TreasureNoteCard key={card.treasure.id} character={card.character} treasure={card.treasure} />
      ))
    }
  </div>
);

const Page: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(1);

  return <div>
    <h1 className={"ml-8 mt-4 mb-8 mr-0 font-semibold text-size-4xl"} style={{
      fontFamily: 'Lexend Deca',
    }}>
      Treasure
    </h1>
  <Tabs active={activeTab} onTabChange={setActiveTab} styles={{
      tabLabel: {
        fontFamily: 'Lexend Deca',
      },
      tabActive: {
        color: "black!important",
        fontWeight: 600,
        borderBottomColor: "#FFCF55!important",
      },
  }}>
      <Tabs.Tab label="Articles">
        <div>Articles Treasures</div>
      </Tabs.Tab>
      <Tabs.Tab label="Notes">
        <TreasuresList />
      </Tabs.Tab>
      <Tabs.Tab label="Videos">
        <div>Videos Treasures</div>
      </Tabs.Tab>
    </Tabs>
  </div>;
};

Page.getLayout = getLayout;

export default Page;
