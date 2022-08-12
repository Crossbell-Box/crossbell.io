import ConnectButton from "@/components/common/ConnectButton";
import Logo from "@/components/common/Logo";
import { usePrimaryShade } from "@/components/providers/ThemeProvider";
import { useCurrentCharacter } from "@/utils/apis/indexer";
import {
	createStyles,
	UnstyledButton,
	Text,
	Space,
	Title,
	Navbar,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
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

function NavLinks() {
	const { data: character } = useCurrentCharacter();

	const navLinks: NavLinkProps[] = [
		{
			href: "/feed",
			title: "Feed",
			color: "brand",
			icon: "i-csb:feed",
			iconColor: "text-brand",
		},
		{
			href: "/shop",
			title: "Shop",
			color: "red",
			icon: "i-csb:shop",
			iconColor: "text-red",
		},
		{
			href: "/sync",
			title: "Sync",
			color: "blue",
			icon: "i-csb:sync",
			iconColor: "text-blue",
		},
		{
			href: character ? `/@${character.handle}` : "/character",
			title: "Character",
			color: "green",
			icon: "i-csb:character",
			iconColor: "text-green",
		},
		{
			href: "/treasure",
			title: "Treasures",
			color: "grape",
			icon: "i-csb:treasures",
			iconColor: "text-purple",
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

type NavLinkProps = {
	href: string;
	title: string;
	icon: string;
	color: string;
	iconColor: string;
};

function NavLink({ href, title, icon, color, iconColor }: NavLinkProps) {
	const router = useRouter();

	const [isCurrentRoute, setIsCurrentRoute] = useState(false);

	useEffect(() => {
		setIsCurrentRoute(router.asPath === href);
	}, [router.asPath, href]);

	const primaryShade = usePrimaryShade();

	const useStyles = createStyles((theme) => ({
		button: {
			color: theme.colors.dark[9],
			"&:hover": { background: theme.colors.gray[1] },
		},
		active: {
			// color: theme.colors[color][primaryShade],
			background: "white",
			color: theme.colors[color][primaryShade],
			"&:hover": { background: theme.colors.gray[0] },
			boxShadow: "0px 0px 15px rgba(38, 108, 158, 0.1)",
		},
	}));

	const { classes, cx } = useStyles();

	return (
		<UnstyledButton
			component={NextLink}
			href={href}
			className={cx(
				"block py-2 px-4 my-2 rounded-md overflow-hidden",
				"transition-colors",
				{
					[classes.active]: isCurrentRoute,
					[classes.button]: !isCurrentRoute,
				}
			)}
		>
			<div className="flex items-center">
				{/* icon */}
				<Text
					className={cx(icon, "text-2xl", {
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
