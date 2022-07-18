import { TabsProps, Tabs as Tabs_, Text } from "@mantine/core";

type MyTabsProps = {
	tabs: {
		label: string;
		content?: React.ReactNode;
		/** Example: i-csb:back */
		icon?: string;
	}[];
};

export default function Tabs({
	tabs,
	...props
}: MyTabsProps & Omit<TabsProps, "children">) {
	return (
		<Tabs_
			styles={(theme) => ({
				// tabActive: { color: "black!important" },
			})}
			{...props}
		>
			<Tabs_.List>
				{tabs.map((tab, i) => (
					<Tabs_.Tab
						key={tab.label}
						value={tab.label}
						icon={tab.icon ? <Text className={tab.icon}></Text> : undefined}
					>
						{tab.label}
					</Tabs_.Tab>
				))}
			</Tabs_.List>

			{tabs.map((tab) => (
				<Tabs_.Panel key={tab.label} value={tab.label}>
					{tab.content}
				</Tabs_.Panel>
			))}
		</Tabs_>
	);
}
