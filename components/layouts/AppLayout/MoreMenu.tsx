import { ActionIcon, Menu, Space, Text, Title } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { PropsWithChildren } from "react";

export default function MoreMenu() {
	return (
		<Menu shadow="md" width={200}>
			<Menu.Target>
				<ActionIcon>
					<div className="flex flex-row justify-center items-center">
						<Text color="dark" className="i-csb:more" />
						<Space w={5} />
						<Title order={5} color="dark" className="font-500">
							More
						</Title>
					</div>
				</ActionIcon>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Toolbox</Menu.Label>
				<MenuItemLink href="https://scan.crossbell.io/">Scan</MenuItemLink>
				<MenuItemLink href="https://faucet.crossbell.io/">Faucet</MenuItemLink>

				<Menu.Divider />

				<Menu.Label>Community</Menu.Label>
				<MenuItemLink
					href="https://github.com/Crossbell-Box"
					iconUrl="https://cdn.svgporn.com/logos/github-icon.svg"
				>
					GitHub
				</MenuItemLink>
				<MenuItemLink href="https://twitter.com/_Crossbell">
					Twitter
				</MenuItemLink>
				<MenuItemLink href="https://discord.gg/4GCwDsruyj">
					Discord
				</MenuItemLink>

				<Menu.Divider />

				<Menu.Label>Ecosystem</Menu.Label>
				<MenuItemLink href="https://crosssync.app/">CrossSync</MenuItemLink>
				<MenuItemLink href="https://xlog.app/">Xlog</MenuItemLink>
			</Menu.Dropdown>
		</Menu>
	);
}

function MenuItemLink({
	href,
	iconUrl,
	children,
}: PropsWithChildren<{ href: string; iconUrl?: string }>) {
	return (
		<Menu.Item
			component={NextLink}
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			// TODO: icon
		>
			{children}
		</Menu.Item>
	);
}
