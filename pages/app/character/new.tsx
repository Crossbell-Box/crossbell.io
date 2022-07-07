import { getLayout } from "@/components/layouts/AppLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import CharacterManagement from "@/components/site/CharacterManagement";

const Page: NextPageWithLayout = () => {

  return <div>
    <h2>Mint your new character!</h2>
    <CharacterManagement />
  </div>;
};

Page.getLayout = getLayout;

export default Page;
