import Link from "next/link";
import Logo from "@/components/common/Logo";
import { Menu, Button, Space, Title } from "@mantine/core";
import ConnectButton from "@/components/common/ConnectButton";
import React from "react";
import { useCurrentCharacter } from "@/utils/apis/indexer";

const NavLinks = () => {
  const {data: character} = useCurrentCharacter();

  const navLinks = [
    {href: "/feed", title: "Feed"},
    {href: "/shop", title: "Shop"},
    {href: "/sync", title: "Sync"},
    {href: character ? `/@${character.handle}` : "/character", title: "Character"},
  ];

  return (
    <>
      {navLinks.map((link) => (
        <Link key={link.title} href={link.href}>
          <span className={"font-semibold text-lg cursor-pointer"}>{link.title}</span>
        </Link>
      ))}
    </>
  );
}

const IndexNav = () => (
  <div className={"flex fixed top-0 bg-white w-full px-8 z-36 py-2"}>
    <div className={"flex flex-row justify-between items-center w-full max-w-340 m-auto"}>
      <div className={"flex flex-row items-center gap-6"}>
        <div>
          <Link href="/">
            <a className="flex justify-center items-center">
              <Logo size={45}/>
              <Space w={8}/>
              <Title order={1} className="inline text-4xl font-semibold">
                Crossbell
              </Title>
            </a>
          </Link>
        </div>
        <div className={"flex-row items-center gap-4 hidden md:flex"}>
          <NavLinks/>
        </div>
      </div>
      <div className={"flex-row items-center gap-6 hidden md:flex"}>
        <div>
          SearchBar
          {/*TODO: SearchBar*/}
        </div>
        <div className={"flex relative"}>
          <ConnectButton/>
        </div>
      </div>
      <div className={"flex md:hidden"}>
        {/*Mobile Menu*/}
        <Menu shadow={"md"}>
          <Menu.Target>
            <Button size={"xs"}>
              <i className={"i-csb:more"} />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<i className={"i-csb:feed"} />}>
              <Link href={"/feed"}>
                Feed
              </Link>
            </Menu.Item>
            <Menu.Item icon={<i className={"i-csb:shop"} />}>
              <Link href={"/shop"}>
                Shop
              </Link>
            </Menu.Item>
            <Menu.Item icon={<i className={"i-csb:sync"} />}>
              <Link href={"/sync"}>
                Sync
              </Link>
            </Menu.Item>
            <Menu.Item icon={<i className={"i-csb:character"} />}>
              <Link href={"/character"}>
                Character
              </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
              <div>
                SearchBar
                {/*TODO: SearchBar*/}
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className={"flex relative"}>
                <ConnectButton/>
              </div>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  </div>
);

export default IndexNav;
