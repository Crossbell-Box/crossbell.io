import ConnectButton from "@/components/common/ConnectButton";
import Logo from "@/components/common/Logo";
import { useCurrentCharacter } from "@/utils/apis/indexer";
import {
	UnstyledButton,
	Text,
	Space,
	Title,
	Navbar,
	createStyles,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MoreMenu from "./MoreMenu";

export default function Nav() {
	const [opened, setOpened] = useState(false);
	return (
		<Navbar
			p="md"
			// fixed
			className="sticky top-0 bg-transparent"
			hiddenBreakpoint="sm"
			hidden={!opened}
			width={{ sm: 220, lg: 220 }}
		>
			<Navbar.Section>
				<Link href="/">
					<a className="flex justify-center items-center">
						<Logo />
						<Space w={5} />
						<Title order={1} className="inline text-xl font-500">
							Crossbell
						</Title>
					</a>
				</Link>
			</Navbar.Section>
			<Navbar.Section mt="md">
				<ConnectButton />
			</Navbar.Section>
			<Navbar.Section grow mt="md">
				<NavLinks />
			</Navbar.Section>
			<Navbar.Section className="flex justify-center items-center">
				<MoreMenu />
			</Navbar.Section>
		</Navbar>
	);
}

type NavLinkProps = {
	href: string;
	title: string;
	icon: string;
	iconColor?: string;
	className: string;
	activeClassName: string;
};

function NavLinks() {
	const { data: character } = useCurrentCharacter();

	const navLinks: NavLinkProps[] = [
		{
			href: "/feed",
			title: "Feed",
			icon: "i-csb:feed",
			iconColor: "text-yellow-primary/20",
			className: "hover:bg-yellow-primary/50",
			activeClassName: "bg-yellow-primary",
		},
		{
			href: "/shop",
			title: "Shop",
			icon: "i-csb:shop",
			iconColor: "text-red-primary/20",
			className: "hover:bg-red-primary/50",
			activeClassName: "bg-red-primary",
		},
		{
			href: "/sync",
			title: "Sync",
			icon: "i-csb:sync",
			iconColor: "text-blue-primary/20",
			className: "hover:bg-blue-primary/50",
			activeClassName: "bg-blue-primary",
		},
		{
			href: character ? `/@${character.handle}` : "/character",
			title: "Character",
			icon: "i-csb:character",
			iconColor: "text-green-primary/20",
			className: "hover:bg-green-primary/50",
			activeClassName: "bg-green-primary",
		},
		{
			href: "/treasure",
			title: "Treasures",
			icon: "i-csb:treasures",
			iconColor: "text-purple-primary/20",
			className: "hover:bg-purple-primary/50",
			activeClassName: "bg-purple-primary",
		},
	];

	return (
		<>
			{navLinks.map((link) => (
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

	return (
		<UnstyledButton
			component={NextLink}
			href={href}
			className={classNames(
				"relative block py-2 px-4 my-4 rounded-lg",
				"transition-colors",
				{
					[className]: !isCurrentRoute,
					[activeClassName]: isCurrentRoute,
					// "border-2": isCurrentRoute,
				}
			)}
		>
			{/* border */}
			{isCurrentRoute && (
				<div className="absolute top--1 left--1 right--1 bottom--1 rounded-lg border-2"></div>
			)}

			<div className="flex items-center">
				{/* icon */}
				<Text
					className={classNames(icon, "text-2xl", {
						iconColor: isCurrentRoute,
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
