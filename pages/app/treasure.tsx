import { getLayout } from "@/components/layouts/AppLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import TreasureCard, {TreasureCardProps} from "@/components/card/TreasureCard";

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
      ...(i % 2 === 0 && {text: `Demo ${i} Coding is the love of my life :)`}),
      image: `https://http.cat/${400+i}`,
      mintCount: i * 9 + 1,
    },
  })
}

const TreasuresList = () => (
  <div className={"grid grid-cols-3 gap-4 mt-8"}>
    {
      mockCards.map((card) => (
        <TreasureCard key={card.treasure.id} character={card.character} treasure={card.treasure} />
      ))
    }
  </div>
);

const Page: NextPageWithLayout = () => {
  return <div>
    <h1 className={"ml-8 mt-4 mb-0 mr-0 font-semibold text-size-4xl"} style={{
      fontFamily: 'Lexend Deca',
    }}>
      Treasure
    </h1>
    <TreasuresList />
  </div>;
};

Page.getLayout = getLayout;

export default Page;
