import { getLayout } from "@/components/layouts/AppLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import MintedNoteCard from "@/components/card/MintedNoteCard";
import { LoadingOverlay } from "@mantine/core";
import { useMintedNotesOfAddress } from "@/utils/apis/indexer";
import { useAccount } from "wagmi";

const TreasuresList = () => {
  const { data: account } = useAccount();
  const { isLoading: mintedNotesLoading, data: mintedNotesArray } = useMintedNotesOfAddress(account?.address);

  return (
    <>
      <LoadingOverlay visible={mintedNotesLoading} />
      <div className={"grid grid-cols-3 gap-4"}>
        {
          mintedNotesArray?.list.map((mintedNote) => (
            <MintedNoteCard key={mintedNote.contractAddress + mintedNote.tokenId.toString()} mintedNote={mintedNote} />
          ))
        }
      </div>
    </>
  )
};

const Page: NextPageWithLayout = () => {
  return <div>
    <h1 className={"ml-8 mt-4 mb-8 mr-0 font-semibold text-size-4xl"}>
      Treasure
    </h1>
    <TreasuresList />
  </div>;
};

Page.getLayout = getLayout;

export default Page;
