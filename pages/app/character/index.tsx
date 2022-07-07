import { getLayout } from "@/components/layouts/AppLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import { useCharacters } from "@/utils/apis/indexer";
import { useAccount } from "wagmi";
import Avatar from "@/components/common/Avatar";
import styles from "@/styles/Character.module.css";
import Link from "next/link";

const Page: NextPageWithLayout = () => {
	const { data: account } = useAccount();
  const { data: characters } = useCharacters(account?.address);

  const characterList = characters?.list?.map(character => {
    return <Link href={'/character/' + character.username} key={character.username}>
      <a className={`${styles.card} inline-flex items-center justify-center px-8 py-4 m-2 border cursor-pointer align-middle`}>
        <Avatar src={character.avatars![0]} alt={character.name} />
        <span className="leading-10 truncate">{character.name}</span>
      </a>
    </Link>
  });

  return <div>
    <h2>Manage characters</h2>
    <div>
      {characterList}
      <Link href={'/character/new'}>
        <a className={`${styles.card} inline-flex items-center justify-center px-8 py-4 m-2 border cursor-pointer align-middle`}>
          <span className="leading-10">+</span>
        </a>
      </Link>
    </div>
  </div>;
};

Page.getLayout = getLayout;

export default Page;
