import { getLayout } from "@/components/layouts/AppLayout";
import type { NextPageWithLayout } from "@/pages/_app";

const Page: NextPageWithLayout = () => {
  return <div>Shop</div>;
};

Page.getLayout = getLayout;

export default Page;
