import React, {
	type PropsWithChildren,
	useState,
	ReactElement,
	useEffect,
} from "react";
import {
	AppShell,
	Navbar,
	Header,
	Footer,
	Aside,
	Text,
	MediaQuery,
	Burger,
	useMantineTheme,
	Center,
	Box,
	Space,
	UnstyledButton,
	Button,
	createStyles,
	Title,
} from "@mantine/core";
import Logo from "../common/Logo";
import Link from "next/link";
import ConnectButton from "../common/ConnectButton";
import { useRouter } from "next/router";
import { useCurrentCharacter } from "@/utils/apis/indexer";
import { NextLink } from "@mantine/next";
import { usePrimaryShade } from "../providers/ThemeProvider";

export default function AppLayout({ children }: PropsWithChildren) {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	return (
		<Center>
			<AppShell
				styles={{
					root: { maxWidth: "min(100vw, 1200px)" },
					main: { padding: 0 },
				}}
				navbarOffsetBreakpoint="sm"
				asideOffsetBreakpoint="sm"
				fixed={false}
				navbar={
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
						<Navbar.Section>footer</Navbar.Section>
					</Navbar>
				}
				aside={
					<MediaQuery smallerThan="sm" styles={{ display: "none" }}>
						<Aside
							p="md"
							className="bg-transparent"
							hiddenBreakpoint="sm"
							width={{ sm: 220, lg: 220 }}
						>
							<Text>Application sidebar</Text>
						</Aside>
					</MediaQuery>
				}
				// footer={
				//   <Footer height={60} p="md">
				//     Application footer
				//   </Footer>
				// }
				// header={
				//   <Header height={70} p="md">
				//     <div
				//       style={{ display: "flex", alignItems: "center", height: "100%" }}
				//     >
				//       <MediaQuery largerThan="sm" styles={{ display: "none" }}>
				//         <Burger
				//           opened={opened}
				//           onClick={() => setOpened((o) => !o)}
				//           size="sm"
				//           color={theme.colors.gray[6]}
				//           mr="xl"
				//         />
				//       </MediaQuery>

				//       <Text>Application header</Text>
				//     </div>
				//   </Header>
				// }
			>
				<div className="relative">{children}</div>
			</AppShell>
		</Center>
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

export const getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;
