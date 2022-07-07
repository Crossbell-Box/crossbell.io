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
} from "@mantine/core";
import Logo from "../common/Logo";
import Link from "next/link";
import ConnectButton from "../common/ConnectButton";
import { useRouter } from "next/router";
import { usePrimaryShade } from "../providers/ThemeProvider";
import { useCurrentCharacter } from "@/utils/apis/indexer";

export default function AppLayout({ children }: PropsWithChildren) {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	return (
		<Center>
			<AppShell
				styles={{
					root: { maxWidth: "min(100vw, 1200px)" },
				}}
				navbarOffsetBreakpoint="sm"
				asideOffsetBreakpoint="sm"
				// fixed
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
									<Text className="inline text-xl font-bold">Crossbell</Text>
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
				{children}
				<div style={{ height: 10000 }}>
				</div>
			</AppShell>
		</Center>
	);
}

function NavLinks() {
	const { data: character } = useCurrentCharacter();

	const navLinks: NavLinkProps[] = [
		{ href: "/feed", title: "Feed", bgColor: "brand", icon: "i-csb:feed" },
		{ href: "/shop", title: "Shop", bgColor: "red", icon: "i-csb:shop" },
		{ href: "/sync", title: "Sync", bgColor: "blue", icon: "i-csb:sync" },
		{
			href: "/character",
			title: "Character",
			bgColor: "green",
			icon: "i-csb:character",
		},
		{
			href: "/@shop",
			title: "Treasures",
			bgColor: "colorful",
			icon: "i-csb:treasures",
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
	bgColor: string;
};

function NavLink({ href, title, icon, bgColor }: NavLinkProps) {
	const router = useRouter();

	const [isCurrentRoute, setIsCurrentRoute] = useState(false);

	useEffect(() => {
		setIsCurrentRoute(router.asPath === href);
	}, [router.asPath]);

	const useStyles = createStyles((theme) => ({
		button: {
			color: theme.colors.dark[9],
			"&:hover": {
				background: theme.colors.gray[1],
			},
		},
		active: {
			color: theme.colors.gray[0],
			background: theme.colors[bgColor]?.[usePrimaryShade()],
			position: "relative",
			"&:before":
				bgColor === "colorful" && isCurrentRoute
					? {
							content: "''",
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							zIndex: -1,
							background:
								"linear-gradient(290.56deg, #E5DD4C 11.02%, #5CE352 30.99%, #5B89F7 47.24%, #757DF2 61.48%, #EF759A 85.87%)",
							filter: "blur(15px)",
							transform: "scale(1.1)",
					  }
					: {},
			"&:hover": { background: theme.colors[bgColor]?.[usePrimaryShade()] },
		},
	}));

	const { classes, cx } = useStyles();

	return (
		<Link href={href} passHref>
			<UnstyledButton
				component="a"
				className={cx(
					"block py-2 px-4 my-2 rounded-md overflow-hidden",
					"transition-colors",
					{
						[classes.active]: isCurrentRoute,
						[classes.button]: !isCurrentRoute,
						"shadow-sm": isCurrentRoute,
					}
				)}
			>
				<div className="flex items-center">
					<Text
						className={cx(icon, "text-2xl", {
							"text-white": isCurrentRoute,
							"text-black": !isCurrentRoute,
						})}
					/>
					<Space w="sm" />
					<Text className="font-bold text-xl">{title}</Text>
				</div>
			</UnstyledButton>
		</Link>
	);
}

export const getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;
