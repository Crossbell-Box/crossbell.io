import { getLayout } from "@/components/layouts/AppLayout";
import type { NextPageWithLayout } from "@/pages/_app";
import { useCharacters, useLinks } from "@/utils/apis/indexer";
import { useAccount } from "wagmi";
import Avatar from "@/components/common/Avatar";
import styles from "@/styles/Character.module.css";
import Link from "next/link";
import { Menu } from '@mantine/core';
import { useQueryClient, useMutation } from "react-query";
import { contract } from "@/utils/crossbell.js";
import { SCOPE_KEYS } from "@/utils/apis/indexer/character";
import { Profile } from "unidata.js";

const Page: NextPageWithLayout = () => {
	const { data: account } = useAccount();
  const { data: characters } = useCharacters(account?.address, true);

  const queryClient = useQueryClient();

  const setPrimary = useMutation(async (character: Profile) => {
    contract.setPrimaryCharacterId(character.metadata?.proof!);
  }, {
    onSuccess: (_, character) => {
      queryClient.invalidateQueries([...SCOPE_KEYS, "list", account?.address]);
      queryClient.invalidateQueries([...SCOPE_KEYS, "one", character.metadata?.proof]);
    },
  });

  const characterList = characters?.list?.map(character => {
    return <Link href={'/character/' + character.username} key={character.username}>
      <a className={`${styles.card} inline-flex items-center justify-center px-4 py-7 m-2 border cursor-pointer align-middle rounded-xl flex-col text-center relative overflow-hidden`}>
        {character.metadata?.primary &&
        <Avatar
          address={account?.address}
          characterId={character?.username}
          radius={0}
          size={100}
          className="w-full h-full absolute top-0 left-0 right-0 bottom-0 scale-120 blur-12 opacity-70 z-0"
        />}
        <span className="font-bold truncate w-full relative">{character.name}</span>
        <span className="truncate w-full text-sm mt-1 relative">@{character.username}</span>
        <Avatar className="border-4 border-slate-200 w-20 h-20 rounded-full my-5" src={character.avatars![0]} alt={character.name} />
        <span className="flex w-full relative">
          <span className="flex-1 border-r border-slate-200 text-sm"><span className="font-bold">{ character.metadata?.followers || 0 }</span><br/><span className="text-xs text-slate-500">Followers</span></span>
          <span className="flex-1 text-sm"><span className="font-bold">{ character.metadata?.followings || 0 }</span><br/><span className="text-xs text-slate-500">Following</span></span>
        </span>
        { !character.metadata?.primary &&
        <Menu
          className="absolute right-2 top-2"
          onClick={(event) => event.preventDefault()}
        >
          <Menu.Item
            onClick={() => setPrimary.mutate(character)}
          >Set as primary</Menu.Item>
        </Menu>}
      </a>
    </Link>
  });

  return <div>
    <h2>Manage characters</h2>
    <div>
      {characterList}
      <Link href={'/character/new'}>
        <a className={`${styles.card} inline-flex items-center justify-center px-4 py-7 m-2 border cursor-pointer align-middle rounded-xl flex-col text-center relative overflow-hidden`}>
          <span className="font-bold">Mint new character</span>
          <span className="w-20 h-20 bg-slate-200 text-white rounded-full leading-none my-8">
            <span className={`${styles.add} text-7xl relative bottom-1`}>+</span>
          </span>
        </a>
      </Link>
    </div>
  </div>;
};

Page.getLayout = getLayout;

export default Page;
