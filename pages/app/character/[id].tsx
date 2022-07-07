import { getLayout } from "@/components/layouts/AppLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import CharacterManagement from "@/components/site/CharacterManagement";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query;

  return <div>
    <h2>Manage character</h2>
    <CharacterManagement characterId={id?.toString() || ""} />
  </div>;
};

Page.getLayout = getLayout;

export default Page;
