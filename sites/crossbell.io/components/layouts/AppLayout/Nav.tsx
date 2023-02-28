import { UnstyledButton, Text, Space, Title, Navbar } from "@mantine/core";
import { useFocusWithin } from "@mantine/hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import classNames from "classnames";

import ConnectButton from "@/components/common/ConnectButton";
import { Image } from "~/shared/components/image";
import { useAccountCharacter } from "@crossbell/connect-kit";
import {
	composeCharacterHref,
	composeTreasuresWalletsHref,
} from "~/shared/url";
import config from "~/shared/config";

import MoreMenu from "./MoreMenu";
import { XSettingsEntry } from "./x-settings-entry";

export default function Nav() {
	const [opened, setOpened] = useState(false);
	return (
		<Navbar
			className="sticky top-0 bg-transparent w-281px pl-24px pr-16px py-16px h-screen"
			hiddenBreakpoint="sm"
			hidden={!opened}
		>
			<Navbar.Section>
				<Link href="/">
					<Image
						src="/logos/crossbell.svg"
						className="w-125px h-34px"
						placeholder="empty"
						width={125}
						height={34}
						priority
					/>
				</Link>
			</Navbar.Section>

			<Navbar.Section mt="md">
				<ConnectButton />
			</Navbar.Section>

			<Navbar.Section grow mt="md">
				<NavLinks />
			</Navbar.Section>

			<Navbar.Section className="flex justify-center items-center flex-col gap-1">
				<XSettingsEntry />
				<MoreMenu />
			</Navbar.Section>
		</Navbar>
	);
}

type NavLinkProps = {
	index: number;
	href: string;
	title: string;
	icon: string;
	iconColor: string;
	className: string;
	activeClassName: string;
};

function NavLinks() {
	const character = useAccountCharacter();
	const { address } = useAccount();

	const [navLinks, setNavLinks] = useState<Record<string, NavLinkProps>>({
		feed: {
			index: 0,
			href: "/feed",
			title: "xFeed",
			icon: "i-csb:feed",
			iconColor: "text-yellow-primary/20",
			className: "focus:bg-yellow-primary",
			activeClassName: "bg-yellow-primary/50",
		},
		// shop: {
		// 	index: 1,
		// 	href: "/shop",
		// 	title: "Shop",
		// 	icon: "i-csb:shop",
		// 	iconColor: "text-red-primary/20",
		// 	className: "focus:bg-red-primary",
		// 	activeClassName: "bg-red-primary/50",
		// },
		sync: {
			index: 2,
			href: config.xSync.domain,
			title: "xSync",
			icon: "i-csb:sync",
			iconColor: "text-blue-primary/20",
			className: "focus:bg-blue-primary",
			activeClassName: "bg-blue-primary/50",
		},
	});

	useEffect(() => {
		const oldNavLinks = navLinks;
		if (character) {
			oldNavLinks.character = {
				index: 3,
				href: character ? composeCharacterHref(character.handle) : "#",
				title: "xCharacter",
				icon: "i-csb:character",
				iconColor: "text-green-primary/20",
				className: "focus:bg-green-primary",
				activeClassName: "bg-green-primary/50",
			};
		} else {
			delete oldNavLinks.character;
		}

		if (address) {
			oldNavLinks.treasures = {
				index: 4,
				href: address ? composeTreasuresWalletsHref(address) : "#",
				title: "xShop",
				icon: "i-csb:treasures",
				iconColor: "text-purple-primary/20",
				className: "focus:bg-purple-primary",
				activeClassName: "bg-purple-primary/50",
			};
		} else {
			delete navLinks.treasures;
		}

		setNavLinks({ ...navLinks });
	}, [character, address]);

	const arr = Object.values(navLinks).sort((a, b) => a.index - b.index);

	return (
		<>
			{arr.map((link) => (
				<NavLink key={link.title} {...link} />
			))}
		</>
	);
}

function NavLink({
	href,
	title,
	icon,
	iconColor,
	className,
	activeClassName,
}: NavLinkProps) {
	const router = useRouter();

	const [isCurrentRoute, setIsCurrentRoute] = useState(false);

	useEffect(() => {
		setIsCurrentRoute(router.asPath === href);
	}, [router.asPath, href]);

	const { ref, focused } = useFocusWithin();

	const showBorder = isCurrentRoute && focused;

	return (
		<UnstyledButton
			ref={ref}
			component={Link}
			href={href}
			target={href.startsWith("/") ? "_self" : "_blank"}
			className={classNames(
				"relative block py-3 px-4 my-4 rounded-12px",
				"transition-colors",
				className,
				{
					["hover:bg-gray/8"]: !isCurrentRoute,
					[activeClassName]: isCurrentRoute,
				}
			)}
		>
			{/* border */}

			<div
				className={classNames(
					"absolute top--1 left--1 right--1 bottom--1 rounded-14px",
					"transition-border-width transition-border-color",
					{
						["border-2 border-black"]: showBorder,
						["border-0 border-black/0"]: !showBorder,
					}
				)}
			></div>

			<div className="flex items-center">
				{/* icon */}
				<Text
					className={classNames(icon, "text-2xl", {
						// [iconColor]: isCurrentRoute, // TODO: icon color
						"text-black": !isCurrentRoute,
					})}
				/>

				<Space w="sm" />

				{/* title */}
				<Title order={3} className="font-500 text-xl">
					{title}
				</Title>
			</div>
		</UnstyledButton>
	);
}
