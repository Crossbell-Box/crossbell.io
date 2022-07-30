import { TabsProps, Tabs as Tabs_, Text } from "@mantine/core";
import { useRouter } from "next/router";

type MyTabsProps = {
	tabs: {
		label: string;
		route: string;
		/** Example: i-csb:back */
		icon?: string;
	}[];
};

export default function Tabs({
	tabs,
	...props
}: MyTabsProps & Omit<TabsProps, "children">) {
	const router = useRouter();

	return (
		<Tabs_
			onTabChange={(value) => {
				router.push(`${value}`);
			}}
			value={router.asPath}
			styles={{
				tab: {
					"&[data-active]": {
						fontWeight: 700,
					},
				},
			}}
			{...props}
		>
			<Tabs_.List>
				{tabs.map((tab, i) => (
					<Tabs_.Tab
						key={tab.label}
						value={tab.route}
						icon={tab.icon ? <Text className={tab.icon}></Text> : undefined}
					>
						{tab.label}
					</Tabs_.Tab>
				))}
			</Tabs_.List>
		</Tabs_>
	);
}
