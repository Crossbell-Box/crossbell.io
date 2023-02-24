import { Button, Menu, Text } from "@mantine/core";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function MoreMenu() {
	return (
		<Menu shadow="md" width={240}>
			<Menu.Target>
				<Button
					variant="subtle"
					color="gray"
					size="md"
					radius="md"
					leftIcon={<Text color="dark" className="i-csb:more text-24px" />}
					className="text-[#082135] w-full"
				>
					More
				</Button>
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
				<MenuItemLink href="https://xlog.app/">xlog</MenuItemLink>
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
			component={Link}
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			// TODO: icon
		>
			{children}
		</Menu.Item>
	);
}
