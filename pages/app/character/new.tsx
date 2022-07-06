import { getLayout } from "@/components/layouts/AppLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import { useAccount } from "wagmi";

const Page: NextPageWithLayout = () => {
  const { data: account } = useAccount();

  return <div>
    <h2>Mint your new character!</h2>
  </div>;
};

Page.getLayout = getLayout;

export default Page;
