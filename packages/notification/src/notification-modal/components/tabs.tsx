import React from "react";
import classNames from "clsx";

import styles from "./tabs.module.css";

export type TabItem<Key extends string> = {
	name: string;
	id: Key;
	count?: number;
};

export function Tabs<Key extends string>({
	items,
	currentTypeId,
	onSelectTab,
}: {
	items: TabItem<Key>[];
	currentTypeId: Key;
	onSelectTab: (id: Key) => void;
}) {
	return (
		<nav className={styles.container} aria-label="Tabs">
			{items.map((tab) => (
				<a
					key={tab.id}
					onClick={() => onSelectTab(tab.id)}
					className={classNames(
						tab.id === currentTypeId ? styles.active : styles.inactive,
						styles.item,
					)}
				>
					{tab.name}
					{!!tab.count && <span className={styles.count}>{tab.count}</span>}
				</a>
			))}
		</nav>
	);
}
