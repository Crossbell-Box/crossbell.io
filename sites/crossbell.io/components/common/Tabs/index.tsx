import { TabsProps, Tabs as Tabs_, Text, TabsValue } from "@mantine/core";
import { useRouter } from "next/router";

type MyTabsProps = {
	tabs: {
		label: string;
		route: string;
		/** Example: i-csb:back */
		icon?: string;
	}[];
	/** returns `false` in callback if you want to prevent the tabs changing */
	beforeTabChange?: (value: TabsValue) => boolean | void;
};

export default function Tabs({
	tabs,
	beforeTabChange,
	...props
}: MyTabsProps & Omit<TabsProps, "children">) {
	const router = useRouter();

	return (
		<Tabs_
			onTabChange={(value) => {
				if (beforeTabChange?.(value) === false) {
					return;
				}
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
